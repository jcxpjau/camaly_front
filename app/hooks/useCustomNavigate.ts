import { useNavigate } from "react-router";
import { useSideBar } from "~/context/theme/sidebar.hooks";

export function useCustomNavigate() {
  const navigate = useNavigate();
  const {isOpen, toggleSidebar} = useSideBar();

  return (e: React.MouseEvent, route: string) => {
    e.preventDefault();
    if( isOpen ) {
      toggleSidebar();
    }
    navigate(route);
  };
}