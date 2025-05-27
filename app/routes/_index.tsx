import Home from "~/pages/user/dashboard/Home/Home";
import type { Route } from "../+types/root";
import { useAuth } from "~/context/auth/auth.hooks";
import Login from "~/pages/user/login/Login";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Camaly | Welcom to Camaly!" },
        { name: "description", content: "Welcome to Camaly!" },
    ];
}

export default function DashboardStats() {

    const { user } = useAuth();

    return (
        user ? <Home /> : <Login />
    );
}