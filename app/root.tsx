import {
    isRouteErrorResponse,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "react-router";
import { Provider } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { store, type RootState } from "./store";
import { useEffect, useLayoutEffect } from "react";
import type { Route } from "./+types/root";
import "./app.css";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import { useTheme } from "./context/theme/theme.hooks";
import { useAuth } from "./context/auth/auth.hooks";
import api from "./services/api";


export const links: Route.LinksFunction = () => [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
    {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Gantari:wght@400;500;700&display=swap",
    },
];

function ThemeWrapper({ children }: { children: React.ReactNode }) {
    const { mode } = useTheme();

    useLayoutEffect(() => {
        if (mode === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [mode]);

    return <>{children}</>;
}

function AppContent() {
    const location = useLocation();
    const navigate = useNavigate();
    const { isAuthenticated, token, setUser, isAdmin, user } = useAuth();
    const publicRoutes = ["/login", "/register"];
    const isPublicRoute = publicRoutes.includes(location.pathname);
    const isAdminRoute = location.pathname.startsWith("/admin");
    const isUserRoute = location.pathname.startsWith("/user");

    //Replace -> para se o usuário clicar em voltar no nav ele volta em nada
    useEffect(() => {
    if (!isAuthenticated && !isPublicRoute) {
        navigate("/login", { replace: true });
        return;
    }

    if (isAuthenticated && isAdminRoute && !isAdmin) {
        navigate("/", { replace: true });
        return;
    }

    if (isAuthenticated) {
        if (isAdmin && !isAdminRoute) {
        navigate("/admin/home", { replace: true });
        } else if (!isAdmin && !isUserRoute) {
        navigate("/user/home", { replace: true });
        }
    }
    }, [
    isAuthenticated,
    isPublicRoute,
    isAdmin,
    isAdminRoute,
    isUserRoute,
    navigate,
    location.pathname,
    user
    ]);

    async function getUser()
    {
        try {

            const res = await api.get( "users/me" );
            const json = res.data;
            setUser( json );
        } catch( err : any ) {
            console.log( err );
        }
    }

    useEffect( () => {
        if( token ) {
            getUser();
        }
    }, [token])
    
    return (
        <>
            {isAuthenticated && <Header />}
            <div className="flex flex-1 overflow-hidden">
                {isAuthenticated && <Sidebar />}
                <main className="flex-1 overflow-auto bg-[var(--color-bg)]">
                    <Outlet />
                </main>
            </div>
        </>
    );
}

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <Meta />
                <Links />
            </head>
            <body className="flex flex-col h-screen relative">
                {children}
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}

export default function App() {
    return (
        <Provider store={store}>
            <ThemeWrapper>
                <AppContent />
            </ThemeWrapper>
        </Provider>
    );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
    let message = "Oops!";
    let details = "An unexpected error occurred.";
    let stack: string | undefined;

    if (isRouteErrorResponse(error)) {
        message = error.status === 404 ? "404" : "Error";
        details =
            error.status === 404
                ? "The requested page could not be found."
                : error.statusText || details;
    } else if (import.meta.env.DEV && error && error instanceof Error) {
        details = error.message;
        stack = error.stack;
    }

    return (
        <main className="pt-16 p-4 container mx-auto">
            <h1>{message}</h1>
            <p>{details}</p>
            {stack && (
                <pre className="w-full p-4 overflow-x-auto">
                    <code>{stack}</code>
                </pre>
            )}
        </main>
    );
}