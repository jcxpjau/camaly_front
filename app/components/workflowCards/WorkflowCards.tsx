import { ShoppingCart, ArrowRight } from "lucide-react";
import type { ReactElement } from "react";
import './WorkflowCards.css'

type WorkflowCardProps = {
  title: string;
  description: string;
  icon: ReactElement;
  price: string;
};

export default function WorkflowCard({
    title,
    description,
    icon,
    price,
    }: WorkflowCardProps) {
    return (
        <div className="rounded-2xl fluxCard p-6 shadow-xl flex flex-col justify-between text-white transition hover:scale-[1.02] duration-300 h-[300px]">

            <div>
                <div className="flex items-center justify-between mb-4">
                <div className="text-2xl">{icon}</div>
                <div className="text-sm bg-purple-500 text-white px-2 py-1 rounded-full">{price}</div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-sm text-zinc-300">{description}</p>
            </div>
            <div className="flex justify-between items-center mt-6">
                <button className="flex items-center gap-2 text-sm font-medium bg-purple-600 px-4 py-2 rounded-xl hover:bg-purple-700 transition">
                <ShoppingCart size={16} /> Buy
                </button>
                <button title="More information">
                    <ArrowRight size={18} className="opacity-70" />
                </button>
            </div>
        </div>
    );
}
