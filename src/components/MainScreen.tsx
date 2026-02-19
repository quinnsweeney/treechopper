import Shop from "./Shop";
import { useGameStore } from "@/state/useGame";
import { TreeButton } from "./TreeButton";

export default function MainScreen() {
  const game = useGameStore();
  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold">Trees: {Math.round(game.trees)}</h1>
        <p>{Math.round(game.getTreesPerSecond() * 10) / 10}</p>
        <TreeButton onClick={() => game.chop()} />
      </div>
      <div>
        <Shop />
      </div>
    </div>
  );
}
