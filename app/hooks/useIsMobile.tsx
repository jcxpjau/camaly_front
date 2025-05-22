import { useEffect, useState } from "react";

export default function useIsMobile(breakpoint = 768) {
    const [isMobile, setIsMobile] = useState(
        typeof window !== "undefined" ? window.innerWidth <= breakpoint : false
    );

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= breakpoint);
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // para pegar o valor inicial corretamente

        return () => window.removeEventListener("resize", handleResize);
    }, [breakpoint]);

    return isMobile;
}
