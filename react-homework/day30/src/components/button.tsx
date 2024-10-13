import { IButton } from "./types";

const Button: React.FC<IButton> = ({
  children,
  onClick,
  variant = "active",
  disabled = false,
}) => {
  const getClassName = () => {
    switch (variant) {
      case "white":
        return "btn_white";
      case "active":
        return "btn_basic";
      case "blue":
        return "btn_blue";
      case "disabled":
        return "btn_basic_disabled";
      default:
        return "btn_basic";
    }
  };

  return (
    <button className={getClassName()} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
