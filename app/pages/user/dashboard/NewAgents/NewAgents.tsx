// import libraries
import { motion } from "framer-motion";
import type { JSX } from "react";
import { useTranslation } from "react-i18next";
// import styling
import "./NewAgents.css";
// import components
import { ProductCard } from "~/components/productCard";
import ProductPanel from "~/components/productPanel/ProductPanel";
// import images
import chatbotImg from "../../../../assets/dashboard/chatbot.png";
import postsImg from "../../../../assets/dashboard/posts.png";
import emailImg from "../../../../assets/dashboard/email.png";

const NewAgents = (): JSX.Element => {
  const { t } = useTranslation();

  const products = [
    {
      id: 1,
      title: t("newagents.customer-support-title"),
      description: t("newagents.customer-support-description"),
      image: chatbotImg,
    },
    {
      id: 2,
      title: t("newagents.automated-posts-title"),
      description: t("newagents.automated-posts-description"),
      image: postsImg,
    },
    {
      id: 3,
      title: t("newagents.reminders-title"),
      description: t("newagents.reminders-description"),
      image: emailImg,
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-16 mx-1"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-3xl font-bold text-[var(--color-text)] mb-2">
            {t("agent")}
          </h1>

          <p className="text-lg md:text-xl text-[color:var(--color-text)] font-light max-w-2xl leading-relaxed animate-fade-in">
            {t("description")}
          </p>
        </motion.div>

        <ProductPanel itemsPerPage={3}>
          {products.map((product) => (
            <div className="relative flex-grow" key={product.id}>
              <ProductCard.Root>
                <ProductCard.Title>{product.title}</ProductCard.Title>
                <ProductCard.Description>{product.description}</ProductCard.Description>
                <ProductCard.ProductImage
                  image={product.image}
                  title={product.title}
                />
                <div className="absolute bottom-4 right-4">
                  <ProductCard.MoreInfoButton />
                </div>
              </ProductCard.Root>
            </div>
          ))}
        </ProductPanel>
      </div>
    </div>
  );
};

export default NewAgents;
