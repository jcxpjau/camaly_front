//import libraries
import type { JSX, ReactNode } from "react";

type RootProps = {
  children: ReactNode;
};

const Group = ({ children }: RootProps): JSX.Element => {

    return(
        <>
        
            {children}
        </>
        
    )
}

export default Group