import type { Route } from "../+types/root";
import Concierge from "~/pages/user/dashboard/Concierge/Concierge";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "New React Router App" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

  export default function DashboardStats() {
    return (
        <Concierge/>
    );
}