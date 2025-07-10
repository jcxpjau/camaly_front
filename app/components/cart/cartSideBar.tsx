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
import { useTranslation } from "react-i18next";
import { useCustomNavigate } from "~/hooks/useCustomNavigate";

interface CartSidebarProps {
  onClose: () => void;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
}

//Resposta API para itens do carrinho
export interface ItemCartFromAPI {
  id: string;//Id do carrinho
  addedAt: string;
  product: Product;
}

interface PurchaseItemFromAPI {
  id: string;
  productId: Product;
  createdAt: string;
}


export interface SelectedItem {
  cartId: string;
  productId: string;
  name: string;
  price: number;
}

export const CartSidebar = ({ onClose }: CartSidebarProps) => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const navigate = useCustomNavigate();

  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"cart" | "history">("cart");

  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);

  const [cartItems, setCartItems] = useState<ItemCartFromAPI[]>([]);

  const [purchasesItems, setPurchasesItems] = useState<PurchaseItemFromAPI[]>([]);

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
    setPurchasesItems(res.data); // aqui o res.data já é o array correto
  } catch (err) {
    console.error("Erro ao buscar histórico:", err);
  } finally {
    setLoading(false);
  }
};
    fetchItemsCart();
    fetchPurchases();
  }, [user]);

  function selectItem(cartId: string) {
    setSelectedItems(function(prev) {//Primeiro pega o estado anterior (antes do click para selecionar)
      //Verifica se o item clicado já estava selecionado
      const exists = prev.find(function(item) {
        return item.cartId === cartId;
      });
      
      if (exists) {
        //Se já está selecionado, remove ele da lista
        return prev.filter(function(item) {
          return item.cartId !== cartId;
        });
      } 
      else {
        //Se não está selecionado, busca o item completo no carrinho
        const itemToAdd = cartItems.find(function(item) {
          return item.id === cartId;
        });

        if (!itemToAdd) {
          // Se não encontrar o item, retorna o estado anterior (sem mudanças)
          return prev;
        }

        //Adiciona o item na seleção, com os campos relevantes (id, nome, preço)
        return prev.concat({
          cartId: itemToAdd.id,
          productId: itemToAdd.product.id,
          name: itemToAdd.product.name,
          price: itemToAdd.product.price,
        });
      }
    });
}

  function selectAllItems() {
    //Mapeia todos os itens do carrinho
    const allSelected = cartItems.map(function(item) {
      return {
        cartId: item.id,
        productId: item.product.id,
        name: item.product.name,
        price: item.product.price
      };
    });

    //Atualiza o estado com todos os itens mapeados, selecionou todos
    setSelectedItems(allSelected);
  }

  function clearSelection(){
    setSelectedItems([]);
  };

  async function removeAllItems() {
    try {
      await api.delete(`cart/user/${user._id}`);
      setCartItems([]);
      setSelectedItems([]);
    } catch (error) {
      console.error("Erro ao remover itens:", error);
    }
  }

  async function removeSingleItem(productId: string) {
    try {
      await api.delete(`cart/user/${user._id}/product/${productId}`);
      setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
      setSelectedItems((prev) => prev.filter((item) => item.productId !== productId));
    } catch (error) {
      console.error("Erro ao remover item:", error);
    }
  }

  const totalPrice = selectedItems.reduce((acc, item) => acc + item.price, 0);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)] text-[var(--color-text)]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-[var(--color-muted)]">{t("loading")}</p>
        </div>
      </div>
    );
  }

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
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {cartItems.length > 0 ? (
                  cartItems.map((cartItem) => (
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
                      isSelected={selectedItems.some(item => item.cartId === cartItem.id)}
                      onToggleSelection={selectItem}
                      onRemove={() => removeSingleItem(cartItem.product.id)}
                      showSelection
                      showRemoveButton
                    />
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center p-6 text-[var(--color-muted)]">
                    <ShoppingCart className="w-12 h-12 mb-3" />
                    <p className="text-base font-medium">Carrinho vazio</p>
                    <p className="text-sm mt-1">Você ainda não adicionou nenhum produto.</p>
                  </div>
                )}
              </div>
            {selectedItems.length > 0 && (
              <div className="p-4 border-t" style={{ borderColor: "var(--color-border)" }}>
                <div className="flex justify-between font-medium text-base">
                  <span>Total</span>
                  <span>R$ {totalPrice.toFixed(2)}</span>
                </div>
                <button
                  className="mt-4 w-full px-4 py-2 rounded-md flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: "var(--color-accent)",
                    color: "var(--color-bg)",
                  }}
                  onClick={(e) => {
                  navigate(e, `/user/checkout`);
                  }}
                >
                  <ShoppingBag className="w-4 h-4" />
                  Finalizar Compra
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {purchasesItems.length > 0 ? (
              <div className="flex flex-col gap-3">
                {purchasesItems.map((purchaseItem) => (
                  <CartItem
                    key={purchaseItem.id}
                    item={{
                      id: purchaseItem.id,
                      name: purchaseItem.productId.name,
                      price: purchaseItem.productId.price,
                      category: purchaseItem.productId.category,
                      quantity: 1,
                      addedAt: new Date(purchaseItem.createdAt),
                    }}
                    showSelection={false}
                    showRemoveButton={false}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-6 text-[var(--color-muted)]">
                <History className="w-12 h-12 mb-3" />
                <p className="text-base font-medium">Nenhuma compra encontrada</p>
                <p className="text-sm mt-1">Você ainda não realizou nenhuma compra.</p>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </>
  );
};
