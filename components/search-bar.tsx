import { SearchIcon } from "./icons";

export function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="search-field">
      <span className="sr-only">Search memories</span>
      <SearchIcon className="size-5 shrink-0 text-[#8b8991]" />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search your memories"
        className="min-w-0 flex-1 bg-transparent text-[16px] text-[#25242a] outline-none placeholder:text-[#9b98a1]"
      />
      {value ? (
        <button
          type="button"
          onClick={() => onChange("")}
          className="grid size-7 place-items-center rounded-full bg-[#dfdde3] text-[16px] font-medium text-[#66636d]"
          aria-label="Clear search"
        >
          ×
        </button>
      ) : null}
    </label>
  );
}
