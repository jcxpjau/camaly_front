// import libraries
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import type { JSX } from "react";
//import styling
import "./Home.css";
//import components
import { ProductCard } from "~/components/productCard";
import ProductPanel from "~/components/productPanel/ProductPanel";
//import icons
import { Bot, Mail } from "lucide-react";

const Home = (): JSX.Element => {
  const { t } = useTranslation();

  const products = [
    {
      id: 1,
      title: t("home.products.contentImprovement.title"),
      description: t("home.products.contentImprovement.description"),
      icon: <Bot className="w-5 h-5 text-[color:var(--color-accent)]" />,
      price: "$25",
    },
    {
      id: 2,
      title: t("home.products.businessAnalysis.title"),
      description: t("home.products.businessAnalysis.description"),
      icon: <Mail className="w-5 h-5 text-[color:var(--color-accent)]" />,
      price: "$12",
    },
  ];

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

        <ProductPanel itemsPerPage={3}>
          {products.map((product) => (
            <ProductCard.Root key={product.id}>
              <ProductCard.Header icon={product.icon} price={product.price} />
              <ProductCard.Title>{product.title}</ProductCard.Title>
              <ProductCard.Description>{product.description}</ProductCard.Description>
              <ProductCard.Footer>
                <ProductCard.MoreInfoButton />
              </ProductCard.Footer>
            </ProductCard.Root>
          ))}
        </ProductPanel>
      </div>
    </div>
  );
};

export default Home;
