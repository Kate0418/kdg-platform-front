import { SelectItem } from "@/config";
import dynamic from "next/dynamic";
import { Props as ReactSelectProps, StylesConfig } from "react-select"; //ライブラリ
const ReactSelect = dynamic(() => import("react-select"), { ssr: false });

export interface SelectProps<IsMulti extends boolean = false>
  extends Omit<ReactSelectProps, "onChange"> {
  multi?: IsMulti;
  onChange?: (e: IsMulti extends true ? SelectItem[] : SelectItem) => void;
}

const customStyles: StylesConfig = {
  input: (provided) => ({
    ...provided,
    width: "100%",
  }),
  control: (provided) => ({
    ...provided,
    border: "none", // ボーダーを削除
    boxShadow: "none", // 通常時のボックスシャドウも削除
    "&:hover": {
      border: "none", // ホバー時のボーダーも削除
    },
  }),
  // 他のスタイル設定は同じ
  option: (provided, state) => ({
    ...provided,
    color: "var(--text-color)",
    backgroundColor: state.isFocused ? "var(--accent-color-60)" : undefined,
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 1000,
    position: "absolute",
    top: "100%",
    left: 0,
    width: "150%",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    display: "none",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
};

export function Select<IsMulti extends boolean = false>(
  props: SelectProps<IsMulti>,
) {
  const handleChange = (newValue: unknown) => {
    if (props.onChange) {
      if (props.multi) {
        (props.onChange as (e: SelectItem[]) => void)(newValue as SelectItem[]);
      } else {
        (props.onChange as (e: SelectItem) => void)(newValue as SelectItem);
      }
    }
  };

  return (
    <ReactSelect
      className={`relative ${props.className}`}
      options={props.options}
      isMulti={props.multi}
      maxMenuHeight={120}
      styles={customStyles}
      value={props.value}
      onChange={handleChange}
      placeholder={props.placeholder || "選択なし"}
    />
  );
}
