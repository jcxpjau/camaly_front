import { useNavigate } from "react-router";

export function useCustomNavigate() {
  const navigate = useNavigate();

  return (e: React.MouseEvent, route: string) => {
    e.preventDefault();
    navigate(route);
  };
}