// import libraries
import type { ReactNode, JSX } from "react";

type FooterProps = { children: ReactNode };

const Footer = ({ children }: FooterProps): JSX.Element => {
  return <div className="flex justify-between items-center mt-6">{children}</div>;
}

export default Footer