// import types
import type { JSX } from "react";
//import icons
import { X } from "lucide-react";

type CancelButtonProps = {
  onClick: () => void;
  children?: string;
};

const CancelButton = ({ onClick}: CancelButtonProps): JSX.Element  => (
   <button
    onClick={onClick}
    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
  >
   <X />
  </button>
);

export default CancelButton