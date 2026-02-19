import { useGameStore } from "@/state/useGame";
import type { WorkerModel } from "@/types";

const getWorkerTreesPerSecond = (worker: WorkerModel): number =>
  worker.rate * worker.count * worker.mult;

let lastTimestamp = performance.now();
let animationFrameId: number | null = null;

export function startGameLoop() {
  if (animationFrameId !== null) {
    return; // Already running
  }

  lastTimestamp = performance.now();

  const loop = (currentTimestamp: number) => {
    const deltaTime = (currentTimestamp - lastTimestamp) / 1000; // Convert to seconds
    lastTimestamp = currentTimestamp;

    // Get current state and calculate trees to add
    const state = useGameStore.getState();
    const totalTreesPerSecond = state.workers.reduce(
      (sum, worker) => sum + getWorkerTreesPerSecond(worker),
      0,
    );

    if (totalTreesPerSecond > 0) {
      const treesToAdd = totalTreesPerSecond * deltaTime;
      useGameStore.setState({
        trees: state.trees + treesToAdd,
      });
    }

    animationFrameId = requestAnimationFrame(loop);
  };

  animationFrameId = requestAnimationFrame(loop);
}

export function stopGameLoop() {
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
}
