import Home from "~/pages/user/dashboard/Home/Home";
import type { Route } from "../+types/root";
import Login from "~/pages/user/login/Login";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Camaly | Welcome to Camaly!" },
        { name: "description", content: "Welcome to Camaly!" },
    ];
}

export default function DashboardStats() {

    return (
        <Home />
    );
}