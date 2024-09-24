const Button = (props) => {
  return props.reg ? (
    <button className="normal-button" onClick={props.onClick}>
      {props.value}
    </button>
  ) : (
    <button className="edit-button">{props.value}</button>
  );
};

export default Button;
