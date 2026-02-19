import type { WorkerModel } from "@/types";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

export function ShopWorker({
  worker,
  onClick,
  canBuy,
}: {
  worker: WorkerModel;
  onClick: () => void;
  canBuy: boolean;
}) {
  const { name, rate, baseCost, mult } = worker;
  console.log({ name, rate, baseCost, mult });
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>
          Cost: {baseCost} trees, {rate * mult} TPS
        </CardDescription>
        <CardDescription>Mult: {mult}</CardDescription>
        <CardDescription>Rate: {rate}</CardDescription>
        <Button className="w-full" disabled={!canBuy} onClick={onClick}>
          Buy
        </Button>
      </CardHeader>
    </Card>
  );
}
