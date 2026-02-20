import type { UpgradeModel } from "@/types";

export const upgrades: UpgradeModel[] = [
  // --- Lumberjack Upgrades ---
  {
    name: "Lumberjack Coffee",
    description: "Lumberjacks work 1.5x faster.",
    cost: 250,
    purchased: false,
    workerName: "Lumberjack",
    tier: 1,
    applyUpgrade: (state) => ({
      ...state,
      workers: state.workers.map((w) =>
        w.name === "Lumberjack" ? { ...w, mult: w.mult * 1.5 } : w,
      ),
    }),
  },
  {
    name: "Flannel Shirts",
    description: "Lumberjacks work 1.5x faster.",
    cost: 500,
    purchased: false,
    workerName: "Lumberjack",
    tier: 2,
    applyUpgrade: (state) => ({
      ...state,
      workers: state.workers.map((w) =>
        w.name === "Lumberjack" ? { ...w, mult: w.mult * 1.5 } : w,
      ),
    }),
  },
  {
    name: "Beard Oil",
    description: "Lumberjacks work 1.5x faster.",
    cost: 1200,
    purchased: false,
    workerName: "Lumberjack",
    tier: 3,
    applyUpgrade: (state) => ({
      ...state,
      workers: state.workers.map((w) =>
        w.name === "Lumberjack" ? { ...w, mult: w.mult * 1.5 } : w,
      ),
    }),
  },

  // --- Foreman Upgrades ---
  {
    name: "Better Blueprints",
    description: "Foremen are 1.5x more efficient.",
    cost: 2000,
    purchased: false,
    workerName: "Foreman",
    tier: 1,
    applyUpgrade: (state) => ({
      ...state,
      workers: state.workers.map((w) =>
        w.name === "Foreman" ? { ...w, mult: w.mult * 1.5 } : w,
      ),
    }),
  },
  {
    name: "Megaphone",
    description: "Foremen are 1.5x more efficient.",
    cost: 5000,
    purchased: false,
    workerName: "Foreman",
    tier: 2,
    applyUpgrade: (state) => ({
      ...state,
      workers: state.workers.map((w) =>
        w.name === "Foreman" ? { ...w, mult: w.mult * 1.5 } : w,
      ),
    }),
  },
  {
    name: "Hard Hat",
    description: "Foremen are 1.5x more efficient.",
    cost: 15000,
    purchased: false,
    workerName: "Foreman",
    tier: 3,
    applyUpgrade: (state) => ({
      ...state,
      workers: state.workers.map((w) =>
        w.name === "Foreman" ? { ...w, mult: w.mult * 1.5 } : w,
      ),
    }),
  },

  // --- Logger Upgrades ---
  {
    name: "Gas Can",
    description: "Loggers are 1.5x more efficient.",
    cost: 15000,
    purchased: false,
    workerName: "Logger",
    tier: 1,
    applyUpgrade: (state) => ({
      ...state,
      workers: state.workers.map((w) =>
        w.name === "Logger" ? { ...w, mult: w.mult * 1.5 } : w,
      ),
    }),
  },
  {
    name: "Spare Chain",
    description: "Loggers are 1.5x more efficient.",
    cost: 50000,
    purchased: false,
    workerName: "Logger",
    tier: 2,
    applyUpgrade: (state) => ({
      ...state,
      workers: state.workers.map((w) =>
        w.name === "Logger" ? { ...w, mult: w.mult * 1.5 } : w,
      ),
    }),
  },
  {
    name: "Safety Goggles",
    description: "Loggers are 2x more efficient.",
    cost: 200000,
    purchased: false,
    workerName: "Logger",
    tier: 3,
    applyUpgrade: (state) => ({
      ...state,
      workers: state.workers.map((w) =>
        w.name === "Logger" ? { ...w, mult: w.mult * 2 } : w,
      ),
    }),
  },

  // --- Beaver Upgrades ---
  {
    name: "Iron Teeth",
    description: "Beavers work 1.5x faster.",
    cost: 60000,
    purchased: false,
    workerName: "Beaver",
    tier: 1,
    applyUpgrade: (state) => ({
      ...state,
      workers: state.workers.map((w) =>
        w.name === "Beaver" ? { ...w, mult: w.mult * 1.5 } : w,
      ),
    }),
  },
  {
    name: "Dam Builder",
    description: "Beavers work 1.5x faster.",
    cost: 250000,
    purchased: false,
    workerName: "Beaver",
    tier: 2,
    applyUpgrade: (state) => ({
      ...state,
      workers: state.workers.map((w) =>
        w.name === "Beaver" ? { ...w, mult: w.mult * 1.5 } : w,
      ),
    }),
  },
  {
    name: "Tail Slap",
    description: "Beavers work 2x faster.",
    cost: 1000000,
    purchased: false,
    workerName: "Beaver",
    tier: 3,
    applyUpgrade: (state) => ({
      ...state,
      workers: state.workers.map((w) =>
        w.name === "Beaver" ? { ...w, mult: w.mult * 2 } : w,
      ),
    }),
  },

  // --- Beatlekill Upgrades ---
  {
    name: "Bug Juice",
    description: "Beatlekills work 1.5x faster.",
    cost: 750000,
    purchased: false,
    workerName: "Beatlekill",
    tier: 1,
    applyUpgrade: (state) => ({
      ...state,
      workers: state.workers.map((w) =>
        w.name === "Beatlekill" ? { ...w, mult: w.mult * 1.5 } : w,
      ),
    }),
  },
  {
    name: "Little Guitars",
    description: "Beatlekills work 1.5x faster.",
    cost: 3000000,
    purchased: false,
    workerName: "Beatlekill",
    tier: 2,
    applyUpgrade: (state) => ({
      ...state,
      workers: state.workers.map((w) =>
        w.name === "Beatlekill" ? { ...w, mult: w.mult * 1.5 } : w,
      ),
    }),
  },
  {
    name: "Genetic Engineering",
    description: "Beatlekills work 2x faster.",
    cost: 12000000,
    purchased: false,
    workerName: "Beatlekill",
    tier: 3,
    applyUpgrade: (state) => ({
      ...state,
      workers: state.workers.map((w) =>
        w.name === "Beatlekill" ? { ...w, mult: w.mult * 2 } : w,
      ),
    }),
  },

  // --- Forest Fire Upgrades ---
  {
    name: "Napalm",
    description: "Forest Fires burn 1.5x faster.",
    cost: 7500000,
    purchased: false,
    workerName: "Forest Fire",
    tier: 1,
    applyUpgrade: (state) => ({
      ...state,
      workers: state.workers.map((w) =>
        w.name === "Forest Fire" ? { ...w, mult: w.mult * 1.5 } : w,
      ),
    }),
  },
  {
    name: "Pyroclastic Flow",
    description: "Forest Fires burn 1.5x faster.",
    cost: 30000000,
    purchased: false,
    workerName: "Forest Fire",
    tier: 2,
    applyUpgrade: (state) => ({
      ...state,
      workers: state.workers.map((w) =>
        w.name === "Forest Fire" ? { ...w, mult: w.mult * 1.5 } : w,
      ),
    }),
  },
  {
    name: "Global Warming",
    description: "Forest Fires burn 2x faster.",
    cost: 100000000,
    purchased: false,
    workerName: "Forest Fire",
    tier: 3,
    applyUpgrade: (state) => ({
      ...state,
      workers: state.workers.map((w) =>
        w.name === "Forest Fire" ? { ...w, mult: w.mult * 2 } : w,
      ),
    }),
  },

  // --- Lightning Rain Upgrades ---
  {
    name: "Conductive Rods",
    description: "Lightning strikes 1.5x more often.",
    cost: 125000000,
    purchased: false,
    workerName: "Lightning Rain",
    tier: 1,
    applyUpgrade: (state) => ({
      ...state,
      workers: state.workers.map((w) =>
        w.name === "Lightning Rain" ? { ...w, mult: w.mult * 1.5 } : w,
      ),
    }),
  },
  {
    name: "Tesla Coil",
    description: "Lightning strikes 1.5x more often.",
    cost: 500000000,
    purchased: false,
    workerName: "Lightning Rain",
    tier: 2,
    applyUpgrade: (state) => ({
      ...state,
      workers: state.workers.map((w) =>
        w.name === "Lightning Rain" ? { ...w, mult: w.mult * 1.5 } : w,
      ),
    }),
  },
  {
    name: "Storm Generator",
    description: "Lightning strikes 2x more often.",
    cost: 2000000000,
    purchased: false,
    workerName: "Lightning Rain",
    tier: 3,
    applyUpgrade: (state) => ({
      ...state,
      workers: state.workers.map((w) =>
        w.name === "Lightning Rain" ? { ...w, mult: w.mult * 2 } : w,
      ),
    }),
  },

  // --- Orbital Laser Upgrades ---
  {
    name: "Mirror Array",
    description: "Lasers focused 1.5x better.",
    cost: 2000000000,
    purchased: false,
    workerName: "Orbital Laser",
    tier: 1,
    applyUpgrade: (state) => ({
      ...state,
      workers: state.workers.map((w) =>
        w.name === "Orbital Laser" ? { ...w, mult: w.mult * 1.5 } : w,
      ),
    }),
  },
  {
    name: "Solar Flare",
    description: "Lasers focused 1.5x better.",
    cost: 8000000000,
    purchased: false,
    workerName: "Orbital Laser",
    tier: 2,
    applyUpgrade: (state) => ({
      ...state,
      workers: state.workers.map((w) =>
        w.name === "Orbital Laser" ? { ...w, mult: w.mult * 1.5 } : w,
      ),
    }),
  },
  {
    name: "Gamma Ray",
    description: "Lasers focused 2x better.",
    cost: 30000000000,
    purchased: false,
    workerName: "Orbital Laser",
    tier: 3,
    applyUpgrade: (state) => ({
      ...state,
      workers: state.workers.map((w) =>
        w.name === "Orbital Laser" ? { ...w, mult: w.mult * 2 } : w,
      ),
    }),
  },

  // --- Nuke Upgrades ---
  {
    name: "Uranium Enrichment",
    description: "Nukes explode 1.5x harder.",
    cost: 30000000000,
    purchased: false,
    workerName: "Nuke",
    tier: 1,
    applyUpgrade: (state) => ({
      ...state,
      workers: state.workers.map((w) =>
        w.name === "Nuke" ? { ...w, mult: w.mult * 1.5 } : w,
      ),
    }),
  },
  {
    name: "Hydrogen Bomb",
    description: "Nukes explode 1.5x harder.",
    cost: 120000000000,
    purchased: false,
    workerName: "Nuke",
    tier: 2,
    applyUpgrade: (state) => ({
      ...state,
      workers: state.workers.map((w) =>
        w.name === "Nuke" ? { ...w, mult: w.mult * 1.5 } : w,
      ),
    }),
  },
  {
    name: "Fallout Shelter",
    description: "Nukes explode 2x harder.",
    cost: 500000000000,
    purchased: false,
    workerName: "Nuke",
    tier: 3,
    applyUpgrade: (state) => ({
      ...state,
      workers: state.workers.map((w) =>
        w.name === "Nuke" ? { ...w, mult: w.mult * 2 } : w,
      ),
    }),
  },

  // --- Planet Decimator Upgrades ---
  {
    name: "Death Star Plans",
    description: "Planets crumble 1.5x faster.",
    cost: 450000000000,
    purchased: false,
    workerName: "Planet Decimator",
    tier: 1,
    applyUpgrade: (state) => ({
      ...state,
      workers: state.workers.map((w) =>
        w.name === "Planet Decimator" ? { ...w, mult: w.mult * 1.5 } : w,
      ),
    }),
  },
  {
    name: "Black Hole Generator",
    description: "Planets crumble 1.5x faster.",
    cost: 2000000000000,
    purchased: false,
    workerName: "Planet Decimator",
    tier: 2,
    applyUpgrade: (state) => ({
      ...state,
      workers: state.workers.map((w) =>
        w.name === "Planet Decimator" ? { ...w, mult: w.mult * 1.5 } : w,
      ),
    }),
  },
  {
    name: "Galactic Empire",
    description: "Planets crumble 2x faster.",
    cost: 10000000000000,
    purchased: false,
    workerName: "Planet Decimator",
    tier: 3,
    applyUpgrade: (state) => ({
      ...state,
      workers: state.workers.map((w) =>
        w.name === "Planet Decimator" ? { ...w, mult: w.mult * 2 } : w,
      ),
    }),
  },

  // --- Time Machine Upgrades ---
  {
    name: "Flux Capacitor",
    description: "Time bends 1.5x more.",
    cost: 7500000000000,
    purchased: false,
    workerName: "Time Machine",
    tier: 1,
    applyUpgrade: (state) => ({
      ...state,
      workers: state.workers.map((w) =>
        w.name === "Time Machine" ? { ...w, mult: w.mult * 1.5 } : w,
      ),
    }),
  },
  {
    name: "Paradox Prevention",
    description: "Time bends 1.5x more.",
    cost: 30000000000000,
    purchased: false,
    workerName: "Time Machine",
    tier: 2,
    applyUpgrade: (state) => ({
      ...state,
      workers: state.workers.map((w) =>
        w.name === "Time Machine" ? { ...w, mult: w.mult * 1.5 } : w,
      ),
    }),
  },
  {
    name: "Multiverse Theory",
    description: "Time bends 2x more.",
    cost: 100000000000000,
    purchased: false,
    workerName: "Time Machine",
    tier: 3,
    applyUpgrade: (state) => ({
      ...state,
      workers: state.workers.map((w) =>
        w.name === "Time Machine" ? { ...w, mult: w.mult * 2 } : w,
      ),
    }),
  },
];
