import { ChevronDown, Zap } from "lucide-react"
import React from "react"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select"

interface InputType {
  id: string
  label: string
  type: string
  required?: boolean
  placeholder?: string
  options?: string[]
}

interface FlowType {
  id: string
  name: string
  description: string
  category: string
  inputs: InputType[]
}

interface FlowSelectorProps {
  onSelectFlow: (flowId: string) => void
  selectedFlowIds: string[]
  flows: FlowType[]
}

const FlowSelector = ({ onSelectFlow, selectedFlowIds, flows }: FlowSelectorProps) => {
  const availableFlows = flows.filter((f) => !selectedFlowIds.includes(f.id))

  const categorizedFlows = availableFlows.reduce<Record<string, FlowType[]>>((acc, flow) => {
    if (!acc[flow.category]) acc[flow.category] = []
    acc[flow.category].push(flow)
    return acc
  }, {})

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="w-7 h-7 text-[#754FD2]" />
        <span className="font-medium text-foreground">
          Selecione um fluxo para adicionar ao seu agente:
        </span>
      </div>

      {availableFlows.length > 0 ? (
        <Select onValueChange={onSelectFlow}>
          <SelectTrigger className="w-full h-12 text-left border-2 border-[#754FD2]/30 hover:border-[#754FD2]/50 transition-colors rounded-lg bg-card text-foreground">
            <SelectValue placeholder="Escolha um fluxo disponível..." />
          </SelectTrigger>
          <SelectContent className="max-h-80 bg-card border-border text-foreground">
            {Object.entries(categorizedFlows).map(([category, flows]) => (
              <div key={category}>
                <div className="px-2 py-1 text-sm font-semibold text-[#754FD2] bg-muted sticky top-0 z-10">
                  {category}
                </div>
                {flows.map((flow) => (
                  <SelectItem key={flow.id} value={flow.id} className="py-3">
                    <div className="flex flex-col">
                      <span className="font-medium text-foreground">{flow.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {flow.description}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </div>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          <p>Todos os fluxos disponíveis já foram adicionados!</p>
        </div>
      )}
    </div>
  )
}

export default FlowSelector
