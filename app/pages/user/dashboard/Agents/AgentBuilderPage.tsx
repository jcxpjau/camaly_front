import React, { useEffect, useState } from 'react';
import FlowSelector from '../../../../components/agentBuilder/FlowSelector';
import FlowCard from '../../../../components/agentBuilder/FlowCard';
import { Bot, Plus, Sparkles } from 'lucide-react';
import { Input } from '~/components/input/input';
import api from '~/services/api';

//Modelo do Flow que vem da API
export type Flow = {
  _id: string;
  workflowId: string;
  name: string;
  description: string;
  category: string;
  inputsSchema: string[];
};

//Fluxo selecionado pelo usuário
//Irá conter o Fluxo em si, dados da configuração (informações necessárias para configurar o fluxo) e true ou falso para saber se ta configurado
export type SelectedFlow = {
  flow: Flow;
  data: Record<string, any>;
  isConfigured: boolean;
};

export function AgentBuilder() {
  //Lista dos fluxos que o usuário selecionou para configurar
  const [selectedFlows, setSelectedFlows] = useState<SelectedFlow[]>([]);

  //Fluxos disponiveis para selecionar (API)
  const [availableFlows, setAvailableFlows] = useState<Flow[]>([]);

  const [agentName, setAgentName] = useState('');
  
  //Função para adicionar fluxo na lista de fluxos selecionados
  function addFlow(flowId: string){
    const flow = availableFlows.find(f => f._id === flowId);
    if (flow) {
      setSelectedFlows(prev => [
        ...prev,
        { flow, data: {}, isConfigured: false }//Irá adicionar como configurado falso inicialmente
      ]);
    }
  };

  //Função para atualizar dados/configuração de um fluxo selecionado
  //Verifica se todos os dados foram preenchidos
  function updateFlowData(index: number, data: Record<string, any>){
    setSelectedFlows(prev => {
      const newFlows = [...prev];//Cria uma cópia do array atual de fluxos selecionados
      //Verificando se todos os valores foram preenhcidos corretamente
      const flow = newFlows[index].flow;
      const isConfigured = flow.inputsSchema.every(key => data[key] !== '' && data[key] !== undefined && data[key] !== null);
      newFlows[index] = { ...newFlows[index], data, isConfigured };
      return newFlows;
    });
  };

  //Função para remover fluxo selecionado
  function removeFlow(index: number){
    setSelectedFlows(prev => prev.filter((_, i) => i !== index));
  };

  //Lógica para add novo workflow
  //Só poderá adicionar se a lista de fluxos for igual a 0 ou o ultimo add ja estiver configurado
  const canAddMoreFlows = selectedFlows.length === 0 || selectedFlows[selectedFlows.length - 1].isConfigured;

  //Função para Salvar agente no banco (A FAZER)
  const handleSaveAgent = () => {
    if (!agentName.trim() || selectedFlows.some(sf => !sf.isConfigured)) return;
    console.log('Salvando agente:', { name: agentName, flows: selectedFlows });
    alert('Agente salvo com sucesso!');
  };

  useEffect(() => {
    const getWorkflows = async () => {
      try {
        const { data } = await api.get("workflows");
        setAvailableFlows(data)
      } 
      catch (error) {
        
      }
    }
      getWorkflows();
  }, [])

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] px-6 py-10 mb-10">
        <main className="max-w-4xl mx-auto">
            <header className="mb-10 text-center justify-center">
                <h1
                    className={`
                    text-5xl font-bold text-transparent bg-clip-text mb-2 
                    flex justify-center items-center gap-3
                    bg-gradient-to-r from-[#895AF6] to-[#895AF6]
                    `}
                >
                    <Bot className="w-10 h-10 text-[#895AF6]" />
                    Construtor de Agentes
                    <Sparkles className="w-10 h-10 text-[#895AF6]" />
                </h1>
                <p className="max-w-lg mx-auto text-[#a3afbf]">
                    Monte seu agente personalizado selecionando e configurando fluxos automatizados.
                    Combine diferentes funcionalidades para criar uma solução única.
                </p>
            </header>
        <section
        className="mb-8 border-2 border-dashed rounded-lg p-6 flex items-center gap-4 bg-[var(--color-bg-alt)]"
        style={{ borderColor: 'rgba(184, 102, 235, 0.3)' }}
        >        
        <label htmlFor="agentName" className="font-semibold text-[var(--color-text)] whitespace-nowrap">
          Nome do Agente:
        </label>
        <Input.Root>
            <Input.Content
                placeholder="Digite o nome do Agente..."
                type="text"
                value={agentName}
                onChange={setAgentName}
            />
        </Input.Root>
      </section>
      {/*Card que adiciona novos fluxos*/}
      {canAddMoreFlows && (
        <section className="mb-8 border-2 rounded-lg shadow-md p-6 bg-[var(--color-bg-alt)]"
            style={{ borderColor: 'rgba(184, 102, 235, 0.3)' }}
        >
            <h2 className="flex items-center gap-2 font-semibold mb-4 text-xl">
                <Plus className="w-7 h-7 text-[#754FD2]" />
                <span className="text-[var(--color-card-text)]">Adicionar Novo Fluxo</span>
            </h2>
          <FlowSelector onSelectFlow={addFlow} 
          selectedFlowIds={selectedFlows.map(sf => sf.flow._id)} 
          flows={availableFlows} 
          />
        </section>
      )}
      {/*Mostrando Fluxos Selecionados*/}
      <section className="space-y-8">
        {selectedFlows.map((sf, i) => (
          <FlowCard
            key={`${sf.flow._id}-${i}`}
            selectedFlow={sf}
            onUpdateData={data => updateFlowData(i, data)}
            onRemove={() => removeFlow(i)}
            isLast={i === selectedFlows.length - 1}
          />
        ))}
      </section>
      {selectedFlows.length > 0 && (
        <div className="mt-10 text-center">
          <button
            onClick={handleSaveAgent}
            disabled={!agentName.trim() || selectedFlows.some(sf => !sf.isConfigured)}
            className={`px-8 py-3 rounded-lg text-white font-semibold text-lg transition shadow-lg ${
              !agentName.trim() || selectedFlows.some(sf => !sf.isConfigured)
                ? 'bg-blue-300 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
            }`}
          >
            Salvar Agente
          </button>
          <p className="text-sm text-[var(--color-muted)] mt-2">
            Configure todos os fluxos para habilitar o salvamento
          </p>
        </div>
      )}
    </main>
    </div>
  );
}
