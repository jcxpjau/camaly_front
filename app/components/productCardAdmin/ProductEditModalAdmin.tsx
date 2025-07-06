import { EditProductForm, type Product } from "./ProductEditFormAdmin";

interface EditProductModalProps {
  product: Product;
  onClose: () => void;
  onSave: (updatedProduct: Product) => void;
}

export function EditProductModal({ product, onClose, onSave }: EditProductModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center flex flex-col">
        <EditProductForm
          initialProduct={product}
          onChange={(updated) => {
            product = updated;
          }}
        />
        <div className="flex justify-end space-x-3 pt-4 border-t" style={{ borderColor: 'var(--color-divider)' }}>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded"
            style={{
              backgroundColor: 'var(--color-button-bg)',
              color: 'var(--color-text)',
              border: '1px solid var(--color-border)',
              transition: 'all 0.2s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-button-hover)')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-button-bg)')}
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={() => onSave(product)}
            className="px-4 py-2 rounded text-white"
            style={{ backgroundColor: 'var(--color-accent)' }}
          >
            Salvar
          </button>
        </div>
    </div>
  );
}
