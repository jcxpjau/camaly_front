import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import type { JSX } from "react";
import { useState, useEffect } from "react";
import "./Home.css";
import { ProductCard } from "~/components/productCard";
import ProductPanel from "~/components/productPanel/ProductPanel";
import { ICONS } from "~/components/filterBar/iconCategories";

interface Purchase {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: JSX.Element;
}

const Home = (): JSX.Element => {
  const { t } = useTranslation();
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // ✅ novo estado da página

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}purchases/user/682e275f1d6355d68ebff580`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImR1ZGFwaW1lbnRlbEBtYWlsLmNvbSIsInN1YiI6IjY4MzcwZTgwMDA1YWU5ZDBiMjY5Zjk2NCIsImlhdCI6MTc0ODQ0OTYxOCwiZXhwIjoxNzUwMTc3NjE4fQ.6iSWb8w_oWEkug7u8z-wHTj0ds3teBQPPXtuyg_OiJM`,
            },
          }
        );
        const json = await res.json();
        if (!res.ok) {
          console.error("Error getting purchases:", json);
          return;
        }
        const mappedData: Purchase[] = json.map((item: any) => ({
          id: item.productId._id,
          name: item.productId.name,
          description: item.productId.description,
          price: item.productId.price,
           icon: ICONS[item.productId.iconName] ?? ICONS["bot"], 
        }));
        setPurchases(mappedData);
      } catch (err: any) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
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
            {t("home.greeting", { name: "Nanni" })}
          </h1>
          <p className="text-lg md:text-xl text-[color:var(--color-text)] font-light max-w-2xl leading-relaxed animate-fade-in">
            {t("home.subtitle")}
          </p>
        </motion.div>
        {purchases.length > 0 ? (
          <ProductPanel
            itemsPerPage={3}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          >
            {purchases.map((purchase) => (
              <ProductCard.Root key={purchase.id}>
                <ProductCard.Header
                  icon={purchase.icon}
                  price={`$${purchase.price.toFixed(0)}`}
                />
                <ProductCard.Title>{purchase.name}</ProductCard.Title>
                <ProductCard.Description>
                  {purchase.description}
                </ProductCard.Description>
                <ProductCard.Footer>
                  <ProductCard.MoreInfoButton />
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
    </div>
  );
};

export default Home;
