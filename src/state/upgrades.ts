import type { UpgradeModel } from "@/types";

export const upgrades: UpgradeModel[] = [
  {
    name: "Sharp Axe",
    description: "Increases clicker multiplier by 2x.",
    cost: 100,
    purchased: false,
    applyUpgrade: (state) => ({
      ...state,
      clicker: {
        ...state.clicker,
        mult: state.clicker.mult * 2,
      },
    }),
  },
  {
    name: "Steel Axe",
    description: "Increases clicker multiplier by 2x.",
    cost: 500,
    purchased: false,
    applyUpgrade: (state) => ({
      ...state,
      clicker: {
        ...state.clicker,
        mult: state.clicker.mult * 2,
      },
    }),
  },
];
