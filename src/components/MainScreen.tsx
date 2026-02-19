import Shop from "./Shop";
import { useGameStore } from "@/state/useGame";
import { TreeButton } from "./TreeButton";
import { useState, useCallback } from "react";

interface Particle {
  id: string;
  x: number;
  y: number;
}

export default function MainScreen() {
  const trees = useGameStore((state) => state.trees);
  const chop = useGameStore((state) => state.chop);
  const clickValue = useGameStore((state) => state.clicker.count * state.clicker.mult);
  const tps = useGameStore((state) => state.getTreesPerSecond());

  const [particles, setParticles] = useState<Particle[]>([]);

  const handleChop = useCallback((e: React.MouseEvent) => {
    chop();
    const id = Math.random().toString(36).substr(2, 9);
    const newParticle = {
      id: id,
      x: e.clientX + (Math.random() * 40 - 20),
      y: e.clientY + (Math.random() * 40 - 20),
    };
    setParticles((prev) => [...prev, newParticle]);
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== id));
    }, 1000);
  }, [chop]);

  return (
    <div className="flex flex-col md:flex-row w-full h-full bg-background overflow-hidden flex-1">
      {/* Floating Particles Portal */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute text-2xl font-black text-chart-4 animate-out fade-out slide-out-to-top-32 duration-1000 pointer-events-none drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] tabular-nums"
            style={{ left: p.x, top: p.y }}
          >
            +{Math.round(clickValue * 10) / 10}
          </div>
        ))}
      </div>

      {/* Left Panel: Forest & Interaction */}
      <section className="flex-none md:w-[35%] p-8 pt-16 md:pt-24 flex flex-col items-center bg-background border-b md:border-b-0 md:border-r border-border relative overflow-hidden z-30">
        <div className="z-10 text-center space-y-2 animate-in fade-in zoom-in duration-500 flex flex-col items-center flex-none">
          <h1 className="text-7xl font-black text-chart-4 drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] tabular-nums">
            {Math.floor(trees).toLocaleString()}
          </h1>
          <p className="text-xl font-bold text-muted-foreground uppercase tracking-widest">
            Wood Collected
          </p>
          <div className="z-20 inline-flex items-center gap-2 px-6 py-3 bg-secondary-background border-2 border-border shadow-shadow rounded-full">
            <span className="w-3 h-3 rounded-full bg-chart-4 animate-pulse" />
            <p className="font-mono font-bold text-xl tabular-nums">
              {Math.round(tps * 10) / 10} <span className="text-muted-foreground text-sm uppercase">TPS</span>
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-center w-full relative z-10">
          <TreeButton onClick={(e: any) => handleChop(e)} />
        </div>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(var(--border) 1px, transparent 1px)', backgroundSize: '32px 32px' }}
        />
      </section>

      {/* Right Panel: Shop */}
      <section className="flex-1 bg-background flex flex-col overflow-hidden">

        <div className="flex-1 overflow-hidden">
          <Shop />
        </div>
      </section>
    </div>
  );
}
