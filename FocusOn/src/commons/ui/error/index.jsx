import { useFormContext } from "react-hook-form";
import styles from "./styles.module.css";

export default function ErrorMessage({ name }) {
  const {
    formState: { errors },
  } = useFormContext();

  return errors[name] ? (
    <div className={styles.error}>{errors[name].message}</div>
  ) : null;
}
