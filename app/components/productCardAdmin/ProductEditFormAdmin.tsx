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
}

export function EditProductForm({ initialProduct, onChange }: EditProductFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [providerConnection, setProviderConnection] = useState<"google" | "meta" | "microsoft" | "other">("google");
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (initialProduct) {
      setName(initialProduct.name);
      setDescription(initialProduct.description);
      setCategory(initialProduct.category);
      setPrice(initialProduct.price);
      setProviderConnection(initialProduct.providerConnection);
      setActive(initialProduct.active);
    }
  }, [initialProduct]);

  useEffect(() => {
    onChange({
      ...initialProduct,
      name,
      description,
      category,
      price,
      providerConnection,
      active,
    });
  }, [name, description, category, price, providerConnection, active]);

  return (
    <div className="space-y-4">
      <Input.Root label="Nome">
        <Input.Content
          placeholder="Digite o nome do produto"
          type="text"
          value={name}
          onChange={setName}
        />
      </Input.Root>

      <Input.Root label="Descrição">
        <Input.Content
          placeholder="Descreva o produto"
          type="text"
          value={description}
          onChange={setDescription}
        />
      </Input.Root>

      <Input.Root label="Categoria">
        <Input.Content
          placeholder="Ex: Social Media, Produtividade"
          type="text"
          value={category}
          onChange={setCategory}
        />
      </Input.Root>

      <Input.Root label="Preço (R$)">
        <Input.Content
          placeholder="0.00"
          type="number"
          value={price.toString()}
          onChange={(v) => setPrice(parseFloat(v) || 0)}
        />
      </Input.Root>

      <div className="space-y-2">
        <label className="text-sm font-medium">Provedor *</label>
        <Select value={providerConnection} onValueChange={(value) => setProviderConnection(value as Product["providerConnection"])}>
          <SelectTrigger className="bg-background border-border">
            <SelectValue placeholder="Selecione o provedor" />
          </SelectTrigger>
          <SelectContent className="bg-card border-border">
            <SelectItem value="google">Google</SelectItem>
            <SelectItem value="meta">Meta</SelectItem>
            <SelectItem value="microsoft">Microsoft</SelectItem>
            <SelectItem value="other">Outro</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Status *</label>
        <Select value={active ? "true" : "false"} onValueChange={(val) => setActive(val === "true")}>
          <SelectTrigger className="bg-background border-border">
            <SelectValue placeholder="Selecione o status" />
          </SelectTrigger>
          <SelectContent className="bg-card border-border">
            <SelectItem value="true">Ativo</SelectItem>
            <SelectItem value="false">Inativo</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
