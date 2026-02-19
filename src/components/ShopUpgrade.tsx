import React from "react";
import type { UpgradeModel } from "@/types";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

export const ShopUpgrade = React.memo(({
  upgrade,
  onClick,
  canBuy,
}: {
  upgrade: UpgradeModel;
  onClick: () => void;
  canBuy: boolean;
}) => {
  const { name, description, cost, purchased } = upgrade;
  return (
    <Card className="w-full h-full flex flex-col justify-between">
      <CardHeader className="p-4 space-y-1">
        <CardTitle className="text-base leading-tight">{name}</CardTitle>
        <CardDescription className="text-xs line-clamp-2 h-8">{description}</CardDescription>
        <CardDescription className="text-xs font-mono">Cost: {cost.toLocaleString()}</CardDescription>
        <Button
          className="w-full h-8 text-xs mt-2"
          disabled={!canBuy || purchased}
          onClick={onClick}
          variant={purchased ? "neutral" : "default"}
        >
          {purchased ? "Owned" : "Buy"}
        </Button>
      </CardHeader>
    </Card>
  );
});
