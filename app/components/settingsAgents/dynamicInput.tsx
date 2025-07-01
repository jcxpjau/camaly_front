import React from 'react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '~/components/ui/select';
import { Input } from '~/components/input/input';
import { useTranslation } from 'react-i18next';

type Platform = {
  id: string;
  name: string;
  icon: React.ElementType;
};

type Account = {
  id: string;
  name: string;
  followers?: string;
};

type DynamicInputProps = {
  inputKey: string;
  value: any;
  onChange: (val: any) => void;
  platforms: Platform[];
  accounts: Record<string, Account[]>;
  selectedPlatform?: string;
};

const baseFieldStyle =
  'px-4 w-full rounded-[var(--radius)] text-[var(--color-text-default)] border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition';

export function DynamicInput({
  inputKey,
  value,
  onChange,
  platforms,
  accounts,
  selectedPlatform
}: DynamicInputProps) {
    const { t } = useTranslation();
  
  if (inputKey === 'socialMedia') {
    return (
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className={baseFieldStyle}>
          <SelectValue placeholder={`${t('settingsAgents.flowSettings.placeholderSelectSocialMedia')}`} />
        </SelectTrigger>
        <SelectContent className="bg-[var(--select-bg)] text-[var(--color-card-text)] rounded-[var(--radius)] shadow-md border-transparent">
          {platforms.map((platform) => (
            <SelectItem
              key={platform.id}
              value={platform.id}
              className="py-2 px-4 hover:bg-[var(--color-button-hover)] cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2">
                <platform.icon className="w-4 h-4" />
                <span>{platform.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  if (inputKey === 'account') {
    const options = selectedPlatform ? accounts[selectedPlatform] || [] : [];

    return (
      <Select
        value={value}
        onValueChange={onChange}
        disabled={!selectedPlatform || options.length === 0}
      >
        <SelectTrigger className={baseFieldStyle}>
          <SelectValue placeholder={`${t('settingsAgents.flowSettings.placeholderSelectAccount')}`} />
        </SelectTrigger>
        <SelectContent className="bg-[var(--select-bg)] text-[var(--color-card-text)] rounded-[var(--radius)] shadow-md border-transparent">
          {options.map((account) => (
            <SelectItem
              key={account.id}
              value={account.name}
              className="py-2 px-4 hover:bg-[var(--color-button-hover)] cursor-pointer transition-colors"
            >
              <div className="flex flex-col">
                <span className="font-medium">{account.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  return (
    <Input.Content
      placeholder={`${t('settingsAgents.flowSettings.placeholderInput')} ${inputKey.charAt(0).toUpperCase() + inputKey.slice(1)}`}
      type="text"
      value={value}
      onChange={onChange}
    />
  );
}
