import React from "react";
import { CreditCard, CheckCircle } from "lucide-react";

export function PlansSettings() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      features: ["Basic support", "1 project"],
      active: false,
    },
    {
      name: "Pro",
      price: "$15/mo",
      features: ["Priority support", "10 projects", "API access"],
      active: true,
    },
    {
      name: "Enterprise",
      price: "Contact us",
      features: [
        "Dedicated support",
        "Unlimited projects",
        "Custom integrations",
      ],
      active: false,
    },
  ];

  return (
    <section
      className="space-y-6 p-6 rounded-lg"
      style={{
        color: "var(--color-card-text)",
      }}
    >
      <header>
        <h2 className="flex items-center gap-2 text-xl font-semibold">
          <CreditCard className="h-5 w-5 text-[var(--color-icon-default)]" />
          Subscription Plans
        </h2>
        <p className="text-sm" style={{ color: "var(--color-card-subtext)" }}>
          Choose the plan that fits your needs.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="rounded-lg p-4 shadow-sm"
            style={{
              border: `1px solid ${
                plan.active
                  ? "var(--color-accent)"
                  : "var(--color-border)"
              }`,
              backgroundColor: plan.active
                ? "var(--color-accent-bg)"
                : "var(--color-bg-alt)",
            }}
          >
            <h3 className="text-lg font-semibold mb-2">{plan.name}</h3>
            <p className="text-2xl font-bold mb-4">{plan.price}</p>
            <ul className="mb-4 space-y-1 text-sm">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <CheckCircle
                    className="h-4 w-4"
                    style={{ color: "var(--color-success)" }}
                  />
                  {feature}
                </li>
              ))}
            </ul>
            {plan.active ? (
              <button
                disabled
                className="w-full rounded-md px-4 py-2 cursor-default"
                style={{
                  backgroundColor: "var(--color-accent)",
                  color: "var(--color-button-text)",
                }}
              >
                Current Plan
              </button>
            ) : (
              <button
                className="w-full rounded-md px-4 py-2"
                style={{
                  border: "1px solid var(--color-accent)",
                  color: "var(--color-accent)",
                  backgroundColor: "transparent",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "var(--color-accent-bg)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                Choose Plan
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
