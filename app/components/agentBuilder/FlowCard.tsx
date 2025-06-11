import React, { useEffect, useState } from 'react';
import { Circle, CheckCircle, Settings, Trash2 } from 'lucide-react';

interface InputType {
  id: string;
  label: string;
  type: string;
  required?: boolean;
  placeholder?: string;
  options?: string[];
}

interface FlowType {
  id: string;
  name: string;
  description: string;
  category: string;
  inputs: InputType[];
}

export type SelectedFlow = {
  flow: FlowType;
  data: Record<string, any>;
  isConfigured: boolean;
};

interface FlowCardProps {
  selectedFlow: SelectedFlow;
  onUpdateData: (data: Record<string, any>) => void;
  onRemove: () => void;
  isLast: boolean;
}

const FlowCard = ({ selectedFlow, onUpdateData, onRemove, isLast }: FlowCardProps) => {
  const { flow, data, isConfigured } = selectedFlow;
  const [localData, setLocalData] = useState<Record<string, any>>(data);
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    setLocalData(data);
  }, [data]);

  const handleChange = (inputId: string, value: any) => {
    const newData = { ...localData, [inputId]: value };
    setLocalData(newData);
    onUpdateData(newData);
  };

  const isFormValid = flow.inputs
    .filter(input => input.required)
    .every(input => localData[input.id] && localData[input.id].toString().trim() !== '');

  return (
    <article
      className={`border-2 rounded-xl transition-all duration-300 p-6 space-y-4 shadow-sm relative ${
        isConfigured
          ? 'border-green-500/50 bg-gradient-to-r from-[var(--color-card-bg)] to-green-500/10'
          : isLast
          ? 'border-[var(--color-accent)] bg-gradient-to-r from-[var(--color-card-bg)] to-[var(--color-accent)]/10'
          : 'border-[var(--color-border-input)] bg-[var(--color-muted-bg)]/50'
      }`}
    >
      {/* Header */}
      <header className="flex items-center justify-between pb-2">
        <div className="flex items-center gap-3">
          <div
            className={`p-2 rounded-lg ${
              isConfigured ? 'bg-green-500/20' : 'bg-[var(--color-accent)]/20'
            }`}
          >
            {isConfigured ? (
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

        <div className="flex items-center gap-2">
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
          {/* Divider */}
          <div className="flex items-center gap-2 mb-2">
            <div className="h-px bg-gradient-to-r from-[var(--color-accent)]/30 to-transparent flex-1" />
            <span className="text-sm font-medium text-[var(--color-muted)] px-2">Configuração do Fluxo</span>
            <div className="h-px bg-gradient-to-l from-[var(--color-accent)]/30 to-transparent flex-1" />
          </div>

          {/* Campos */}
          {flow.inputs.map((input) => {
            const value = localData[input.id] ?? '';
            const commonProps = {
              id: input.id,
              name: input.id,
              required: input.required,
              placeholder: input.placeholder,
              value,
              onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
                handleChange(input.id, e.target.value),
              className:
                'w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 bg-[var(--color-bg-input)] border-[var(--color-border-input)] text-[var(--color-text)] placeholder-[var(--color-placeholder-default)] focus:ring-[var(--color-accent)]',
            };

            return (
              <div key={input.id} className="space-y-1">
                <label htmlFor={input.id} className="text-sm font-medium text-[var(--color-text)] flex gap-1">
                  {input.label}
                  {input.required && <span className="text-red-500">*</span>}
                </label>
                {input.type === 'textarea' ? (
                  <textarea {...commonProps} rows={3} />
                ) : input.type === 'select' && input.options ? (
                  <select {...commonProps}>
                    <option value="" disabled>
                      {input.placeholder || 'Selecione uma opção'}
                    </option>
                    {input.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input type={input.type} {...commonProps} />
                )}
              </div>
            );
          })}

          {/* Status da Configuração */}
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

export default FlowCard;
