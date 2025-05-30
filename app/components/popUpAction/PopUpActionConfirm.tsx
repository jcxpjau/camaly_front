import { Check } from "lucide-react";
import type { JSX } from "react";

type ConfirmButtonProps = {
  onClick: () => void;
  children?: string;
};

const ConfirmButton = ({ onClick }:  ConfirmButtonProps): JSX.Element => (
  <button
    onClick={onClick}
    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
  >
   <Check />
  </button>
);

export default ConfirmButton