import { useEffect } from "react";
import type { Route } from "../+types/root";
import { useAuth } from '../context/auth/auth.hooks';
import { useDispatch } from 'react-redux'
import { login } from '../context/auth/authSlice'
import Home from "~/pages/user/dashboard/Home";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "New React Router App" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

  export default function DashboardHome() {
    return (
        <div className="flex flex-col h-screen">
            {/* Navbar fixa no topo */}
            {/* <nav className="h-16 bg-[#2A2A2A] text-white flex items-center px-4 border-b">
                Navbar
            </nav> */}

            <div className="flex flex-1">
                {/* Sidebar à esquerda */}
               {/*  <aside className="w-36 bg-[#2A2A2A] border-e text-white p-4 lg:block hidden">
                Sidebar
                </aside> */}

                {/* Conteúdo principal (Home) */}
                <div className="flex-1 overflow-y-auto">
                    <Home/>
                </div>
            </div>
        </div>
    );
}