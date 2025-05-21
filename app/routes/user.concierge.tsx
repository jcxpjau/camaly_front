import { useEffect } from "react";
import type { Route } from "../+types/root";
import { useAuth } from '../context/auth/auth.hooks';
import { useDispatch } from 'react-redux'
import { login } from '../context/auth/authSlice'
import Concierge from "~/pages/user/dashboard/Concierge/Concierge";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "New React Router App" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

  export default function DashboardStats() {
    return (
        <Concierge/>
    );
}