import { EditProductForm, type Product } from "./ProductEditFormAdmin";
import { useState, useEffect } from "react";

interface EditProductModalProps {
  product: Product;
  onClose: () => void;
  onSave: (updatedProduct: Partial<Product> & { _id: string }) => void;
}

function getChangedFields(initial: Product, updated: Product): Partial<Product> {
  //Tanto produto inicial e update serão do tipo Product com todas as infos mesmo que repetidas

  //Objeto para armazenar apenas os campos que foram alterados
  const changed: Partial<Product> = {};

  for (const key in updated) {
    //Ignora o campo id
    if (key === "_id") continue;

    //Pegando valores do objeto inicial e atualizado
    const initialValue = (initial as any)[key];
    const updatedValue = (updated as any)[key];

    //Verifica se o valor é um objeto para tratar comparação profunda (Inputs schemma)
    const isObject = typeof initialValue === "object" && initialValue !== null;

    //Se for objeto, converte para string JSON para comparar conteúdo
    //Se não, compara diretamente os valores primitivos
    const areDifferent = isObject
      ? JSON.stringify(initialValue) !== JSON.stringify(updatedValue)
      : initialValue !== updatedValue;

    //Se os valores forem diferentes, adiciona essa propriedade ao objeto de mudanças
    if (areDifferent) {
      (changed as any)[key] = updatedValue;
    }
  }

  return changed;
}

export function EditProductModal({ product, onClose, onSave }: EditProductModalProps) {
  const [updatedProduct, setUpdatedProduct] = useState(product);

  useEffect(() => {
    setUpdatedProduct(product);
  }, [product]);

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center flex flex-col">
      <EditProductForm
        initialProduct={product}
        onChange={setUpdatedProduct}
      />
      <div
        className="flex justify-end space-x-3 pt-4"
      >
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded"
          style={{
            backgroundColor: "var(--color-button-bg)",
            color: "var(--color-text)",
            border: "1px solid var(--color-border)",
            transition: "all 0.2s",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "var(--color-button-hover)")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "var(--color-button-bg)")
          }
        >
          Cancelar
        </button>
        <button
          type="button"
          onClick={() => {
            //Primeiro pega somente o que foi alterado
            const diff = getChangedFields(product, updatedProduct);
            onSave({ _id: product._id, ...diff });
          }}
          className="px-4 py-2 rounded text-white"
          style={{ backgroundColor: "var(--color-accent)" }}
        >
          Salvar
        </button>
      </div>
    </div>
  );
}
