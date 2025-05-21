import ProductCard from "../../../../components/product-card/ProductCard";
import { motion } from 'framer-motion';
import './Home.css'
import chatbotImg from '../../../../assets/dashboard/chatbot.png';
import postsImg from '../../../../assets/dashboard/posts.png';
import emailImg from '../../../../assets/dashboard/email.png'

const products = [
  {
    id: 1,
    title: "Customer Support",
    description: "Customize the agent to meet all your customers' needs.",
    image: chatbotImg
  },
  {
    id: 2,
    title: "Automated Posts",
    description: "Schedule posts and generate captions using our specialized agent.",
    image: postsImg
  },
  {
    id: 3,
    title: "Reminders",
    description: "Avoid no-shows with this reminder and confirmation email automator.",
    image: emailImg
  }
];

const userName = 'Nanni';

export default function Home() {

    return (
        <div className="p-6 space-y-6 text-white min-h-screen">
            <motion.div
                className="mb-16 mx-1"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
            >
                <h1 className="accent text-4xl md:text-3xl font-bold bg-gradient-to-r text-transparent bg-clip-text mb-4 drop-shadow-lg">
                    Welcome back, {userName}
                </h1>
                <p className="text-lg md:text-xl text-gray-300 font-light max-w-2xl leading-relaxed animate-fade-in">
                    Explore what’s new!
                </p>
            </motion.div>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {products.map(product => (
                    <div key={product.id} className="relative">
                        <ProductCard
                            title={product.title}
                            description={product.description}
                            image={product.image}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
