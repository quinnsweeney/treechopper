import MainScreen from "./components/MainScreen";
import { useEffect } from "react";
import { startGameLoop, stopGameLoop } from "./utils/gameLoop";
import { useGameStore } from "./state/useGame";
import { Button } from "./components/ui/button";

export function App() {
  const reset = useGameStore((state) => state.reset);
  useEffect(() => {
    startGameLoop();
    return () => stopGameLoop();
  }, []);

  return (
    <div className="h-screen bg-background text-foreground flex flex-col font-sans selection:bg-main/30 overflow-hidden">
      {/* <header className="flex-none p-4 border-b-2 border-border flex justify-between items-center bg-secondary-background z-10 shadow-shadow">
        <h1 className="text-2xl font-black uppercase tracking-tighter">Tree Chopper</h1>
      </header> */}
      {/* <Button
        variant="neutral"
        size="sm"
        onClick={() => {
          if (confirm("Are you sure you want to reset all progress?")) reset();
        }}
        className="hover:bg-destructive hover:text-destructive-foreground transition-colors"
      >
        Reset Game
      </Button> */}

      <main className="flex-1 flex flex-col md:flex-row overflow-hidden">
        <MainScreen />
      </main>
    </div>
  );
}

export default App;
