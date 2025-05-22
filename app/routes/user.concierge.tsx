import type { Route } from "../+types/root";
import Concierge from "~/pages/user/dashboard/Concierge/Concierge";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Camaly | Stats" },
        { name: "description", content: "Welcome to Camaly!" },
    ];
}

  export default function DashboardStats() {
    return (
        <Concierge/>
    );
}