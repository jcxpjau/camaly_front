// import libraries
import { type JSX } from "react";
import { useTranslation } from "react-i18next";
// import icons
import { ICONS } from "./iconCategories";

type IconSelectorBarProps = {
  onSelect: (iconName: string) => void;
  selectedIcons: string[];
};

const IconCloud = ({
  onSelect,
  selectedIcons,
}: IconSelectorBarProps): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div className="w-full flex flex-row gap-1 overflow-x-auto mt-2">
      {Object.entries(ICONS).map(([name, icon]) => {
        const isSelected = selectedIcons.includes(name);
        return (
          <button
            key={name}
            onClick={() => onSelect(name)}
            className={`shrink-0 p-2 rounded-lg border border-[var(--color-border)]  hover:brightness-110 transition flex flex-row items-center gap-2 ${
              isSelected ? "bg-[var(--color-accent)] text-white" : "bg-[var(--color-bg-alt)] text-[var(--color-text)]"
            }`}
          >
            {icon}
            <span className="text-sm">
              {t(`category.${name}`, { defaultValue: t("category.default") })}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default IconCloud;
