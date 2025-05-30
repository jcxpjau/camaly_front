import type { Route } from "../+types/root";
import Settings from "~/pages/user/settings/Settings";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Camaly | Settings" },
        { name: "description", content: "Settings for Camaly!" },
    ];
}

export default function Settingss() {
    return (
        <Settings/>
    );
}