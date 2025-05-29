import React from "react";
import { CreditCard } from "lucide-react";
import ButtonSettings from "./buttonSettings";

export function PlansSettings() {
  return (
    <section className="space-y-6 rounded-lg" style={{ color: "var(--color-card-text)" }}>
      <div>
        <h2 className="flex items-center gap-2 text-xl font-semibold">
          <CreditCard className="h-5 w-5 text-[var(--color-icon-default)]" />
          Subscription Plans
        </h2>
        <p className="text-sm text-[var(--color-card-subtext)]">
          Choose the plan that fits your needs.
        </p>
      </div>
      <div className="space-y-6">
        <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-lg p-6  space-y-4">
          <div className="p-4 border rounded-lg border-[var(--color-border)]">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-[var(--color-text-default)]">
                Current Plan: Pro
              </h3>
              <span className="px-2 py-0.5 rounded border border-[var(--color-success)] text-[var(--color-text-success)]">
                Active
              </span>
            </div>
            <p className="text-sm text-[var(--color-muted)] mb-4">
              $99.90/month • Next billing: 02/15/2024
            </p>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <div className="font-medium">Requests</div>
                <div className="text-[var(--color-muted)]">
                  45,230 / 100,000
                </div>
              </div>
              <div>
                <div className="font-medium">Storage</div>
                <div className="text-[var(--color-muted)]">2.1 GB / 10 GB</div>
              </div>
              <div>
                <div className="font-medium">Users</div>
                <div className="text-[var(--color-muted)]">12 / 50</div>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <ButtonSettings text="Upgrade Plan"/>
            <button className="px-4 py-2 rounded-md border border-[var(--color-border)] text-[var(--color-text-default)] hover:bg-[var(--color-button-hover)]">
              Billing History
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
