import HomeAdmin from "~/pages/admin/dashboard/Home/Home";
import type { Route } from "../+types/root";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Camaly | Home" },
        { name: "description", content: "Welcome to Camaly!" },
    ];
}

export default function DashboardHome() {
    return (
        <HomeAdmin/>
    );
}