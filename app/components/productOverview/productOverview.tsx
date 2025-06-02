// import libraries
import type { JSX } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
// import component
import BuyBtn from "../buyBtn/buyBtn";
// import icons
import { CircleUser, X } from "lucide-react";
// import styling
import "./productOverview.css";

type ProductOverviewProps = {
  onClick: () => void;
  onPurchaseSuccess?: () => void;
  workflow: {
    name: string;
    description: string;
    category: string;
    price: string;
    id: string;
  };
};

const ProductOverview = ({
  onClick,
  workflow,
  onPurchaseSuccess
}: ProductOverviewProps): JSX.Element => {
  const { t } = useTranslation();
  const { name, price, description, category, id } = workflow;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-end"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="productOverview lg:w-1/3 w-full h-screen bg-white dark:bg-[var(--color-bg)] rounded-lg flex flex-col border-[var(--color-border)] shadow-lg"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Conteúdo com rolagem */}
        <div className="flex flex-col px-20 py-10 gap-4 overflow-y-auto flex-1">
          {/* Header */}
          <div className="flex items-center justify-between w-full mb-8 shrink-0">
            <div>
              <h2 className="text-2xl text-[var(--color-text)]">{name}</h2>
              <p className="text-base text-[var(--color-text)] mt-1">
                {t("marketplace.prices")} ${Number(price).toFixed(2)}
              </p>
            </div>
            <button
              className="hover:cursor-pointer text-[var(--color-text)]"
              onClick={onClick}
            >
              <X />
            </button>
          </div>

          {/* Product Image */}
          <div className="w-full h-48 bg-white rounded-md overflow-hidden flex items-center justify-center mb-8 shrink-0">
            <span className="text-sm text-black">[Imagem ilustrativa]</span>
          </div>

          {/* Author Info */}
          <div className="flex items-center gap-4 mb-8 shrink-0">
            <CircleUser />
            <div className="text-sm text-[var(--color-text)]">
              {t("marketplace.author")}
            </div>
          </div>

          {/* Description */}
          <div className="text-base text-[var(--color-text)]">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              vel sem nec sapien tincidunt varius. Quisque vel efficitur nisi.
              Donec vehicula convallis elit, vel gravida orci bibendum vitae.
              Pellentesque habitant morbi tristique senectus et netus et
              malesuada fames ac turpis egestas.
            </p>
          </div>

          {/* Footer */}
          <div className="w-full flex justify-end mt-4 shrink-0">
            <BuyBtn
              accentColor="var(--buy-btn-normal)"
              hoverColor="var(--buy-btn-hover)"
              productId={id}
              onPurchaseSuccess={onPurchaseSuccess}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProductOverview;
