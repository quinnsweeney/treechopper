import Shop from "./Shop";
import { useGameStore } from "@/state/useGame";
import { TreeButton } from "./TreeButton";
import { useState, useCallback } from "react";
import { ScoreDisplay } from "./ScoreDisplay";

interface Particle {
  id: string;
  x: number;
  y: number;
}

export default function MainScreen() {
  const chop = useGameStore((state) => state.chop);
  const clickValue = useGameStore((state) => state.clicker.count * state.clicker.mult);

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
        <ScoreDisplay />

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
