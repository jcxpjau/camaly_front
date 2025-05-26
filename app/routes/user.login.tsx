import type { Route } from "../+types/root";
import Loginn from "~/pages/user/login/Login";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Camaly | Home" },
        { name: "description", content: "Welcome to Camaly!" },
    ];
}

export default function Login() {
    return (
        <Loginn />
    );
}