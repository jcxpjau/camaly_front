import { useTranslation } from "react-i18next";

type CategoryToggleProps = {
  onClick: () => void;
};

const CategoryToggle = ({ onClick }: CategoryToggleProps) => {
  const { t } = useTranslation();
  return (
    <button
      onClick={onClick}
      className="w-full sm:w-auto shrink-0 bg-[var(--color-bg-alt)] border border-[var(--color-border)] text-[var(--color-text)] px-3 py-2 rounded-xl text-sm hover:brightness-110 transition whitespace-nowrap"
    >
      {t("marketplace.categoryChoice")}
    </button>
  );
};

export default CategoryToggle;
