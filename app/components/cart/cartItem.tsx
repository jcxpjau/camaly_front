import { motion, AnimatePresence } from "framer-motion";
import { Check, Calendar, ShoppingBag, Trash2 } from "lucide-react";

export interface BaseItem {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  addedAt: Date;
}

interface CartItemProps {
  item: BaseItem & (
    | { addedAt: Date; purchasedAt?: never; orderId?: never }
    | { purchasedAt: Date; orderId: string; addedAt?: never }
  );
  isSelected?: boolean;
  onToggleSelection?: (itemId: string) => void;
  onRemove?: () => void;
  showSelection?: boolean;
  showRemoveButton?: boolean;
}

export const CartItem = ({
  item,
  isSelected = false,
  onToggleSelection,
  onRemove,
  showSelection = true,
  showRemoveButton = false,
}: CartItemProps) => {
  const isPurchased = "purchasedAt" in item;

  return (
    <div
      className={`p-4 rounded-lg border transition-colors relative
        ${isSelected
          ? "bg-[var(--color-success-bg)] border-[var(--color-success-border)]"
          : "bg-[var(--color-bg)] border-[var(--color-border)] hover:bg-[var(--color-bg-alt)]"
        }`}
      style={{
        color: isSelected
          ? "var(--color-text-success)"
          : "var(--color-text-default)",
      }}
    >
      <div className="flex items-start gap-3">
        {showSelection && !isPurchased && (
          <button
            onClick={() => onToggleSelection?.(item.id)}
            aria-pressed={isSelected}
            aria-label={isSelected ? "Desmarcar item" : "Marcar item"}
            className="focus:outline-none mt-1"
          >
            <motion.div
              className="w-5 h-5 rounded-[4px] border flex items-center justify-center"
              initial={false}
              animate={{
                backgroundColor: isSelected ? "var(--color-accent)" : "transparent",
                borderColor: "var(--color-accent)",
              }}
              transition={{ duration: 0.2 }}
            >
              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    key="check"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </button>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h4
                className="font-medium truncate leading-tight"
                style={{
                  color: isSelected
                    ? "var(--color-text-success)"
                    : "var(--color-text-default)",
                }}
              >
                {item.name}
              </h4>
              <div className="flex items-center gap-2 mt-1 text-xs">
                <span className="px-2 py-0.5 rounded-full bg-[var(--color-bg-alt)] text-[var(--color-muted)] text-[10px]">
                  {item.category}
                </span>
                {item.quantity > 1 && (
                  <span className="text-[var(--color-muted)]">
                    Qty: {item.quantity}
                  </span>
                )}
              </div>
            </div>

            <div className="text-right">
              <div
                className="font-semibold"
                style={{
                  color: isSelected
                    ? "var(--color-accent)"
                    : "var(--color-special-purple)",
                }}
              >
                ${(item.price * item.quantity).toFixed(2)}
              </div>
              {item.quantity > 1 && (
                <div className="text-xs text-[var(--color-muted)]">
                  ${item.price.toFixed(2)} each
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4 mt-2 text-xs text-[var(--color-muted)] justify-between">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {isPurchased
                ? `Comprado em`
                : `Adicionado em ${item.addedAt.toLocaleDateString()}`}
            </div>
            {isPurchased && (
              <div className="flex items-center gap-1">
                <ShoppingBag className="w-3 h-3" />
                {item.orderId}
              </div>
            )}
            {showRemoveButton && !isPurchased && (
              <button
                onClick={onRemove}
                className="text-red-500 hover:text-red-600 p-1"
                title="Remover item"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
