// import libraries
import { useState, useEffect, type JSX } from "react";
import { useTranslation } from "react-i18next";
// import icons
import { ICONS } from "./iconCategories";
import api from "~/services/api";

type IconSelectorBarProps = {
    onSelect: (iconName: string) => void;
    selectedIcons: string[];
};

const IconCloud = ({
    onSelect,
    selectedIcons,
}: IconSelectorBarProps): JSX.Element => {
    const { t } = useTranslation();
    const [categories, setCategories ] = useState<string[]>([]);

    async function getCategories()
    {
        try{
            const {data} = await api.get( "products/categories" );
            setCategories( data );
        } catch( err ) {
            console.log( err );
        }
    }

    useEffect( () => {
        getCategories();
    }, [] )

    return (
        <div className="w-full flex flex-wrap gap-1 mt-2 justify-center ">
            {Object.entries(ICONS)
            .filter(([name]) => categories.includes(name))
            .map(([name, icon]) => {
                const isSelected = selectedIcons.includes(name);
                return (
                    <button
                        key={name}
                        onClick={() => onSelect(name)}
                        className={`shrink-0 p-2 rounded-lg border border-[var(--color-border)] hover:cursor-pointer  hover:brightness-110 transition flex flex-row items-center gap-2 ${isSelected ? "bg-[var(--color-accent)] text-white" : "bg-[var(--color-bg-alt)] text-[var(--color-text)]"
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
