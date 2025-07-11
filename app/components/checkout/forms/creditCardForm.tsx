import { useState } from "react";
import { Input } from "~/components/input/input";

export function CreditCardForm() {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  return (
    <div className="space-y-4">
      <Input.Root label="Número do Cartão">
        <Input.Content
          placeholder="1234 5678 9012 3456"
          type="text"
          value={cardNumber}
          onChange={setCardNumber}
        />
      </Input.Root>

      <div className="grid grid-cols-2 gap-4">
        <Input.Root label="Validade">
          <Input.Content
            placeholder="MM/AA"
            type="text"
            value={expiry}
            onChange={setExpiry}
          />
        </Input.Root>
        <Input.Root label="CVV">
          <Input.Content
            placeholder="123"
            type="password"
            value={cvv}
            onChange={setCvv}
          />
        </Input.Root>
      </div>
    </div>
  );
}
