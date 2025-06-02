// import types
import type { JSX, ReactNode } from "react";

type PopupDescriptionProps = {
  children: ReactNode;
};

const Description = ({ children }: PopupDescriptionProps): JSX.Element => (
  <p className="text-xl text-black leading-relaxed mb-4">
    {children}
  </p>
);

export default Description;
