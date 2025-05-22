import { motion } from "framer-motion";
//import styles
import "./Home.css";
// import components
import NewsCard from "../../../../components/newsCard/NewsCard";
// import assets
import chatbotImg from "../../../../assets/dashboard/chatbot.png";
import postsImg from "../../../../assets/dashboard/posts.png";
import emailImg from "../../../../assets/dashboard/email.png";

const products = [
  {
    id: 1,
    title: "Customer Support",
    description: "Customize the agent to meet all your customers' needs.",
    image: chatbotImg,
  },
  {
    id: 2,
    title: "Automated Posts",
    description:
      "Schedule posts and generate captions using our specialized agent.",
    image: postsImg,
  },
  {
    id: 3,
    title: "Reminders",
    description:
      "Avoid no-shows with this reminder and confirmation email automator.",
    image: emailImg,
  },
];

const userName = "Nanni";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] px-6 py-10">
      <div className="max-w-7xl mx-auto space-y-6">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className="accent text-3xl font-bold bg-gradient-to-r text-transparent bg-clip-text mb-2 drop-shadow-lg">
            Welcome back, {userName}
          </h1>
          <p className="text-lg md:text-xl text-[var(--color-muted)] font-light max-w-2xl leading-relaxed">
            Explore what’s new!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {products.map((product) => (
            <div key={product.id} className="relative">
              <NewsCard
                title={product.title}
                description={product.description}
                image={product.image}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

