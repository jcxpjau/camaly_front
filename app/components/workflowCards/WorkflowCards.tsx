import { ShoppingCart, ArrowRight } from "lucide-react";
import type { ReactElement } from "react";
import './WorkflowCards.css';

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
    <div
      className="fluxCard rounded-2xl p-6 shadow-xl flex flex-col justify-between transition hover:scale-[1.02] duration-300 h-[300px]"
      style={{
        backgroundColor: "var(--color-bg-alt)",
        color: "var(--color-text)",
        border: "1px solid var(--color-border)",
      }}
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="text-base text-[color:var(--color-accent)]">{icon}</div>
          <div
            className="text-sm px-2 py-1 rounded-full"
            style={{
              backgroundColor: "var(--color-accent)",
              color: "#fff",
            }}
          >
            {price}
          </div>
        </div>
       <h3 className="text-xl font-semibold mb-2 break-words">
          {title}
        </h3>
        <p className="text-xs text-[color:var(--color-text)]">{description}</p>
      </div>
      <div className="flex justify-between items-center mt-6">
        <button
          className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl transition"
          style={{
            backgroundColor: "var(--color-accent)",
            color: "#fff",
          }}
          onMouseOver={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = "#4f46e5"; // alternativa hover
          }}
          onMouseOut={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-accent)";
          }}
        >
          <ShoppingCart size={16} /> Buy
        </button>
        <button title="More information">
          <ArrowRight size={18} className="opacity-70 text-[color:var(--color-text)]" />
        </button>
      </div>
    </div>
  );
}
