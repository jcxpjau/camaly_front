import type { ReactNode } from "react";
import { X } from "lucide-react";
import "./popUpAction.css";

type RootProps = {
  children: ReactNode;
  onClose: () => void;
};

const PopupRoot = ({ children, onClose }: RootProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="relative bg-white/70 backdrop-blur-md rounded-2xl shadow-2xl px-6 py-8 flex flex-col w-[90vw] h-[90vh] sm:w-[40vw] sm:h-[30vh]"
      >
        {/* Botão de fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {children}
      </div>
    </div>
  );
};

export default PopupRoot;
