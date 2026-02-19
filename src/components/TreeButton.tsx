import Logo from "../assets/tree-icon.svg?react";

export const TreeButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Logo
      onMouseDown={(e) => e.preventDefault()}
      onClick={(e) => {
        if (e.target === e.currentTarget) return;
        onClick();
      }}
      role="button"
      tabIndex={0}
      aria-label="Chop tree"
      className="cursor-pointer select-none"
      style={{ pointerEvents: "visiblePainted" }}
    />
  );
};
