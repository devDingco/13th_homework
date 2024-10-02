interface Iprops {
  value: string;
  isButtonDisabled: boolean;
}
const Button = (props: Iprops) => {
  return props.value === "cancel" ? (
    <button className="normal-button">{props.value}</button>
  ) : (
    <button className="edit-button" disabled={props.isButtonDisabled}>
      {props.value}
    </button>
  );
};

export default Button;
