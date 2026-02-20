import { useGameStore } from "@/state/useGame";

export const ScoreDisplay = () => {
    const trees = useGameStore((state) => state.trees);
    const tps = useGameStore((state) => state.getTreesPerSecond());

    return (
        <div className="z-10 text-center space-y-2 animate-in fade-in zoom-in duration-500 flex flex-col items-center flex-none">
            <h1 className="text-7xl font-black text-chart-4 drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] tabular-nums">
                {Math.floor(trees).toLocaleString()}
            </h1>
            <p className="text-xl font-bold text-muted-foreground uppercase tracking-widest">
                Trees Collected
            </p>
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-secondary-background border-1 rounded-lg">
                <p className="font-mono font-bold text-xl tabular-nums">
                    {Math.round(tps * 10) / 10} <span className="text-muted-foreground text-sm uppercase">TPS</span>
                </p>
            </div>
        </div>
    );
};
