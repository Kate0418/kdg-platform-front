import "./checkbox.css";
import { useId } from "react";

export interface CheckboxProps {
  color?: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Checkbox({
  color = "var(--accent-500)",
  checked,
  onChange,
}: CheckboxProps) {
  const id = useId();
  return (
    <div className="list__item">
      <label className="label--checkbox" htmlFor={id}>
        <input
          type="checkbox"
          id={id}
          className="hidden"
          checked={checked}
          onChange={onChange}
        />
        <div
          className="checkbox before:border-2 before:border-[var(--checkbox-border-color)]"
          style={
            {
              "--checkbox-border-color": color,
            } as React.CSSProperties
          }
        />
      </label>
    </div>
  );
}
