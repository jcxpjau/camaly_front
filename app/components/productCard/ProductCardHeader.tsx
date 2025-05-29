// import libraries
import type {ReactElement, JSX } from "react";

type HeaderProps = {
  icon: ReactElement;
  price: number;
};

const Header = ({ icon, price }: HeaderProps): JSX.Element => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="text-base text-[var(--color-text)]">{icon}</div>
      <div
        className="text-sm px-2 py-1 rounded-full"
        style={{
          backgroundColor: "var(--color-accent)",
          color: "#fff",
        }}
      >
        $ {Number(price).toFixed(2)}
      </div>
    </div>
  );
}


export default Header