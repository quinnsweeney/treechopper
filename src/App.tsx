import MainScreen from "./components/MainScreen";
import { useEffect } from "react";
import { startGameLoop, stopGameLoop } from "./utils/gameLoop";
import { useGameStore } from "./state/useGame";
import { Button } from "./components/ui/button";

export function App() {
  const game = useGameStore();
  useEffect(() => {
    startGameLoop();
    return () => stopGameLoop();
  }, []);

  return (
    <div>
      <MainScreen />
      <Button className="" onClick={() => game.reset()}>
        Reset Game
      </Button>
    </div>
  );
}

export default App;
