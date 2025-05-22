import type { Route } from "../+types/root";
import Home from "~/pages/user/dashboard/Home/Home";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Camaly | Home" },
        { name: "description", content: "Welcome to Camaly!" },
    ];
}

export default function DashboardHome() {
    return (
        <Home />
    );
}