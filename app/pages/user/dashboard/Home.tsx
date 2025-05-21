import ProductCard from "../../../components/product-card/ProductCard";
import { motion } from 'framer-motion';

export default function Home() {
    const products = [
        {
            id: 1,
            title: "Generic",
            description: "Um agente completamente personalizável para as necessidades do seu negócio.",
            image: "/placeholder.svg"
        },
        {
            id: 2,
            title: "SDR",
            description: "Processos pré-determinados para tirar dúvidas, qualificar leads e fazer agendamentos.",
            image: "/placeholder.svg"
        },
        {
            id: 3,
            title: "SDR",
            description: "Processos pré-determinados para tirar dúvidas, qualificar leads e fazer agendamentos.",
            image: "/placeholder.svg"
        }
    ];

    const userName = 'Nanni';

    return (
        <main className="flex-1 p-8 bg-[#2A2A2A] overflow-y-auto h-full place-content-center">
            <div className="max-w-6xl mx-auto w-full">
                <motion.div
                    className="mb-16 mx-1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    >
                    <h1 className="text-white font-semibold text-3xl mb-2">Hi, {userName}</h1>
                    <p className="text-white font-light text-2xl">Look at the news products!</p>
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
        </main>
    );
}
