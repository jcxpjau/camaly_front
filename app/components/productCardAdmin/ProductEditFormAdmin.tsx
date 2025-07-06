import { useEffect, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '~/components/ui/select';
import { Input } from "../input/input";

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
  providerConnection: "google" | "meta" | "microsoft" | "other";
  inputsSchema?: Record<string, any>[];
}

export function EditProductForm({ initialProduct, onChange }: EditProductFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [providerConnection, setProviderConnection] = useState<Product["providerConnection"]>("google");
  const [active, setActive] = useState(true);
  const [image, setImage] = useState("");
  const [inputsData, setInputsData] = useState<Record<string, string>>({});

  const baseFieldStyle =
    'px-4 w-full rounded-[var(--radius)] text-[var(--color-text-default)] border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition';

  useEffect(() => {
    if (initialProduct) {
      setName(initialProduct.name);
      setDescription(initialProduct.description);
      setCategory(initialProduct.category);
      setPrice(initialProduct.price);
      setProviderConnection(initialProduct.providerConnection);
      setActive(initialProduct.active);

      const schemaData: Record<string, string> = {};
      initialProduct.inputsSchema?.forEach((inputObj) => {
        const key = Object.keys(inputObj)[0];
        schemaData[key] = inputObj[key] ?? "";
      });
      setInputsData(schemaData);
    }
  }, [initialProduct]);

  useEffect(() => {
    const inputsSchemaArray = Object.entries(inputsData).map(([key, value]) => ({ [key]: value }));
    onChange({
      ...initialProduct,
      name,
      description,
      category,
      price,
      providerConnection,
      active,
      inputsSchema: inputsSchemaArray,
    });
  }, [name, description, category, price, providerConnection, active, inputsData]);

  return (
    <div
      className="w-full max-w-2xl p-6 rounded-lg shadow-lg"
      style={{ backgroundColor: 'var(--select-bg)', color: 'var(--color-card-text)' }}
    >
      <h2 className="text-xl font-bold mb-4">Editar Produto</h2>

      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col space-y-1">
            <Input.Root label="Nome *">
              <Input.Content
                placeholder="Digite o nome do produto"
                type="text"
                value={name}
                onChange={setName}
              />
            </Input.Root>
          </div>

          <div className="flex flex-col space-y-1">
            <Input.Root label="Categoria *">
              <Input.Content
                placeholder="Digite a categoria do produto"
                type="text"
                value={category}
                onChange={setCategory}
              />
            </Input.Root>
          </div>
        </div>

        <div className="flex flex-col space-y-1">
          <label htmlFor="description" style={{ color: 'var(--color-label-text)' }}>Descrição *</label>
          <textarea
            id="description"
            placeholder="Descreva o que este workflow faz..."
            className="p-2 border rounded min-h-[100px] bg-[var(--color-bg-input)]"
            style={{ borderColor: 'var(--color-border-input)' }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col space-y-1">
            <Input.Root label="Preço (R$) *">
              <Input.Content
                placeholder="0.00"
                type="number"
                value={price.toString()}
                onChange={(v) => setPrice(parseFloat(v) || 0)}
              />
            </Input.Root>
          </div>

          <div className="flex flex-col space-y-1">
            <label htmlFor="provider" style={{ color: 'var(--color-label-text)' }}>Provedor *</label>
            <Select value={providerConnection} onValueChange={(v) => setProviderConnection(v as Product["providerConnection"])}>
              <SelectTrigger className={baseFieldStyle}>
                <SelectValue placeholder="Selecione um provedor" />
              </SelectTrigger>
              <SelectContent className="bg-[var(--select-bg)] text-[var(--color-card-text)] rounded-[var(--radius)] shadow-md border-transparent">
                <SelectItem value="google">Google</SelectItem>
                <SelectItem value="meta">Meta</SelectItem>
                <SelectItem value="microsoft">Microsoft</SelectItem>
                <SelectItem value="other">Outro</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col space-y-1">
            <label htmlFor="status" style={{ color: 'var(--color-label-text)' }}>Status *</label>
            <Select value={active ? "active" : "inactive"} onValueChange={(v) => setActive(v === "active")}>
              <SelectTrigger className={baseFieldStyle}>
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent className="bg-[var(--select-bg)] text-[var(--color-card-text)] rounded-[var(--radius)] shadow-md border-transparent">
                <SelectItem value="active">Ativo</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="inactive">Inativo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col space-y-1">
          <label htmlFor="image" style={{ color: 'var(--color-label-text)' }}>URL da Imagem *</label>
          <input
            id="image"
            placeholder="https://exemplo.com/imagem.jpg"
            className="p-2 border rounded bg-[var(--color-bg-input)]"
            style={{ borderColor: 'var(--color-border-input)' }}
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>

        {Object.keys(inputsData).length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(inputsData).map(([key, value]) => (
              <div key={key} className="flex flex-col space-y-1">
                <Input.Root label={key}>
                  <Input.Content
                    placeholder={`Digite o valor de ${key}`}
                    type="text"
                    value={value}
                    onChange={(val) =>
                      setInputsData((prev) => ({ ...prev, [key]: val }))
                    }
                  />
                </Input.Root>
              </div>
            ))}
          </div>
        )}
      </form>
    </div>
  );
}