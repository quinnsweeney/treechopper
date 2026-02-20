import type { WorkerModel, UpgradeModel, BuyAmount } from "@/types";
import { ShopWorker } from "./ShopWorker";
import { ShopUpgrade } from "./ShopUpgrade";
import { useGameStore } from "@/state/useGame";
import { useState, useCallback } from "react";
import { Button } from "./ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

export default function Shop() {
  const trees = useGameStore((state) => state.trees);
  const workers = useGameStore((state) => state.workers);
  const upgrades = useGameStore((state) => state.upgrades);
  const buyWorker = useGameStore((state) => state.buyWorker);
  const buyUpgrade = useGameStore((state) => state.buyUpgrade);

  /* Create stable callbacks */
  const handleBuyWorker = useCallback((workerName: string, amount: number) => {
    buyWorker(workerName, amount);
  }, [buyWorker]);

  const handleBuyUpgrade = useCallback((upgradeName: string) => {
    buyUpgrade(upgradeName);
  }, [buyUpgrade]);

  const getWorkerCost = useGameStore((state) => state.getWorkerCost);
  const getMaxAffordable = useGameStore((state) => state.getMaxAffordable);
  const buyClickerUpgrade = useGameStore((state) => state.buyClickerUpgrade);
  const getClickerCost = useGameStore((state) => state.getClickerCost);

  const [activeTab, setActiveTab] = useState<"WORKERS" | "UPGRADES">("WORKERS");
  const [buyAmount, setBuyAmount] = useState<BuyAmount>(1);

  return (
    <div className="flex h-full w-full flex-col items-center overflow-hidden">
      <div className="flex-none flex flex-col gap-4 p-6 w-full items-center bg-background border-b border-border/50">
        <div className="flex gap-4">
          <Button
            variant={activeTab === "WORKERS" ? "default" : "neutral"}
            onClick={() => setActiveTab("WORKERS")}
            className="w-32"
          >
            Workers
          </Button>
          <Button
            variant={activeTab === "UPGRADES" ? "default" : "neutral"}
            onClick={() => setActiveTab("UPGRADES")}
            className="w-32"
          >
            Upgrades
          </Button>
        </div>

        {activeTab === "WORKERS" && (
          <div className="flex gap-2">
            {([1, 10, 100, "MAX"] as BuyAmount[]).map((amount) => (
              <Button
                key={amount}
                variant={buyAmount === amount ? "default" : "neutral"}
                onClick={() => setBuyAmount(amount)}
                className="w-16 h-8 text-xs"
              >
                {amount === "MAX" ? "MAX" : `x${amount}`}
              </Button>
            ))}
          </div>
        )}
      </div>

      <div className="flex-1 w-full overflow-y-auto p-4">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3 pb-12">
          {activeTab === "WORKERS" &&
            workers
              .filter((w) => w.count > 0 || getWorkerCost(w.name, 1) <= trees)
              .map((w: WorkerModel) => {
                let amountToBuy = 1;
                if (buyAmount === "MAX") {
                  const max = getMaxAffordable(w.name);
                  amountToBuy = max > 0 ? max : 1;
                } else {
                  amountToBuy = buyAmount;
                }

                const currentCost = getWorkerCost(w.name, amountToBuy);
                const canBuy = trees >= currentCost && (buyAmount !== "MAX" || getMaxAffordable(w.name) > 0);

                return (
                  <ShopWorker
                    key={w.name}
                    worker={w}
                    cost={currentCost}
                    amountToBuy={amountToBuy}
                    onClick={() => handleBuyWorker(w.name, amountToBuy)}
                    canBuy={canBuy}
                  />
                );
              })}

          {activeTab === "UPGRADES" && (
            <>
              <Card className="w-full h-full flex flex-col justify-between">
                <CardHeader className="p-4 space-y-1">
                  <CardTitle className="text-base leading-tight">Sharpen Axe</CardTitle>
                  <CardDescription className="text-xs line-clamp-2 h-8">Make your clicks 1.1x stronger!</CardDescription>
                  <CardDescription className="text-xs font-mono">
                    Cost: {getClickerCost().toLocaleString()}
                  </CardDescription>
                  <Button
                    className="w-full h-8 text-xs mt-2"
                    disabled={trees < getClickerCost()}
                    onClick={buyClickerUpgrade}
                  >
                    Upgrade
                  </Button>
                </CardHeader>
              </Card>
              {upgrades
                .filter((u) => {
                  if (u.purchased) return false;

                  // If it's a worker upgrade, check ownership
                  if (u.workerName && u.workerName !== "Clicker") {
                    const worker = workers.find((w) => w.name === u.workerName);
                    if (!worker || worker.count === 0) return false;
                  }

                  // Check tier dependency
                  if (u.tier > 1) {
                    const previousTier = upgrades.find(
                      (prev) => prev.workerName === u.workerName && prev.tier === u.tier - 1
                    );
                    if (previousTier && !previousTier.purchased) return false;
                  }

                  return true;
                })
                .slice()
                .sort((a, b) => a.cost - b.cost)
                .map((u: UpgradeModel) => (
                  <ShopUpgrade
                    key={u.name}
                    upgrade={u}
                    onClick={() => handleBuyUpgrade(u.name)}
                    canBuy={trees >= u.cost && !u.purchased}
                  />
                ))}
            </>
          )}</div>
      </div>
    </div>
  );
}
