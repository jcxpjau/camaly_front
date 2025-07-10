import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Trash2,
  Check,
} from "lucide-react";
import { useNavigate } from "react-router";
import { useAuth } from "~/context/auth/auth.hooks";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import api from "~/services/api";
import type { ItemCartFromAPI, SelectedItem } from "~/components/cart/cartSideBar";
import { CartItem } from "~/components/cart/cartItem";
import { Input } from "~/components/input/input";
import { PaymentTabs } from "~/components/checkout/paymentsTabs";

export default function Checkout() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [cartItems, setCartItems] = useState<ItemCartFromAPI[]>([]);
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);

  const [statusResPatchInfo, setStatusResPatchInfo] = useState('');
  const [textResPatchInfo, setTextResPatchInfo] = useState('');

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    cpf: "",
    company: "",
  });

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
    fetchItemsCart();
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

    function clearSelection() {
    setSelectedItems([]);
    }

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

    function handleInputChange(field: string, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    }

    async function Checkout() {
        const productIds = selectedItems.map((item) => item.productId)
        try {
        const res = await api.post(`purchases/checkout`, productIds);
              if (res.status === 201) {
        setStatusResPatchInfo('success');
        setTextResPatchInfo(
          t('settings.personalSettings.sections.personalInformation.form.statusMessages.success')
        );
      } else {
        setStatusResPatchInfo('error');
        setTextResPatchInfo(
          t('settings.personalSettings.sections.personalInformation.form.statusMessages.error')
        );
      }
        } catch (err) {
            console.error("Erro ao limpar carrinho:", err);
        }
    }

    const totalAmount = selectedItems.reduce((acc, item) => acc + item.price, 0);

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
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] px-6 py-10 mb-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-[var(--color-muted)] hover:text-[var(--color-text)] text-sm mb-2"
            type="button"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </button>
          <h1 className="text-3xl font-semibold">Checkout</h1>
        </motion.div>
                {statusResPatchInfo && (
          <div className={`text-[var(--color-text-${statusResPatchInfo})] text-sm p-3 rounded text-center my-4`}>
              {textResPatchInfo}
          </div>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-5">
        {/*PAYMENT*/}
          <div className="space-y-6">
            <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Dados Pessoais</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input.Root label="Nome *">
                    <Input.Content
                        placeholder="Seu nome"
                        type="text"
                        value={formData.firstName}
                        onChange={(v) => handleInputChange("firstName", v)}
                    />
                    </Input.Root>

                    <Input.Root label="Sobrenome *">
                    <Input.Content
                        placeholder="Seu sobrenome"
                        type="text"
                        value={formData.lastName}
                        onChange={(v) => handleInputChange("lastName", v)}
                    />
                    </Input.Root>

                    <Input.Root label="Email *">
                    <Input.Content
                        placeholder="seu@email.com"
                        type="email"
                        value={formData.email}
                        onChange={(v) => handleInputChange("email", v)}
                    />
                    </Input.Root>

                    <Input.Root label="Telefone *">
                    <Input.Content
                        placeholder="(11) 99999-9999"
                        type="text"
                        value={formData.phone}
                        onChange={(v) => handleInputChange("phone", v)}
                    />
                    </Input.Root>

                    <Input.Root label="CPF *">
                    <Input.Content
                        placeholder="000.000.000-00"
                        type="text"
                        value={formData.cpf}
                        onChange={(v) => handleInputChange("cpf", v)}
                    />
                    </Input.Root>

                    <Input.Root label="Empresa (opcional)">
                    <Input.Content
                        placeholder="Nome da empresa"
                        type="text"
                        value={formData.company}
                        onChange={(v) => handleInputChange("company", v)}
                    />
                    </Input.Root>
                </div>
            </div>
            <PaymentTabs selectedMethod={paymentMethod} onChange={setPaymentMethod} />
            <button
              onClick={Checkout}
              //disabled={selectedItems.length === 0 || !formData.firstName || !formData.email}
              className="w-full bg-[var(--color-accent)] hover:bg-[var(--color-special-purple)] text-white font-semibold py-3 text-lg rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
              type="button"
            >
              Finalizar Compra - R$ {totalAmount.toFixed(2)}
            </button>
          </div>
          {/*CARRINHO*/}
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Itens Selecionados</h2>
                <div className="flex gap-2">
                  <button
                    onClick={selectAllItems}
                    disabled={selectedItems.length === cartItems.length}
                    className="text-sm px-3 py-1 border rounded-md border-[var(--color-border)]"
                    type="button"
                  >
                    <Check className="w-4 h-4 inline-block mr-1" />
                    Selecionar Todos
                  </button>
                  <button
                    onClick={clearSelection}
                    className="text-sm px-3 py-1 border rounded-md border-[var(--color-border)]"
                    type="button"
                  >
                    Limpar Seleção
                  </button>
                  <button
                    onClick={removeAllItems}
                    className="text-sm px-3 py-1 border rounded-md border-red-400 text-red-500"
                    type="button"
                  >
                    <Trash2 className="w-4 h-4 inline-block mr-1" />
                    Limpar Carrinho
                  </button>
                </div>
              </div>
              <div className="space-y-3">
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
                isSelected={selectedItems.some(item => item.cartId === cartItem.id)}
                onToggleSelection={() => selectItem(cartItem.id)}
                onRemove={() => removeSingleItem(cartItem.product.id)}
                showSelection
                showRemoveButton
                />
                ))}
              </div>
            </div>
            <div className="bg-[var(--color-progress-bg)] border border-[var(--color-border)] rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Resumo do Pedido</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--color-muted)]">
                    Itens selecionados ({selectedItems.length})
                  </span>
                  <span>R$ {totalAmount.toFixed(2)}</span>
                </div>
                <hr className="border-[var(--color-divider)] my-3" />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span className="text-[var(--color-accent)]">
                    R$ {totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
