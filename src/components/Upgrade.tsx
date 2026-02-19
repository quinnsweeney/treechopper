import type { UpgradeModel } from "@/types";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "./ui/tooltip";

export const Upgrade = ({
  upgrade,
  onClick,
  canBuy,
}: {
  upgrade: UpgradeModel;
  onClick: () => void;
  canBuy: boolean;
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Button onClick={onClick} disabled={!canBuy} variant="noShadow">
            {upgrade.name}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{upgrade.description}</p>
          <p>Cost: {upgrade.cost} trees</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
