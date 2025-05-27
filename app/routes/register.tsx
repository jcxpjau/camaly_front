import type { Route } from "../+types/root";
import Registerr from "~/pages/user/login/Register";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Camaly | Home" },
        { name: "description", content: "Welcome to Camaly!" },
    ];
}

export default function Register() {
    return (
        <Registerr />
    );
}