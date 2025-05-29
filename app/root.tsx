import {
    isRouteErrorResponse,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useNavigate,
} from "react-router";
import { Provider, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { store, type RootState } from "./store";
import { useEffect, useLayoutEffect } from "react";
import type { Route } from "./+types/root";
import "./app.css";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import { useTheme } from "./context/theme/theme.hooks";
import Login from "./pages/user/login/Login";
import Register from "./pages/user/login/Register";

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
  const location = useLocation();

  // Rotas que forçam modo escuro
  const forceDarkRoutes = ["/login", "/register"];

  useLayoutEffect(() => {
    const isForceDark = forceDarkRoutes.includes(location.pathname);

    if (isForceDark) {
      // Força modo escuro independente do estado
      document.documentElement.classList.add("dark");
    } else {
      // Aplica modo normal conforme o estado
      if (mode === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [mode, location.pathname]);

  return <>{children}</>;
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

    function AppContent() {
    // Pega a rota atual
    const location = useLocation();

    // Função para navegar entre as rotas
    const navigate = useNavigate();

    // Pega do estado global do Redux se o usuário está autenticado (true/false)
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    // Lista das rotas públicas, que podem ser acessadas mesmo sem login
    const publicRoutes = ["/login", "/register"];

    // Verifica se a rota atual está dentro das rotas públicas
    const isPublicRoute = publicRoutes.includes(location.pathname);

    useEffect(() => {
    // Se o usuário NÃO está autenticado E a rota atual NÃO é pública
    if (!isAuthenticated && !isPublicRoute) {
        // Redireciona para a página de login
        navigate("/login");
    }
    // O efeito roda sempre que isAuthenticated, isPublicRoute ou navigate mudarem
    }, [isAuthenticated, isPublicRoute, navigate]);


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
