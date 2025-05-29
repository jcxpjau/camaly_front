import type { InputStatus } from "./inputTypes";

interface InputNotifyProps {
  message: string;
  status?: InputStatus;
  typeLogin?: boolean;
}

export function InputNotify({ message, status, typeLogin }: InputNotifyProps) {
  const textColors = {
    error: "var(--color-text-error)",
    success: "var(--color-text-success)",
    warning: "var(--color-text-warning)",
    info: "var(--color-text-info)",
    undefined: typeLogin ? "var(--color-text-default)" : "var(--color-text-default)",
  };

  //Se tem status e ele for diferente de indefinido usa a cor do status se não pega a indefinida
  const color = status && status !== undefined ? textColors[status] : textColors.undefined;

  return (
    <span className="text-sm" style={{ color }}>
      {message}
    </span>
  );
}
