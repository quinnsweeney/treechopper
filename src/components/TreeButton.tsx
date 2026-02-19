import Logo from "../assets/tree-icon.svg?react";

export const TreeButton = ({ onClick }: { onClick: (e: React.MouseEvent) => void }) => {
  return (
    <div className="relative group inline-block">
      <Logo
        onMouseDown={(e) => e.preventDefault()}
        onClick={(e: React.MouseEvent) => {
          onClick(e);
        }}
        role="button"
        tabIndex={0}
        aria-label="Chop tree"
        className="cursor-pointer select-none transition-all duration-75 active:scale-90 hover:scale-105 active:brightness-110 drop-shadow-[6px_6px_0px_rgba(0,0,0,1)] w-48 h-48 md:w-64 md:h-64 overflow-visible"
        style={{ pointerEvents: "visiblePainted" }}
      />
    </div>
  );
};
