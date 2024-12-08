import styles from "./styles.module.css";

export default function ToggleItem({ title, checked, onChange }) {
  return (
    <div className={styles.item}>
      <p className={styles.itemTitle}>{title}</p>
      <label className={styles.switch}>
        <input type="checkbox" checked={checked} onChange={onChange} />
        <span className={styles.slider}></span>
      </label>
    </div>
  );
}
