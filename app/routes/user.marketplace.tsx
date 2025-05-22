import type { Route } from "../+types/root";
import Marketplace from "~/pages/user/dashboard/Marketplace/Marketplace";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Camaly | Marketplace" },
        { name: "description", content: "Marketplace Camaly!" },
    ];
}

  export default function DashboardHome() {
    return (
        <Marketplace/>
    );
}