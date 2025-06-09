import type { Route } from "../+types/root";
import { SocialMediaAgent } from "~/pages/user/dashboard/Agents/SocialMediaAgent";
export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Camaly | Settings" },
        { name: "description", content: "Settings for Camaly!" },
    ];
}

export default function SocialMediaAgentt() {
    return (
        <SocialMediaAgent/>
    );
}