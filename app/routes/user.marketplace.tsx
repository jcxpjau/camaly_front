import type { Route } from "../+types/root";
import Marketplace from "~/pages/user/dashboard/Marketplace/Marketplace";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "New React Router App" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

  export default function DashboardHome() {
    return (
        <Marketplace/>
    );
}