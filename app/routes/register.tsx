import type { Route } from "../+types/root";
import Registerr from "~/pages/user/login/Register";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Camaly | Sign Up" },
        { name: "description", content: " Sign Up to Camaly" },
    ];
}

export default function Register() {
    return (
        <Registerr />
    );
}