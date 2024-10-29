import styles from "./styles.module.css";

export default function AddressInputField({ value }: { value: string }) {
  return (
    <input
      type="text"
      className={styles.input_box_zip_code}
      value={value}
      placeholder="01234"
      readOnly
    />
  );
}
