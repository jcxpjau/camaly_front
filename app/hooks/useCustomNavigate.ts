import { useNavigate } from "react-router";
import { useSideBar } from "~/context/theme/sidebar.hooks";
import useIsMobile from "./useIsMobile";

export function useCustomNavigate() {
    const navigate = useNavigate();
    const { isOpen, toggleSidebar } = useSideBar();
    const isMobile = useIsMobile();

    return (e: React.MouseEvent, route: string) => {
        e.preventDefault();
        if (isOpen && isMobile) {
            toggleSidebar();
        }
        navigate(route);
    };
}