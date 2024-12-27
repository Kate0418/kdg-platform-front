import Link, { LinkProps } from "next/link";
import "./button.css";

type ButtonProps =
  | (React.ButtonHTMLAttributes<HTMLButtonElement> & {
      className?: string;
      reverse?: boolean;
      isHover?: boolean;
      value: string;
    })
  | (LinkProps & {
      className?: string;
      reverse?: boolean;
      isHover?: boolean;
      value: string;
      type: "link";
    });

export function Button({
  reverse = false,
  isHover = true,
  value,
  ...props
}: ButtonProps) {
  const buttonClass = `
    btn-53 w-fit p-2 rounded-lg border-2 border-accent-500 font-bold
    ${isHover ? "is-hover" : ""}
    ${props.className}
  `;
  const buttonStyle = {
    backgroundColor: reverse ? "var(--accent-500)" : "var(--base-500)",
    color: reverse ? "var(--base-500)" : "var(--accent-500)",
  };
  const originalStyle = {
    backgroundColor: reverse ? "var(--base-500)" : "var(--accent-500)",
    color: reverse ? "var(--accent-500)" : "var(--base-500)",
  };

  return (
    <>
      {props.type === "link" ? (
        <Link {...props} style={buttonStyle} className={buttonClass}>
          <div style={originalStyle} className="original">
            {value}
          </div>
          <div className="letters">
            {value.split("").map((char: string, index: number) => (
              <span key={index}>{char}</span>
            ))}
          </div>
        </Link>
      ) : (
        <button {...props} style={buttonStyle} className={buttonClass}>
          <div style={originalStyle} className="original">
            {value}
          </div>
          <div className="letters">
            {value.split("").map((char: string, index: number) => (
              <span key={index}>{char}</span>
            ))}
          </div>
        </button>
      )}
    </>
  );
}
