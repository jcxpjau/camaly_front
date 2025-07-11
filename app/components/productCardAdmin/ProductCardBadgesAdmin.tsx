import type { JSX } from "react";

type ProductCardBadgesProps = {
  provider: string;
};

const providerStyleMap: Record<string, string> = {
  google: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
  meta: "bg-green-500/20 text-green-400 border border-green-500/30",
  microsoft: "bg-orange-500/20 text-orange-400 border border-orange-500/30",
  other: "bg-gray-500/20 text-gray-400 border border-gray-500/30",
};

const ProductCardBadges = ({ provider }: ProductCardBadgesProps): JSX.Element => {
  const baseClasses = "px-2 py-1 text-xs rounded-md border";
  const styleClasses = providerStyleMap[provider] ?? providerStyleMap.other;

  return (
    <div className="flex items-center space-x-2">
      <span className={`${baseClasses} ${styleClasses} uppercase`}>
        {provider}
      </span>
    </div>
  );
};

export default ProductCardBadges;
