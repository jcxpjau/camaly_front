import type { Route } from "../+types/root";
import { AgentBuilder } from "~/pages/user/dashboard/Agents/AgentBuilderPage";
export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Camaly | Sign Up" },
        { name: "description", content: "Agent Builder" },
    ];
}

export default function AgentBuilderr() {
    return (
        <AgentBuilder />
    );
}