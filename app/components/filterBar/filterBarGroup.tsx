//import libraries
import type { JSX, ReactNode } from "react";

type RootProps = {
  children: ReactNode;
};

const Group = ({ children }: RootProps): JSX.Element => {
  return (
    <div className="flex flex-1 min-w-0 gap-2 relative w-full justify-end h-11">
      {children}
    </div>
  );
};

export default Group