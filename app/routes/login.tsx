import type { Route } from "../+types/root";
import Loginn from "~/pages/user/login/Login";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Camaly | Sign In" },
        { name: "description", content: "Sign In to Camaly!" },
    ];
}

export default function Login() {
    return (
        <Loginn />
    );
}