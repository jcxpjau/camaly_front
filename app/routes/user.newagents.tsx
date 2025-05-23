import type { Route } from "../+types/root";
import NewAgents from "~/pages/user/dashboard/NewAgents/NewAgents";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Camaly | Home" },
        { name: "description", content: "Welcome to Camaly!" },
    ];
}

export default function DashboardHome() {
    return (
        <NewAgents/>
    );
}