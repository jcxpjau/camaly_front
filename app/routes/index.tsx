import Home from "~/pages/user/dashboard/Home/Home";
import type { Route } from "../+types/root";
import Concierge from "~/pages/user/dashboard/Concierge/Concierge";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Camaly | Home" },
        { name: "description", content: "Welcome to Camaly!" },
    ];
}

  export default function DashboardStats() {
    return (
        <Home />
    );
}