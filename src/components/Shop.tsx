import type { WorkerModel } from "@/types";
import { ShopWorker } from "./ShopWorker";
import { useGameStore } from "@/state/useGame";
import { Upgrade } from "./Upgrade";

export default function Shop() {
  const game = useGameStore();
  console.log(game.workers);
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      {game.upgrades.map((u) => (
        <Upgrade
          key={u.name}
          upgrade={u}
          onClick={() => game.buyUpgrade(u.name)}
          canBuy={u.cost <= game.trees}
        />
      ))}
      {game.workers.map((w: WorkerModel) => (
        <ShopWorker
          key={w.name}
          worker={w}
          onClick={() => game.buyWorker(w.name)}
          canBuy={w.baseCost <= game.trees}
        />
      ))}
    </div>
  );
}
