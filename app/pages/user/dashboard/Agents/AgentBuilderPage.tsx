import React, { useState } from 'react';
import FlowSelector from '../../../../components/agentBuilder/FlowSelector';
import FlowCard from '../../../../components/agentBuilder/FlowCard';
import { Bot, Plus, Sparkles } from 'lucide-react';
import { Input } from '~/components/input/input';

const mockFlows = [
  {
    id: 'flow1',
    name: 'Sintetizador de email por palavra chave',
    description: 'Gera emails a partir de palavras-chave.',
    category: 'Comunicação',
    inputs: [
      { id: 'keyword', label: 'Palavra-chave', type: 'text', required: true, placeholder: 'Ex: vendas' },
      { id: 'emailCount', label: 'Quantidade de emails', type: 'number', required: true, placeholder: 'Ex: 5' },
    ],
  },
  {
    id: 'flow2',
    name: 'Postador automático de redes sociais',
    description: 'Posta automaticamente em redes sociais.',
    category: 'Marketing',
    inputs: [
      { id: 'platform', label: 'Plataforma', type: 'select', required: true, options: ['Facebook', 'Instagram', 'LinkedIn'], placeholder: '' },
      { id: 'postText', label: 'Texto do post', type: 'textarea', required: true, placeholder: 'Digite o texto para o post' },
    ],
  },
    {
    id: 'flow3',
    name: 'Postador automático de red',
    description: 'Posta automaticamente em redes sociais.',
    category: 'Marketing',
    inputs: [
      { id: 'platform', label: 'Plataforma', type: 'select', required: true, options: ['Facebook', 'Instagram', 'LinkedIn'], placeholder: '' },
      { id: 'postText', label: 'Texto do post', type: 'textarea', required: true, placeholder: 'Digite o texto para o post' },
    ],
  },
];

//Lista dos fluxos que o usuário escolheu
export type SelectedFlow = {
  flow: typeof mockFlows[0];
  data: Record<string, any>;
  isConfigured: boolean;
};

export function AgentBuilder() {
  const [selectedFlows, setSelectedFlows] = useState<SelectedFlow[]>([]);
  const [agentName, setAgentName] = useState('');

  const addFlow = (flowId: string) => {
    const flow = mockFlows.find(f => f.id === flowId);
    if (flow) {
      setSelectedFlows(prev => [
        ...prev,
        { flow, data: {}, isConfigured: false },
      ]);
    }
  };

  const updateFlowData = (index: number, data: Record<string, any>) => {
    setSelectedFlows(prev => {
      const newFlows = [...prev];
      const isConfigured = Object.values(data).every(val => val !== '' && val !== undefined && val !== null);
      newFlows[index] = { ...newFlows[index], data, isConfigured };
      return newFlows;
    });
  };

  const removeFlow = (index: number) => {
    setSelectedFlows(prev => prev.filter((_, i) => i !== index));
  };

  const canAddMoreFlows =
    selectedFlows.length === 0 || selectedFlows[selectedFlows.length - 1].isConfigured;

  const handleSaveAgent = () => {
    if (!agentName.trim() || selectedFlows.some(sf => !sf.isConfigured)) return;
    console.log('Salvando agente:', { name: agentName, flows: selectedFlows });
    alert('Agente salvo com sucesso!');
  };

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
          <FlowSelector onSelectFlow={addFlow} selectedFlowIds={selectedFlows.map(sf => sf.flow.id)} flows={mockFlows} />
        </section>
      )}
      {/*Mostrando Fluxos Selecionados*/}
      <section className="space-y-8">
        {selectedFlows.map((sf, i) => (
          <FlowCard
            key={`${sf.flow.id}-${i}`}
            selectedFlow={sf}
            onUpdateData={data => updateFlowData(i, data)}
            onRemove={() => removeFlow(i)}
            isLast={i === selectedFlows.length - 1}
          />
        ))}
      </section>
      {/* Botão salvar */}
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
