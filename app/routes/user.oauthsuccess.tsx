import { OAuthSuccess } from "~/pages/user/Oauthsuccess";
import type { Route } from "../+types/root";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Camaly | Reports" },
        { name: "description", content: "Welcome to Camaly!" },
    ];
}

  export default function Oauthsuccesss() {
    return (
        <OAuthSuccess />
    );
}