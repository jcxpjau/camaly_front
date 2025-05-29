import type { Route } from "../+types/root";
import Settings from "~/pages/user/settings/Settings";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Camaly | Home" },
        { name: "description", content: "Welcome to Camaly!" },
    ];
}

export default function Settingss() {
    return (
        <Settings/>
    );
}