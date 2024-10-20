import styles from "./styles.module.css";
import { IFieldWrapperProps } from "./types";

const FieldWrapper: React.FC<IFieldWrapperProps> = ({
  children,
  label,
  isRequired = false,
}) => {
  return (
    <div className={styles.input_group}>
      <div className={styles.input_label}>
        {label}
        {isRequired && <span className={styles.require}> *</span>}
      </div>
      {children}
    </div>
  );
};

export default FieldWrapper;
