//import types
import type { ReactNode } from "react";
//import icons
import { X } from "lucide-react";
//import styling
import "./popUpAction.css";

type RootProps = {
  children: ReactNode;
  onClose: () => void;
};

const PopupRoot = ({ children, onClose }: RootProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
      <div
        className="relative popUp backdrop-blur-md rounded-2xl shadow-2xl px-8 py-8 flex flex-col w-[90vw] h-[90vh] sm:w-[40vw] sm:h-[30vh] pointer-events-auto"
      >

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
