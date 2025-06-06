import type { Route } from "../+types/root";
import { useLocation } from "react-router";
import { useMemo } from "react";
import { SettingsAgents } from "~/pages/user/dashboard/SettingsAgents/SettingsAgents";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Camaly | SettingsAgents" },
    { name: "description", content: "Settings for Camaly!" },
  ];
}

export default function SettingsAgentss() {
  const location = useLocation();

  const purchase = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const data = params.get("data");
    if (!data) return null;

    try {
      return JSON.parse(decodeURIComponent(data));
    } catch (error) {
      console.error("Erro ao parsear query data:", error);
      return null;
    }
  }, [location.search]);

  if (!purchase) {
    return <p>Dados do agente não encontrados.</p>;
  }

  return (
    <SettingsAgents
      name={purchase.name}
      id={purchase._id}
      category={purchase.category}
      messageCount={purchase.messageCount ?? 0}
      avatar={purchase.avatar}
    />
  );
}
