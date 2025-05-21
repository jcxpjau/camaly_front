import type { Route } from "../+types/root";
import { login } from '../context/auth/authSlice'
import Test from "~/pages/Test";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "New React Router App" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export default function Dashboard() {
      
    return <Test />;
}
