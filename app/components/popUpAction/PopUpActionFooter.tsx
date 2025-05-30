import type { ReactNode } from "react";
import type { JSX } from "react";

type PopupFooterProps = {
  children: React.ReactNode;
};

const Footer = ({ children }: PopupFooterProps): JSX.Element => (
  <div className="mt-auto flex justify-center items-center gap-4 pt-6">
    {children}
  </div>
);

export default Footer;
