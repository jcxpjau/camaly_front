import type { Route } from "../+types/root";
import NewAgents from "~/pages/user/dashboard/NewAgents/NewAgents";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Camaly | New agent" },
        { name: "description", content: "New agent on Camaly!" },
    ];
}

export default function DashboardHome() {
    return (
        <NewAgents/>
    );
}