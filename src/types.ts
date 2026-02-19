export type WorkerModel = {
  name: string;
  rate: number;
  count: number;
  mult: number;
  baseCost: number;
};

export type UpgradeModel = {
  name: string;
  description: string;
  cost: number;
  purchased: boolean;
  workerName?: string; // The name of the worker this upgrades (or "Clicker")
  tier: number; // 1, 2, 3...
  applyUpgrade: (state: GameState) => GameState;
};

export interface GameState {
  trees: number;
  workers: WorkerModel[];
  upgrades: UpgradeModel[];
  clicker: {
    count: number;
    mult: number;
    level: number;
  };
  currentScreen: Screen;
  reset: () => void;
  chop: () => void;
  buyWorker: (workerName: string, amount: number) => void;
  buyUpgrade: (upgradeName: string) => void;
  buyClickerUpgrade: () => void;
  getWorkerCost: (workerName: string, amount: number) => number;
  getClickerCost: () => number;
  getMaxAffordable: (workerName: string) => number;
  getTreesPerSecond: () => number;
}

export type BuyAmount = 1 | 10 | 100 | "MAX";

export type Screen = "MAIN" | "WORKER_SHOP" | "UPGRADE_SHOP";

export type GameAction =
  | { type: "SET_SCREEN"; screen: Screen }
  | { type: "CHOP" }
  | { type: "MOVE_SELECTION"; delta: -1 | 1 }
  | { type: "BUY_WORKER"; workerName: string }
  | { type: "TICK"; dtSeconds: number };
