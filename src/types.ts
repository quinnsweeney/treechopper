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
  applyUpgrade: (state: GameState) => GameState;
};

export interface GameState {
  trees: number;
  workers: WorkerModel[];
  upgrades: UpgradeModel[];
  clicker: { count: number; mult: number };
  currentScreen: Screen;
  reset: () => void;
  chop: () => void;
  buyWorker: (workerName: string) => void;
  buyUpgrade: (upgradeName: string) => void;
  getWorkerCost: (workerName: string) => number;
  getTreesPerSecond: () => number;
}

export type Screen = "MAIN" | "WORKER_SHOP" | "UPGRADE_SHOP";

export type GameAction =
  | { type: "SET_SCREEN"; screen: Screen }
  | { type: "CHOP" }
  | { type: "MOVE_SELECTION"; delta: -1 | 1 }
  | { type: "BUY_WORKER"; workerName: string }
  | { type: "TICK"; dtSeconds: number };
