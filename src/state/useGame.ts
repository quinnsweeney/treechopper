import type { GameState } from "@/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { workers } from "./workers";
import { upgrades } from "./upgrades";

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      trees: 0,
      workers: workers,
      upgrades: upgrades,
      clicker: { count: 1, mult: 1 },
      currentScreen: "MAIN",

      reset: () => {
        set({
          trees: 0,
          workers: workers.map((w) => ({ ...w, count: 0 })),
          upgrades: upgrades.map((u) => ({ ...u, purchased: false })),
          clicker: { count: 1, mult: 1 },
          currentScreen: "MAIN",
        });
      },
      chop: () => {
        set((state: GameState) => ({
          trees: state.trees + state.clicker.count * state.clicker.mult,
        }));
      },
      buyWorker: (workerName: string) => {
        set((state: GameState) => {
          const workerIndex = state.workers.findIndex(
            (w) => w.name === workerName,
          );
          if (workerIndex === -1) return state; // Worker not found
          const workerToBuy = state.workers[workerIndex];
          const cost = workerToBuy.baseCost;
          if (state.trees < cost) return state; // Not enough trees
          return {
            ...state,
            trees: state.trees - cost,
            workers: state.workers.map((w, i) =>
              i === workerIndex
                ? {
                    ...w,
                    count: w.count + 1,
                    baseCost: Math.floor(
                      w.baseCost * Math.pow(1.15, w.count + 1),
                    ),
                  }
                : w,
            ),
          };
        });
      },
      buyUpgrade: (upgradeName: string) => {
        set((state: GameState) => {
          const upgradeIndex = state.upgrades.findIndex(
            (u) => u.name === upgradeName,
          );
          if (upgradeIndex === -1) return state;
          const upgradeToBuy = state.upgrades[upgradeIndex];
          const cost = upgradeToBuy.cost;
          if (state.trees < cost) return state;
          return {
            ...upgradeToBuy.applyUpgrade(state),
            upgrades: state.upgrades.map((u, i) =>
              i === upgradeIndex ? { ...u, purchased: true } : u,
            ),
          };
        });
      },
      getWorkerCost: (workerName: string) => {
        const worker = get().workers.find((w) => w.name === workerName);
        if (!worker) return Infinity; // Worker not found
        return Math.floor(worker.baseCost * Math.pow(1.15, worker.count));
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
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
