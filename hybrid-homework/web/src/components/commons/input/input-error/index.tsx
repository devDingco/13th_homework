import styles from "./styles.module.css";

interface IInputError {
  errorMessage: string;
}

export default function InputError({ errorMessage }: IInputError) {
  return <div className={styles.errorMessage}>{errorMessage}</div>;
}
