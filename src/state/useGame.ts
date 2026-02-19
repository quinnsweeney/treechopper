import type { GameState } from "@/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { workers } from "./workers";
import { upgrades } from "./upgrades";

const throttledStorage = (baseStorage: any) => {
  let timeout: any = null;
  let lastValue: string | null = null;

  return {
    getItem: (name: string) => baseStorage.getItem(name),
    setItem: (name: string, value: string) => {
      lastValue = value;
      if (timeout) return;
      timeout = setTimeout(() => {
        if (lastValue !== null) {
          baseStorage.setItem(name, lastValue);
        }
        timeout = null;
      }, 1000); // Save at most once per second
    },
    removeItem: (name: string) => baseStorage.removeItem(name),
  };
};

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      trees: 0,
      workers: workers,
      upgrades: upgrades,
      clicker: { count: 1, mult: 1, level: 1 },
      currentScreen: "MAIN",

      reset: () => {
        set({
          trees: 0,
          workers: workers.map((w) => ({ ...w, count: 0 })),
          upgrades: upgrades.map((u) => ({ ...u, purchased: false })),
          clicker: { count: 1, mult: 1, level: 1 },
          currentScreen: "MAIN",
        });
      },
      buyClickerUpgrade: () => {
        set((state) => {
          const cost = get().getClickerCost();
          if (state.trees < cost) return state;
          return {
            ...state,
            trees: state.trees - cost,
            clicker: {
              ...state.clicker,
              level: state.clicker.level + 1,
              mult: state.clicker.mult * 1.1,
            }
          };
        });
      },
      getClickerCost: () => {
        const { level } = get().clicker;
        return Math.floor(10 * Math.pow(1.6, level));
      },
      chop: () => {
        set((state: GameState) => ({
          trees: state.trees + state.clicker.count * state.clicker.mult,
        }));
      },
      buyWorker: (workerName: string, amount: number) => {
        set((state: GameState) => {
          const workerIndex = state.workers.findIndex(
            (w) => w.name === workerName,
          );
          if (workerIndex === -1) return state;
          const worker = state.workers[workerIndex];

          // Cost for N items: Base * (1.15^current * (1.15^N - 1) / (1.15 - 1))
          // But we can just loop for simplicity or use the formula carefully
          let totalCost = 0;
          let currentCost = Math.floor(worker.baseCost * Math.pow(1.15, worker.count));

          // Optimization for large N: Geometric Series Sum
          // a = first term (currentCost)
          // r = 1.15
          // n = amount
          // Sum = a * (1 - r^n) / (1 - r) -- strict formula
          // Sum = currentCost * (Math.pow(1.15, amount) - 1) / (1.15 - 1)

          const r = 1.15;
          totalCost = Math.floor(currentCost * (Math.pow(r, amount) - 1) / (r - 1));

          if (state.trees < totalCost) return state;

          return {
            ...state,
            trees: state.trees - totalCost,
            workers: state.workers.map((w, i) =>
              i === workerIndex ? { ...w, count: w.count + amount } : w,
            ),
          };
        });
      },
      buyUpgrade: (upgradeName: string) => {
        // Find the upgrade definition to get the applyUpgrade function
        // because functions are not persisted in localStorage
        const upgradeDef = upgrades.find((u) => u.name === upgradeName);
        if (!upgradeDef) return;

        set((state: GameState) => {
          const upgradeInState = state.upgrades.find((u) => u.name === upgradeName);
          if (!upgradeInState || upgradeInState.purchased || state.trees < upgradeDef.cost) {
            return state;
          }

          const stateWithCost = {
            ...state,
            trees: state.trees - upgradeDef.cost,
          };

          const upgradedState = upgradeDef.applyUpgrade(stateWithCost);

          return {
            ...upgradedState,
            upgrades: state.upgrades.map((u) =>
              u.name === upgradeName ? { ...u, purchased: true } : u,
            ),
          };
        });
      },
      getWorkerCost: (workerName: string, amount: number) => {
        const worker = get().workers.find((w) => w.name === workerName);
        if (!worker) return Infinity;

        const currentCost = Math.floor(worker.baseCost * Math.pow(1.15, worker.count));
        const r = 1.15;
        // Cost to buy 'amount' starting from now
        return Math.floor(currentCost * (Math.pow(r, amount) - 1) / (r - 1));
      },
      getMaxAffordable: (workerName: string) => {
        const state = get();
        const worker = state.workers.find((w) => w.name === workerName);
        if (!worker) return 0;

        const currentCost = Math.floor(worker.baseCost * Math.pow(1.15, worker.count));
        if (state.trees < currentCost) return 0;

        const r = 1.15;
        // Inverse of geometric sum formula:
        // Cost = Base * (r^N - 1) / (r - 1)
        // Cost * (r - 1) / Base = r^N - 1
        // (Cost * (r - 1) / Base) + 1 = r^N
        // N = log_r( ... )

        const n = Math.log((state.trees * (r - 1) / currentCost) + 1) / Math.log(r);
        return Math.floor(n);
      },
      getTreesPerSecond: () => {
        const state = get();
        return state.workers.reduce(
          (total, worker) => total + worker.rate * worker.count * worker.mult,
          0,
        );
      },
    }),
    {
      name: "gameState",
      storage: createJSONStorage(() => throttledStorage(localStorage)),
      // Prevent persisting functions which would be null on rehydration
      partialize: (state) => {
        const { trees, clicker, workers, upgrades, currentScreen } = state;
        return {
          trees,
          clicker,
          currentScreen,
          workers,
          upgrades: upgrades.map(({ applyUpgrade, ...rest }) => ({ ...rest, purchased: rest.purchased })),
        } as any;
      },
      merge: (persistedState: any, currentState: GameState) => {
        if (!persistedState) return currentState;

        const mergedWorkers = currentState.workers.map((currentW) => {
          const persistedW = persistedState.workers.find((pw: any) => pw.name === currentW.name);
          if (persistedW) {
            // Keep stateful values from persistence
            return {
              ...currentW, // Use code values for rate, cost
              count: persistedW.count, // Restore count
              mult: persistedW.mult, // Restore multiplier
            };
          }
          // New worker from code
          return currentW;
        });

        const mergedUpgrades = currentState.upgrades.map((currentU) => {
          const persistedU = persistedState.upgrades.find((pu: any) => pu.name === currentU.name);
          if (persistedU) {
            return {
              ...currentU,
              purchased: persistedU.purchased,
            };
          }
          return currentU;
        });

        return {
          ...currentState,
          ...persistedState,
          workers: mergedWorkers,
          upgrades: mergedUpgrades,
        };
      },
    },
  ),
);
