import { useParams } from "react-router";
import { SettingsAgents } from "~/pages/user/dashboard/SettingsAgents/SettingsAgents";
import type { Route } from "../+types/root";


export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Camaly | Settings" },
        { name: "description", content: "Settings for Workflows!" },
    ];
}
export default function SettingsAgentsRoute() {
  const { id } = useParams();

  return <SettingsAgents id={id} />;
}