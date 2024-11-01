import dynamic from "next/dynamic";
import { Props as SelectProps, StylesConfig } from "react-select";
const ReactSelect = dynamic(() => import("react-select"), { ssr: false });

export interface Props extends Omit<SelectProps, "onChange"> {
  multi?: boolean;
  onChange: ((newValue: unknown) => void) | undefined;
}

const customStyles: StylesConfig = {
  input: (provided) => ({
    ...provided,
    width: "100%", // 幅を100%に設定
  }),
  control: (provided, state) => ({
    ...provided,
    borderColor: state.isFocused ? "var(--accent-color)" : "#ccc",
    boxShadow: state.isFocused ? "0 0 0 1px var(--accent-color)" : undefined,
    "&:hover": {
      borderColor: state.isFocused ? "var(--accent-color)" : "#aaa",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    color: "var(--text-color)",
    backgroundColor: state.isFocused ? "var(--accent-color-60)" : undefined,
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 1000, // z-indexを設定
    position: "absolute",
    top: "100%",
    left: 0,
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    display: "none", // これで下矢印を非表示にします
  }),
  indicatorSeparator: () => ({
    display: "none", // 区切り線を非表示に
  }),
};

export function Select(props: Props) {
  return (
    <ReactSelect
      className={`relative ${props.className}`}
      options={props.options}
      isMulti={props.multi}
      maxMenuHeight={120}
      styles={customStyles}
      value={props.value}
      onChange={props.onChange}
    />
  );
}
