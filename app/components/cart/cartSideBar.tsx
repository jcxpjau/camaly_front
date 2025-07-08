// imports
import {
  X,
  ShoppingCart,
  History,
  Trash2,
  Check,
  ShoppingBag,
} from "lucide-react";
import { useEffect, useState } from "react";
import { CartItem } from "./cartItem";
import { motion } from "framer-motion";
import { useAuth } from "~/context/auth/auth.hooks";
import api from "~/services/api";

interface CartSidebarProps {
  onClose: () => void;
}

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
}

interface ItemCartFromAPI {
  id: string;
  addedAt: string;
  product: Product;
}

export const CartSidebar = ({ onClose }: CartSidebarProps) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"cart" | "history">("cart");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const [cartItems, setCartItems] = useState<ItemCartFromAPI[]>([]);
  const [purchasesItems, setPurchasesItems] = useState<ItemCartFromAPI[]>([]);

  useEffect(() => {
    if (!user) return;
    const fetchItemsCart = async () => {
      try {
        setLoading(true);
        const res = await api.get(`cart/user/${user._id}`);
        setCartItems(res.data.itemsCart);
      } catch (err) {
        console.error("Erro ao buscar carrinho:", err);
      } finally {
        setLoading(false);
      }
    };
    const fetchPurchases = async () => {
      try {
        setLoading(true);
        const res = await api.get(`purchases/user/${user._id}`);
        // setPurchasesItems(res.data.itemsCart);
      } catch (err) {
        console.error("Erro ao buscar histórico:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchItemsCart();
    fetchPurchases();
  }, [user]);

  const toggleItemSelection = (itemId: string) => {
    setSelectedItems((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  const selectAllItems = () => {
    setSelectedItems(cartItems.map((item) => item.id));
  };

  const clearSelection = () => {
    setSelectedItems([]);
  };
  async function removeAllItems() {
    try {
      const res = await api.delete(`cart/user/${user._id}`);

    } catch (error) {
      console.error("Erro ao remover itens:", error);
    }
  }

  // Para remover um item individual (passado ao CartItem)
  async function removeSingleItem(itemId: string) {
    try {
      const res = await api.delete(`cart/user/${user._id}/product/${itemId}`);
      setCartItems((prev) => prev.filter((item) => item.id !== itemId));
      setSelectedItems((prev) => prev.filter((id) => id !== itemId));
    } catch (error) {
      console.error("Erro ao remover item:", error);
    }
  }

  const totalPrice = cartItems.reduce((acc, item) =>
    selectedItems.includes(item.id) ? acc + item.product.price : acc, 0
  );

  return (
    <>
      <motion.div
        key="backdrop"
        className="fixed inset-0 z-40 pointer-events-auto"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        key="sidebar"
        className="fixed right-0 top-0 z-50 w-96 h-full flex flex-col pointer-events-auto"
        style={{
          backgroundColor: "var(--color-bg)",
          borderLeft: "1px solid var(--color-border)",
          color: "var(--color-text)",
        }}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Header */}
        <div className="p-4 border-b" style={{ borderColor: "var(--color-border)" }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-[var(--color-accent)]" />
              <h2 className="text-lg font-semibold">Carrinho</h2>
            </div>
            <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center border-b" style={{ borderColor: "var(--color-border)" }}>
          <button
            onClick={() => setActiveTab("cart")}
            className="flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 border-b-2"
            style={{
              borderColor: activeTab === "cart" ? "var(--color-accent)" : "transparent",
              color: activeTab === "cart" ? "var(--color-accent)" : "var(--color-muted)",
            }}
          >
            <ShoppingCart className="w-4 h-4" />
            Carrinho
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className="flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 border-b-2"
            style={{
              borderColor: activeTab === "history" ? "var(--color-accent)" : "transparent",
              color: activeTab === "history" ? "var(--color-accent)" : "var(--color-muted)",
            }}
          >
            <History className="w-4 h-4" />
            Histórico
          </button>
        </div>

        {/* Conteúdo */}
        {activeTab === "cart" ? (
          <div className="flex-1 flex flex-col">
            {/* Ações */}
            <div className="p-2 flex justify-between items-center text-sm gap-3">
              <div className="flex gap-2 flex-grow max-w-[65%]">
                <button
                  onClick={selectAllItems}
                  disabled={selectedItems.length === cartItems.length}
                  className="min-w-[110px] max-w-[150px] h-9 px-3 text-xs rounded-md border border-[var(--color-border)] bg-transparent disabled:opacity-50 hover:bg-[var(--color-muted)]/10 transition flex items-center justify-center break-words"
                >
                  <Check className="w-4 h-4 mr-1 shrink-0" />
                  Selecionar Todos
                </button>
                {selectedItems.length > 0 && (
                  <button
                    onClick={clearSelection}
                    className="min-w-[110px] max-w-[150px] h-9 px-3 text-xs rounded-md border border-[var(--color-border)] bg-transparent hover:bg-[var(--color-muted)]/10 transition flex items-center justify-center break-words"
                  >
                    Limpar Seleção
                  </button>
                )}
              </div>
              {selectedItems.length === cartItems.length && (
                <button
                  onClick={removeAllItems}
                  className="min-w-[130px] max-w-[170px] h-9 px-3 text-xs rounded-md border border-red-400 text-red-600 hover:bg-red-100/50 transition flex items-center justify-center break-words"
                >
                  <Trash2 className="w-4 h-4 mr-1 shrink-0" />
                    Limpar Carrinho
                </button>
              )}
            </div>

            {/* Lista de Itens */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cartItems.map((cartItem) => (
                <CartItem
                  key={cartItem.id}
                  item={{
                    id: cartItem.id,
                    name: cartItem.product.name,
                    price: cartItem.product.price,
                    category: cartItem.product.category,
                    quantity: 1,
                    addedAt: new Date(cartItem.addedAt),
                  }}
                  isSelected={selectedItems.includes(cartItem.id)}
                  onToggleSelection={toggleItemSelection}
                  onRemove={() => removeSingleItem(cartItem.product.id)}
                  showSelection
                  showRemoveButton
                />
              ))}
            </div>

            {/* Total */}
            {selectedItems.length > 0 && (
              <div className="p-4 border-t" style={{ borderColor: "var(--color-border)" }}>
                <div className="flex justify-between font-medium text-base">
                  <span>Total</span>
                  <span>R$ {totalPrice.toFixed(2)}</span>
                </div>
                <button
                  disabled
                  className="mt-4 w-full px-4 py-2 rounded-md flex items-center justify-center gap-2 opacity-50 cursor-not-allowed"
                  style={{
                    backgroundColor: "var(--color-accent)",
                    color: "var(--color-bg)",
                  }}
                >
                  <ShoppingBag className="w-4 h-4" />
                  Finalizar Compra (em breve)
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {/* Conteúdo histórico */}
            <div className="flex items-center justify-center p-8 w-full">
              <div className="text-center">
                <History className="w-12 h-12 mx-auto mb-3 text-[var(--color-muted)]" />
                <p className="text-[var(--color-muted)]">Nenhuma compra realizada</p>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </>
  );
};
