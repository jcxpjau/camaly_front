import Reports from "~/pages/user/dashboard/Reports/Reports";
import type { Route } from "../+types/root";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Camaly | Reports" },
        { name: "description", content: "Welcome to Camaly!" },
    ];
}

  export default function DashboardReports() {
    return (
        <Reports />
    );
}