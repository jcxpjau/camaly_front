import { useEffect, useState } from "react";
import { Settings, Plus } from "lucide-react";
import { useAuth } from "~/context/auth/auth.hooks";
import api from "~/services/api";
import { ProductCardAdmin } from "~/components/productCardAdmin";
import { useTranslation } from "react-i18next";
import { EditProductModal } from "~/components/productCardAdmin/ProductEditModalAdmin";
import type { Product } from "~/components/productCardAdmin/ProductEditFormAdmin"; // usa o mesmo tipo

export default function HomeAdmin() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [statusResPatchInfo, setStatusResPatchInfo] = useState('');
  const [textResPatchInfo, setTextResPatchInfo] = useState('');

  const { t } = useTranslation();

  useEffect(() => {
    if (!user) return;
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await api.get<Product[]>("products/all/admin");
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [user]);

  async function UpdateProduct(updated: Partial<Product> & { _id: string }) {
    //Update é do tipo product, porém parcial que irá somente as infos alteradas
    try {
      const res = await api.put(`products/edit/${updated._id}/admin`, updated);
      //Atualizando a lista para ver o produto já atualizado
      setProducts((prev) =>
        prev.map((p) => (p._id === updated._id ? res.data : p))
      );
      if (res.status === 200) {
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
      setEditingProduct(null);
    } catch (err) {
      console.error("Erro ao atualizar produto:", err);
    }
  }

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
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-6 py-6">
        {statusResPatchInfo && (
          <div className={`text-[var(--color-text-${statusResPatchInfo})] text-sm p-3 rounded text-center my-4`}>
              {textResPatchInfo}
          </div>
        )}
        {products.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-6 h-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">
              Nenhum workflow encontrado
            </h3>
            <p className="text-muted-foreground">
              Comece criando seu primeiro workflow
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((wf) => (
              <ProductCardAdmin.Root key={wf._id}>
                <ProductCardAdmin.Image
                  imageUrl={wf.imageUrl}
                  active={wf.active}
                />
                <div className="p-4 space-y-3">
                  <ProductCardAdmin.Header
                    name={wf.name}
                    category={wf.category}
                  />
                  <ProductCardAdmin.Description text={wf.description} />
                  <ProductCardAdmin.Badges
                    provider={wf.providerConnection}
                  />
                  <ProductCardAdmin.Footer price={wf.price}                     
                    onEdit={() => setEditingProduct(wf)} 
                  />
                </div>
              </ProductCardAdmin.Root>
            ))}
          </div>
        )}
      </div>
      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSave={UpdateProduct}
        />
      )}
    </div>
  );
}
