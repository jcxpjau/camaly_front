import type { Route } from "../+types/root";
import Home from "~/pages/user/dashboard/Home/Home";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "New React Router App" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

  export default function DashboardHome() {
    return (
        <Home/>
    );
}