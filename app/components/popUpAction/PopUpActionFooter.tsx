//import types
import type { JSX } from "react";

type PopupFooterProps = {
  children: React.ReactNode;
};

const Footer = ({ children }: PopupFooterProps): JSX.Element => (
  <div className="flex justify-center items-center gap-5 mt-10">
    {children}
  </div>
);

export default Footer;
