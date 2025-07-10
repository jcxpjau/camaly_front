import React from "react";
import { Bot, Check, CircleX, ShoppingCart, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ICONS } from "../filterBar/iconCategories";

interface PopUpCartItemProps {
  open: boolean;
  onClose: () => void;
  onOpenCart: () => void;
  lastAddedItem: {
    name: string;
    price: string;
    category: string;
  } | null;
  alreadyInCart: boolean;
}


const PopUpCartItem: React.FC<PopUpCartItemProps> = ({
  open,
  onClose,
  lastAddedItem,
  alreadyInCart,
  onOpenCart
}) => {
    if (!open || !lastAddedItem) return null;

    const Icon = ICONS[lastAddedItem.category?.toLowerCase()] || <Bot className="w-6 h-6" />;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40 pointer-events-auto"
            style={{ backgroundColor: "rgba(0,0,0,0.2)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="relative rounded-2xl p-6 max-w-md w-full shadow-2xl border"
              style={{
                backgroundColor: "var(--color-bg)",
                color: "var(--color-text)",
                borderColor: "var(--color-border)",
              }}
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
                aria-label="Fechar popup"
                type="button"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="flex items-center justify-center mb-4">
                <div
                  className="rounded-full p-3"
                  style={{
                    background: alreadyInCart
                      ? "linear-gradient(90deg, #22c55e, #16a34a)" // vermelho para já no carrinho
                      : "linear-gradient(90deg, #dc2626, #b91c1c)", // verde para sucesso (novo item)
                  }}
                >
                  {alreadyInCart ? (
                    <Check className="h-8 w-8 text-white" />
                  ) : (
                    <CircleX className="h-8 w-8 text-white" />
                  )}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">
                {alreadyInCart ? "Produto Adicionado ao seu Carrinho" : "Produto já está no seu carrinho!"}
              </h3>
              <div
                className="rounded-lg p-4 mb-4 border flex items-center space-x-3"
                style={{
                  backgroundColor: "rgba(0,0,0,0.05)",
                  borderColor: "var(--color-border)",
                }}
              >
                <div
                    className="rounded-lg p-2 flex items-center justify-center"
                    style={{
                    background: "linear-gradient(90deg, #a462f4, #6366f1)",
                    }}
                >
                    <span className="w-6 h-6 flex items-center justify-center">
                    {Icon}
                    </span>
                </div>
                <div className="flex-1">
                  <p className="font-medium">{lastAddedItem.name}</p>
                  <p
                    className="text-sm"
                    style={{ color: "var(--color-muted)" }}
                  >
                    ${lastAddedItem.price}
                  </p>
                </div>
              </div>
              <p className="text-center mb-6" style={{ color: "var(--color-muted)" }}>
                {alreadyInCart ? "Produto foi adicionado ao seu carrinho com sucesso" : "Produto não foi adicionado no seu carrinho!"}
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={onClose}
                  className="flex-1 py-3 px-4 rounded-lg font-medium transition-colors"
                  style={{
                    backgroundColor: "var(--color-button-bg)",
                    color: "var(--color-text)",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "var(--color-button-hover)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "var(--color-button-bg)")
                  }
                  type="button"
                >
                  Continuar Comprando
                </button>
                <button
                  onClick={() => {
                    onOpenCart();
                    onClose();
                  }}
                  className="flex-1 py-3 px-4 rounded-lg font-medium transition-transform hover:scale-105"
                  style={{
                    background:
                      "linear-gradient(90deg, var(--color-special-purple), var(--color-accent))",
                    color: "white",
                  }}
                  type="button"
                >
                  Ver Carrinho
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PopUpCartItem;