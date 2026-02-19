import type { WorkerModel } from "@/types";

export const workers: WorkerModel[] = [
  {
    name: "Lumberjack",
    rate: 0.1,
    count: 0,
    mult: 1,
    baseCost: 10,
  },
  {
    name: "Foreman",
    rate: 1,
    count: 0,
    mult: 1,
    baseCost: 100,
  },
  {
    name: "Logger",
    rate: 10,
    count: 0,
    mult: 1,
    baseCost: 1000,
  },
];
