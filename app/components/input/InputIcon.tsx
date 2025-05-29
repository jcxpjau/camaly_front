import type { ElementType } from "react";
import type { InputStatus } from "./inputTypes";

interface InputFieldIconProps {
  icon: ElementType;
  status?: InputStatus;
  typeLogin?: boolean;
}

export function InputIcon({ icon: Icon, status, typeLogin }: InputFieldIconProps) {
  const colors = {
    error: "var(--color-icon-error)",
    success: "var(--color-icon-success)",
    warning: "var(--color-icon-warning)",
    info: "var(--color-icon-info)",
    undefined: typeLogin ? "#ffffff" : "var(--color-icon-default)",
  };
  
  //Se tem status e ele for diferente de indefinido usa a cor do status se não pega a indefinida
  const color = status && status !== undefined ? colors[status] : colors.undefined;

  return <Icon className="w-5 h-5" style={{ color }} />;
}
