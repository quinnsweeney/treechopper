import React from "react";
import type { WorkerModel } from "@/types";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

export const ShopWorker = React.memo(({
  worker,
  cost,
  onClick,
  canBuy,
  amountToBuy,
}: {
  worker: WorkerModel;
  cost: number;
  onClick: () => void;
  canBuy: boolean;
  amountToBuy: number;
}) => {
  const { name, rate, mult, count } = worker;
  return (
    <Card className="w-full h-full flex flex-col justify-between">
      <CardHeader className="p-4 space-y-1">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base truncate">{name}</CardTitle>
          <span className="text-sm font-bold bg-muted px-2 py-0.5 rounded-full">x{count}</span>
        </div>
        <CardDescription className="text-xs">
          Cost: {cost.toLocaleString()}
        </CardDescription>
        <CardDescription className="text-xs">
          +{Math.round(rate * mult * 10) / 10} TPS
        </CardDescription>
        <Button className="w-full mt-2 h-8 text-xs" disabled={!canBuy} onClick={onClick}>
          Buy {amountToBuy > 1 ? `x${amountToBuy}` : ""}
        </Button>
      </CardHeader>
    </Card>
  );
});
