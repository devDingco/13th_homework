import { ChangeEvent } from "react";
import styles from "../../routes/boards/new/style.module.css";

interface Props {
  label?: string;
  type: string;
  id: string;
  placeholder: string;
  name: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;
  // void = 함수의 반환 타입을 정의, 아무값도 반환하지않는 함수
}

export default function Input({
  label,
  type,
  id,
  placeholder,
  name,
  value,
  onChange,
  disabled,
}: Props) {
  return (
    <div>
      <label htmlFor={name} className={`css_${name}tag`}>
        {label}
      </label>
      {/* htmlfor는 for속성을 대신해서 사용, 특정 id를 가진 입력 필드를 지목하여 연결 */}
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        className={styles[`css_${name}input`]}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
}
