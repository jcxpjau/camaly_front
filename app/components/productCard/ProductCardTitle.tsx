// import libraries
import type { ReactNode, JSX } from "react";

type TitleProps = { children: ReactNode };

const Title = ({ children }: TitleProps): JSX.Element=> {
  return <h3 className="text-xl font-semibold mb-2 break-words">{children}</h3>;
}

export default Title
