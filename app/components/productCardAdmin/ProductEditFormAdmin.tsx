import { useEffect, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "~/components/ui/select";
import { Input } from "../input/input";
import { Trash2 } from "lucide-react";

interface EditProductFormProps {
  initialProduct: Product;
  onChange: (updatedProduct: Product) => void;
}

export interface Product {
  _id: string;
  workflowId: string;
  name: string;
  description: string;
  category: string;
  price: number;
  active: boolean;
  providerConnection: string;
  imageUrl: string;
  inputsSchema?: Record<string, any>[];
}

export function EditProductForm({ initialProduct, onChange }: EditProductFormProps) {
  //Setando os valores do produto no formulário
  const [formState, setFormState] = useState<Product>({
    ...initialProduct,
    inputsSchema: initialProduct.inputsSchema ?? [],//Se não existir inputsSchema irá usar um array vazio
  });

  //InputsSchema simplificado (um array de strings), facilita a manipulação/exibição no front
  const [inputsData, setInputsData] = useState<string[]>([]);

  //Carrega valores iniciais
  useEffect(() => {
    setFormState({
      ...initialProduct,
      inputsSchema: initialProduct.inputsSchema ?? [],
    });
    const parsed: string[] =
      initialProduct.inputsSchema?.map((obj) => {
        const key = Object.keys(obj)[0];
        return key;
      }) ?? [];

    setInputsData(parsed);
  }, [initialProduct]);

  //Atualiza inputsSchema com base no inputsData
  useEffect(() => {
    const inputsSchemaArray = inputsData.map((key) => ({
      [key]: key,
    }));

    setFormState((prev) => ({
      ...prev,
      inputsSchema: inputsSchemaArray,
    }));
  }, [inputsData]);

  //Notifica o modal sempre que formState mudar
  useEffect(() => {
    onChange(formState);
  }, [formState]);

  return (
    <div
      className="w-full max-w-2xl p-6 rounded-lg shadow-lg"
      style={{ backgroundColor: "var(--select-bg)", color: "var(--color-card-text)" }}
    >
      <h2 className="text-xl font-bold mb-4">Editar Produto</h2>
      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input.Root label="Nome *">
            <Input.Content
              placeholder="Digite o nome do produto"
              type="text"
              value={formState.name}
              onChange={(v) =>
                setFormState((prev) => ({ ...prev, name: v }))
              }
            />
          </Input.Root>
          <Input.Root label="Categoria *">
            <Input.Content
              placeholder="Digite a categoria do produto"
              type="text"
              value={formState.category}
              onChange={(v) =>
                setFormState((prev) => ({ ...prev, category: v }))
              }
            />
          </Input.Root>
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="description" style={{ color: "var(--color-label-text)" }}>
            Descrição *
          </label>
          <textarea
            id="description"
            placeholder="Descreva o que este workflow faz..."
            className="p-2 border rounded min-h-[100px] bg-[var(--color-bg-input)]"
            style={{ borderColor: "var(--color-border-input)" }}
            value={formState.description}
            onChange={(e) =>
              setFormState((prev) => ({ ...prev, description: e.target.value }))
            }
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input.Root label="Preço (R$) *">
            <Input.Content
              placeholder="0.00"
              type="number"
              value={formState.price.toString()}
              onChange={(v) =>
                setFormState((prev) => ({
                  ...prev,
                  price: parseFloat(v) || 0,
                }))
              }
            />
          </Input.Root>
          <Input.Root label="Provedor *">
            <Input.Content
              placeholder="Provedor"
              type="text"
              value={formState.providerConnection}
              onChange={(v) =>
                setFormState((prev) => ({ ...prev, providerConnection: v }))
              }
            />
          </Input.Root>
          <div className="flex flex-col space-y-1">
            <label htmlFor="status" style={{ color: "var(--color-label-text)" }}>
              Status *
            </label>
            <Select
              value={formState.active ? "active" : "inactive"}
              onValueChange={(v) =>
                setFormState((prev) => ({
                  ...prev,
                  active: v === "active",
                }))
              }
            >
              <SelectTrigger className="px-4 w-full rounded-[var(--radius)] text-[var(--color-text-default)] border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[var(--select-bg)] text-[var(--color-card-text)] rounded-[var(--radius)] shadow-md border-transparent">
                <SelectItem value="active">Ativo</SelectItem>
                <SelectItem value="inactive">Inativo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex flex-col space-y-1">
          <Input.Root label="Imagem *">
            <Input.Content
              placeholder="Url da Imagem"
              type="text"
              value={formState.imageUrl}
              onChange={(v) =>
                setFormState((prev) => ({ ...prev, imageUrl: v }))
              }
            />
          </Input.Root>
        </div>
        {inputsData.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {inputsData.map((val, index) => (
              <div key={index} className="flex items-end gap-2">
                <div className="flex-1">
                  <Input.Root label={`Campo ${index + 1}`}>
                    <Input.Content
                      placeholder="Digite chave do input"
                      type="text"
                      value={val}
                      onChange={(newVal) =>
                        setInputsData((prev) =>
                          prev.map((v, i) => (i === index ? newVal : v))
                        )
                      }
                    />
                  </Input.Root>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setInputsData((prev) => prev.filter((_, i) => i !== index))
                  }
                  className="p-2 rounded-md hover:bg-red-100 transition"
                  title="Remover campo"
                >
                  <Trash2 className="w-5 h-5 text-red-600" />
                </button>
              </div>
            ))}
          </div>
        )}
        <div>
          <button
            type="button"
            onClick={() => setInputsData((prev) => [...prev, ""])}
            className="px-3 py-2 rounded text-sm font-medium transition-colors"
            style={{
              backgroundColor: "var(--color-button-bg)",
              color: "var(--color-text)",
              border: "1px solid var(--color-border)",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "var(--color-button-hover)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "var(--color-button-bg)";
            }}
          >
            + Adicionar novo campo
          </button>
        </div>
      </form>
    </div>
  );
}
