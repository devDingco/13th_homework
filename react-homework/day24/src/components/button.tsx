import { IButton } from "../commons/types/button";

const Button: React.FC<IButton> = ({
  children,
  onClick,
  variant = "active",
  disabled = false,
}) => {
  const getClassName = () => {
    switch (variant) {
      case "cancel":
        return "btn_cancel";
      case "active":
        return "btn_basic_active";
      case "blue_active":
        return "btn_blue_active";
      case "disabled":
        return "btn_basic_disabled";
      default:
        return "btn_basic_active";
    }
  };

  return (
    <button className={getClassName()} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
