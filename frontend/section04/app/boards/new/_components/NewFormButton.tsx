import { IButtonProps } from "../../_models/new-props";

const Button = (props: IButtonProps) => {
  return props.value === "cancel" ? (
    <button className="normal-button">{props.value}</button>
  ) : (
    <button className="edit-button" disabled={props.disabled}>
      {props.value}
    </button>
  );
};

export default Button;
