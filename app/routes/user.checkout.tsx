import Checkoutt from "~/pages/user/dashboard/Checkout/Checkout";
import type { Route } from "../+types/root";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Camaly | Checkout" },
        { name: "description", content: "Checkout !" },
    ];
}

export default function Checkout() {
    return (
        <Checkoutt />
    );
}