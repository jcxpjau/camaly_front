import { CreditCard, QrCode, Smartphone } from "lucide-react";
import { CreditCardForm } from "./forms/creditCardForm";
import { PixForm } from "./forms/pixForm";
import { BoletoForm } from "./forms/boletoForm";

interface PaymentTabsProps {
  selectedMethod: string;
  onChange: (method: string) => void;
}

export function PaymentTabs({ selectedMethod, onChange }: PaymentTabsProps) {
  const tabs = [
    {
      id: "credit-card",
      label: "Cartão de Crédito",
      icon: <CreditCard className="h-5 w-5 text-[var(--color-accent)]" />,
    },
    {
      id: "pix",
      label: "PIX",
      icon: <QrCode className="h-5 w-5 text-[var(--color-success)]" />,
    },
    {
      id: "boleto",
      label: "Boleto Bancário",
      icon: <Smartphone className="h-5 w-5 text-[var(--color-warning)]" />,
    },
  ];

  const renderContent = () => {
    switch (selectedMethod) {
      case "credit-card":
        return <CreditCardForm />;
      case "pix":
        return <PixForm />;
      case "boleto":
        return <BoletoForm />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="flex space-x-4 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 border rounded-md cursor-pointer
              ${
                selectedMethod === tab.id
                  ? "border-[var(--color-accent)] bg-[var(--color-card-bg)]"
                  : "border-[var(--color-border)]"
              }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="p-4 border border-[var(--color-border)] rounded-md bg-[var(--color-card-bg)]">
        {renderContent()}
      </div>
    </div>
  );
}
