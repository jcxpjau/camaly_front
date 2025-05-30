import type { JSX } from "react";
import './popUpAction.css'

type PopUpTextProps= {
  message: string;
};

const Title =  ({ message }: PopUpTextProps): JSX.Element  => {
  return (
    <p className="text-2xl text-gray-800 mb-4">
        {message}
    </p>
  );
};

export default Title;
