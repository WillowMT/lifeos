const categoryStyles: Record<string, string> = {
  Life: "bg-[#efe9ff] text-[#654fa3]",
  Fitness: "bg-[#e4f4ec] text-[#33785b]",
  Finance: "bg-[#f4eedb] text-[#7c651e]",
  Project: "bg-[#e5efff] text-[#3b68a2]",
  Travel: "bg-[#fff0e5] text-[#a15a2d]",
  Health: "bg-[#ffe9ec] text-[#a64d5c]",
  Learning: "bg-[#e7f2f6] text-[#3c7081]",
  Idea: "bg-[#f4eaff] text-[#7d4ea8]",
  All: "bg-[#ececf1] text-[#595963]",
};

export function CategoryPill({
  label,
  selected = false,
  onClick,
}: {
  label: string;
  selected?: boolean;
  onClick?: () => void;
}) {
  const classes = `category-pill ${
    selected
      ? "bg-[#24242a] text-white shadow-sm"
      : categoryStyles[label] ?? categoryStyles.All
  }`;

  if (onClick) {
    return (
      <button
        type="button"
        className={classes}
        aria-pressed={selected}
        onClick={onClick}
      >
        {label}
      </button>
    );
  }

  return <span className={classes}>{label}</span>;
}
