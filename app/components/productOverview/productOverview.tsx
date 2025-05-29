// import libraries
import type { JSX } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
//import component
import BuyBtn from "../buyBtn/butBtn";
//import icons
import { CircleUser, X, ShoppingCart } from "lucide-react";
//import styling
import "./productOverview.css";

type ProductOverviewProps = {
  onClick: () => void;
  title: string;
  price: string;
};

const ProductOverview = ({ onClick, title, price }: ProductOverviewProps): JSX.Element => {
  const { t } = useTranslation();
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-end pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="productOverview w-1/3 h-full bg-white dark:bg-[var(--color-bg)] rounded-lg flex flex-col pointer-events-auto border border-[var(--color-border)] shadow-lg px-15 py-20 gap-4"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between w-full mb-8">
          <div>
            <h2 className="text-2xl text-[var(--color-text)]">{title}</h2>
            <p className="text-base text-[var(--color-text)] mt-1"> {t('marketplace.prices')} ${Number(price).toFixed(2)}</p>
          </div>
          <button
            className="hover:cursor-pointer text-[var(--color-text)]"
            onClick={onClick}
          >
            <X />
          </button>
        </div>

        {/* Product Image */}
        <div className="w-full h-48 bg-white rounded-md overflow-hidden flex items-center justify-center mb-8">
          <span className="text-sm text-black">[Imagem ilustrativa]</span>
        </div>

        {/* Author Info */}
        <div className="flex items-center gap-4 mb-8">
          <CircleUser />
          <div className="text-sm text-[var(--color-text)]"> {t("marketplace.author")} </div>
        </div>

        {/* Description */}
        <div className="text-sm text-[var(--color-text)] flex-1 overflow-y-auto">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            vel sem nec sapien tincidunt varius. Quisque vel efficitur nisi.
            Donec vehicula convallis elit, vel gravida orci bibendum vitae.
            Pellentesque habitant morbi tristique senectus et netus et malesuada
            fames ac turpis egestas.
          </p>
        </div>

        {/* Footer */}
        <div className="w-full flex justify-end mt-4">
          <BuyBtn/>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProductOverview;