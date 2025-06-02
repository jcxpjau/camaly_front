//import libraries
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import type { JSX } from "react";
import { useState, useEffect } from "react";
//import styling
import "./Home.css";
//import components
import { ProductCard } from "~/components/productCard";
import ProductPanel from "~/components/productPanel/ProductPanel";
import { ICONS } from "~/components/filterBar/iconCategories";
import { useAuth } from "~/context/auth/auth.hooks";
import api from "~/services/api";
import { PopUpAction } from "~/components/popUpAction/";

//import icons
import { Check, Trash } from "lucide-react";

interface Purchase {
  _id: string;
  productId: string;
  name: string;
  description: string;
  price: number;
  category: string;
}

const Home = (): JSX.Element => {
  const { user, token } = useAuth();
  const { t } = useTranslation();
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPurchase, setSelectedPurchase] = useState<Purchase>();
  const [popUpOpen, setPopUpOpen] = useState(false);

  const onDelete = async () => {
    try {
      const id = selectedPurchase?._id;
      if(id){
          const { data } = await api.delete(`purchases/${id}`);
          setPurchases((prevItems) => prevItems.filter((item) => item._id !== id));
          setPopUpOpen(false);
          setSelectedPurchase(undefined);
      }
    } catch (error) {
     //console.error("Erro ao deletar o produto:", error);
    }
  };

  useEffect(() => {
    if (!user) {
      return;
    }
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await api.get(`purchases/user/${user._id}`);
        const json = res.data;

        const mappedData: Purchase[] = json
          .filter((item: { productId: null }) => item.productId !== null)
          .map((item: any) => ({
            _id: item._id,
            productId: item.productId._id,
            name: item.productId.name,
            description: item.productId.description,
            price: item.productId.price,
            category: item.productId.category,
          }));

        setPurchases(mappedData);
      } catch (err: any) {
        // /console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [user]);

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
          className="mb-16 mx-1"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="accent text-3xl bg-gradient-to-r text-transparent bg-clip-text mb-4 drop-shadow-lg">
            {t("home.greeting", { name: `${user.name}` })}
          </h1>
          <p className="text-lg md:text-xl text-[color:var(--color-text)] font-light max-w-2xl leading-relaxed animate-fade-in">
            {t("home.subtitle")}
          </p>
        </motion.div>

        {purchases.length > 0 ? (
          <ProductPanel
            itemsPerPage={4}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            paginate={true}
          >
            {purchases.map((purchase) => (
              <ProductCard.Root key={purchase._id}>
                <ProductCard.Header
                  icon={ICONS[purchase.category]}
                  price={purchase.price}
                />
                <ProductCard.Title>{purchase.name}</ProductCard.Title>
                <ProductCard.Description>
                  {purchase.description}
                </ProductCard.Description>
                <ProductCard.Footer>
                  <button
                    className="text-[var(--color-text)] hover:cursor-pointer"
                    onClick={() => {
                      setPopUpOpen(true), setSelectedPurchase(purchase);
                    }}
                  >
                    <Trash size={16} />
                  </button>
                </ProductCard.Footer>
              </ProductCard.Root>
            ))}
          </ProductPanel>
        ) : (
          <div className="h-[300px] flex items-center justify-center">
            <p className="text-xl"> {t("home.noProducts")} </p>
          </div>
        )}
      </div>
      {(popUpOpen && selectedPurchase)  && (
        <PopUpAction.Root onClose={() => setPopUpOpen(false)}>
          <PopUpAction.Title message={t("popUp.purchaseDeleteTitle", { name: `${selectedPurchase.name}` })} />
          <PopUpAction.Description>
            {t("popUp.purchaseDeleteDescription")}
          </PopUpAction.Description>
          <PopUpAction.Footer>
            <button
              className="flex items-center justify-center gap-3 px-8 py-2 rounded-lg confirmBtn text-black text-lg shadow-md ease-out duration-200 transform hover:scale-102"
              onClick={() => onDelete()}
            >
              <p> {t("popUp.purchaseDeleteConfirmation")}</p>
              <Check size={20} />
            </button>
          </PopUpAction.Footer>
        </PopUpAction.Root>
      )}
    </div>
  );
};

export default Home;
