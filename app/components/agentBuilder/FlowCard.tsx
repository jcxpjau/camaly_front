import React, { useEffect, useState } from 'react';
import { Circle, CheckCircle, Settings, Trash2 } from 'lucide-react';
import { Input } from '../input/input';

export type Flow = {
  _id: string;
  workflowId: string;
  name: string;
  description: string;
  category: string;
  inputsSchema: string[];
};

export type SelectedFlow = {
  flow: Flow;
  data: Record<string, any>;
  isConfigured: boolean;
};

interface FlowCardProps {
  selectedFlow: SelectedFlow;
  onUpdateData: (data: Record<string, any>) => void;
  onRemove?: () => void;
  isLast: boolean;
}

//Funções para criar uma interface mais amigável
const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
const generateLabel = (inputId: string) => `Digite sua(seu) ${capitalizeFirstLetter(inputId)}`;
const generatePlaceholder = (inputId: string) => `Digite sua(seu) ${capitalizeFirstLetter(inputId)}`;

export default function FlowCard({ selectedFlow, onUpdateData, onRemove, isLast }: FlowCardProps){
  const { flow, data, isConfigured } = selectedFlow;//Dados do fluxo selecionado
  
  //Controle para ver se o formulário ja está preenchido
  const [localData, setLocalData] = useState<Record<string, any>>(data);

  //Veirficar se esta expandido para o usuário digitar ou nao
  const [isExpanded, setIsExpanded] = useState(true);

  //Sempre que as informações do form mudar atualizar o data também
  useEffect(() => {
    setLocalData(data);
  }, [data]);

  const handleChange = (inputId: string, value: any) => {
    const newData = { ...localData, [inputId]: value };
    setLocalData(newData);
    onUpdateData(newData);
  };

  //Assumindo que todos os campos serão obrigatóros, então é necessário preencher todos corretamente
  const isFormValid = flow.inputsSchema.every(
    (inputId) =>
      localData[inputId] !== undefined &&
      localData[inputId] !== null &&
      localData[inputId].toString().trim() !== ''
  );

  return (
    <article
      className={`border-2 rounded-xl transition-all duration-300 p-6 space-y-4 shadow-sm relative ${
        isFormValid
          ? 'border-green-500/50 bg-gradient-to-r from-[var(--color-card-bg)] to-green-500/10'
          : isLast
          ? 'border-[var(--color-accent)] bg-gradient-to-r from-[var(--color-card-bg)] to-[var(--color-accent)]/10'
          : 'border-[var(--color-border-input)] bg-[var(--color-muted-bg)]/50'
      }`}
    >
<header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-2">
  <div className="flex items-start gap-3">
    <div
      className={`p-2 rounded-lg ${
        isFormValid ? 'bg-green-500/20' : 'bg-[var(--color-accent)]/20'
      }`}
    >
      {isFormValid ? (
        <CheckCircle className="w-5 h-5 text-green-400" />
      ) : (
        <Circle className="w-5 h-5 text-[var(--color-accent)]" />
      )}
    </div>
    <div>
      <h3 className="text-lg font-semibold text-[var(--color-text)]">{flow.name}</h3>
      <p className="text-sm text-[var(--color-muted)]">{flow.description}</p>
    </div>
  </div>

  <div className="flex items-center gap-2 self-end md:self-auto">
    <span className="text-sm px-2 py-0.5 rounded-md bg-[var(--color-secondary)] text-[var(--color-secondary-text)]">
      {flow.category}
    </span>
    <button
      onClick={() => setIsExpanded(!isExpanded)}
      className="p-1 rounded hover:bg-[var(--color-accent)]/10"
    >
      <Settings className="w-4 h-4 text-[var(--color-text)]" />
    </button>
    <button
      onClick={onRemove}
      title="Remover fluxo"
      className="p-1 rounded text-red-500 hover:text-red-300 hover:bg-red-500/10 transition"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  </div>
</header>

      {isExpanded && (
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-px bg-gradient-to-r from-[var(--color-accent)]/30 to-transparent flex-1" />
            <span className="text-sm font-medium text-[var(--color-muted)] px-2">Configuração do Fluxo</span>
            <div className="h-px bg-gradient-to-l from-[var(--color-accent)]/30 to-transparent flex-1" />
          </div>
          {flow.inputsSchema.map((inputId) => {
            const value = localData[inputId] ?? '';
            return (
              <div key={inputId} className="space-y-1">
                <Input.Root label={inputId}>
                    <Input.Content
                        placeholder={generatePlaceholder(inputId)}
                        type="text"
                        value={value}
                        onChange={(value) => handleChange(inputId, value)}
                    />
                </Input.Root>                
              </div>
            );
          })}
          <div className="mt-6 p-4 bg-[var(--color-muted-bg)]/30 rounded-lg border border-[var(--color-border-input)]">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-[var(--color-text)]">Status da Configuração:</span>
              <div
                className={`flex items-center gap-2 ${
                  isFormValid ? 'text-green-400' : 'text-orange-400'
                }`}
              >
                {isFormValid ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Configurado</span>
                  </>
                ) : (
                  <>
                    <Circle className="w-4 h-4" />
                    <span className="text-sm font-medium">Pendente</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </form>
      )}
    </article>
  );
};