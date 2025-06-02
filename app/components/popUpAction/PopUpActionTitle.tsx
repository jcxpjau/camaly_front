// import types
import type { JSX } from "react";
// import styling
import './popUpAction.css'

type PopUpTextProps= {
  message: string;
};

const Title =  ({ message }: PopUpTextProps): JSX.Element  => {
  return (
    <p className="text-2xl text-black mb-4">
        {message}
    </p>
  );
};

export default Title;
