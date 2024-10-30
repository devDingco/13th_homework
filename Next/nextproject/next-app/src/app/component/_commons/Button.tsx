import styles from "../../routes/boards/new/style.module.css";

interface ButtonProps {
  type: string;
  value: string;
  name: string;
}

export default function Button({ type, value, name }: ButtonProps) {
  return (
    <div>
      <input
        type={type}
        name={name}
        value={value}
        className={styles[`css_${name}`]}
      />
    </div>
  );
}
