// import libraries
import type { JSX, ReactNode } from "react";

type DescriptionProps = { children: ReactNode };

const Description = ({ children }: DescriptionProps): JSX.Element => {
  return <p className="text-sm text-[color:var(--color-text)]">{children}</p>;
};

export default Description;
