import MainScreen from "./components/MainScreen";
import { useEffect } from "react";
import { startGameLoop, stopGameLoop } from "./utils/gameLoop";
import { Toaster } from "@/components/ui/sonner";

export function App() {
  useEffect(() => {
    startGameLoop();
    return () => stopGameLoop();
  }, []);

  return (
    <div className="h-screen bg-background text-foreground flex flex-col font-sans selection:bg-main/30 overflow-hidden">
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden">
        <MainScreen />
      </main>
      <Toaster />
    </div>
  );
}

export default App;
