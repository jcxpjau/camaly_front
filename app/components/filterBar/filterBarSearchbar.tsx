//import libraries
import type { JSX } from "react";
import { useTranslation } from "react-i18next";
//import icons
import { Search } from "lucide-react";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

const SearchBar = ({ value, onChange }: SearchBarProps): JSX.Element => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center gap-2 bg-[var(--color-bg-alt)] px-3 py-1 rounded-xl flex-1 border border-[var(--color-border)]">
      <Search className="w-4 h-4 text-[var(--color-muted)]" />
      <input
        type="text"
        placeholder={t("marketplace.search-placeholder")}
        className="bg-transparent outline-none text-sm text-[var(--color-text)] w-full h-full p-3"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
