//import libraries
import type { JSX, ReactNode } from "react";

type RootProps = {
  children: ReactNode;
};

const Root = ({ children }: RootProps): JSX.Element => {
  return (
    <div className="flex flex-wrap w-full justify-start mb-2 gap-2">
      {children}
    </div>
  );
};


export default Root;
