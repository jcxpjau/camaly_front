//import libraries
import type { JSX, ReactNode } from "react";

type RootProps = {
  children: ReactNode;
};

const Root = ({ children }: RootProps): JSX.Element => {
  return (
    <div className="flex w-full justify-start mb-2 ">
      <div className="flex flex-row gap-2 w-full max-w-[50%]">
        {children}
      </div>
    </div>
  );
};

export default Root;
