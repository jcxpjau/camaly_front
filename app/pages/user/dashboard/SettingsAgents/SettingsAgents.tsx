import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, User, Settings as SettingsIcon } from "lucide-react";
import { SettingsAgentsTokens } from "~/components/settingsAgents/settingsAgents";
import { InstructionsAgents } from "~/components/settingsAgents/instructionsAgents";
import { PersonalityAgents } from "~/components/settingsAgents/personalityAgents";
import { FinallyAgents } from "~/components/settingsAgents/finallyAgents";
import { ConductAgents } from "~/components/settingsAgents/conductAgents";
import { useLocation } from "react-router";

interface AgentConfigHeaderProps {
  name: string;
  id: string;
  category: string;
  avatar?: string;
  messageCount: number;
}

export function SettingsAgents(props?: Partial<AgentConfigHeaderProps>) {
  const location = useLocation();
  const [agentData, setAgentData] = useState<AgentConfigHeaderProps | null>(null);
  const [selectedTab, setSelectedTab] = useState("settings");

  useEffect(() => {
    // Prioriza props diretas, depois tenta ler da query string
    //Isso é porque o backend irá devolver para cá porém passando os dados pela URL
    if (
      props?.name &&
      props?.id &&
      props?.category &&
      props.messageCount !== undefined
    ) {
      setAgentData({
        name: props.name,
        id: props.id,
        category: props.category,
        avatar: props.avatar,
        messageCount: props.messageCount,
      });
    } else {
      // tenta extrair da URL
      const params = new URLSearchParams(location.search);
      const dataParam = params.get("data");
      if (dataParam) {
        try {
          const parsed = JSON.parse(decodeURIComponent(dataParam));
          // Validar se tem as props necessárias
          if (
            parsed.name &&
            parsed.id &&
            parsed.category &&
            parsed.messageCount !== undefined
          ) {
            setAgentData(parsed);
          } else {
            setAgentData(null);
          }
        } catch (error) {
          console.error("Erro ao parsear data da URL", error);
          setAgentData(null);
        }
      } else {
        setAgentData(null);
      }
    }
  }, [location.search, props]);

  // Se não tiver dados, pode exibir uma mensagem ou loading
  if (!agentData) {
    return <div>Carregando dados do agente...</div>;
  }

  // Map de componentes
  const componentsMap = {
    settings: (
      <SettingsAgentsTokens
        name={agentData.name}
        id={agentData.id}
        category={agentData.category}
        avatar={agentData.avatar}
        messageCount={agentData.messageCount}
      />
    ),
    instructions: <InstructionsAgents />,
    conduct: <ConductAgents />,
    personality: <PersonalityAgents />,
    finally: <FinallyAgents />,
  };

  // Map de tabs com ícones e labels fixos
  const tabs = [
    { key: "settings", icon: SettingsIcon, label: "Configurações" },
    { key: "instructions", icon: User, label: "Instruções" },
    { key: "conduct", icon: User, label: "Conduta" },
    { key: "personality", icon: Bot, label: "Personalidade" },
    { key: "finally", icon: Bot, label: "Finalização" },
  ];

  const currentIndex = tabs.findIndex((tab) => tab.key === selectedTab);

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] px-6 py-10 mb-10">
      <div className="max-w-7xl mx-auto">
        {/* Header e avatar */}
        <div className="bg-card p-6">
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 rounded-full overflow-hidden bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-white">
              {agentData.avatar ? (
                <img
                  src={agentData.avatar}
                  alt={agentData.name}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    (e.currentTarget.style.display = "none");
                    const fallback = e.currentTarget.nextSibling as HTMLElement;
                    if (fallback) fallback.style.display = "flex";
                  }}
                />
              ) : null}
              <div className="absolute inset-0 flex items-center justify-center">
                <Bot className="h-8 w-8" />
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-foreground">{agentData.name}</h1>
                <span className="bg-muted text-muted-foreground text-xs px-2 py-0.5 rounded">
                  {agentData.category}
                </span>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>ID do Agente: {agentData.id}</p>
                <p>{agentData.messageCount.toLocaleString("pt-BR")} mensagens trocadas</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Bar */}
        <div className="bg-card p-6 mb-6">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            {tabs.map(({ key, icon: Icon, label }, index) => {
              const isActive = selectedTab === key;
              const isCompleted = index < currentIndex;

              return (
                <div key={key} className="flex items-center">
                  <button
                    onClick={() => setSelectedTab(key)}
                    className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-all duration-200 hover:bg-muted/50
                      ${isActive ? "bg-primary/10 text-primary" : ""}
                      ${isCompleted ? "text-green-600" : ""}
                    `}
                  >
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200
                        ${isActive ? "border-primary bg-primary text-primary-foreground" : ""}
                        ${isCompleted ? "border-green-600 bg-green-600 text-white" : ""}
                        ${!isActive && !isCompleted ? "border-muted-foreground/30 text-muted-foreground" : ""}
                      `}
                    >
                      {isCompleted ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="h-5 w-5"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <Icon className="h-5 w-5" />
                      )}
                    </div>
                    <span
                      className={`text-xs font-medium transition-colors
                        ${isActive ? "text-primary" : ""}
                        ${isCompleted ? "text-green-600" : ""}
                        ${!isActive && !isCompleted ? "text-muted-foreground" : ""}
                      `}
                    >
                      {label}
                    </span>
                  </button>

                  {index < tabs.length - 1 && (
                    <div
                      className={`h-0.5 w-16 mx-2 transition-colors duration-200
                        ${isCompleted ? "bg-green-600" : "bg-muted-foreground/20"}
                      `}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <main className="p-6 rounded-lg shadow-sm relative min-h-[300px]">
          <AnimatePresence mode="wait">
            {Object.entries(componentsMap).map(
              ([key, Component]) =>
                key === selectedTab ? (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {Component}
                  </motion.div>
                ) : null
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
