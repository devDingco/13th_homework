import { Input as AntInput } from "antd";
import type { InputProps } from "./types";
import { useInput } from "./hook";
import { Controller } from "react-hook-form";

import styles from "./styles.module.scss";
const { TextArea } = AntInput;

const Input = (props: InputProps) => {
  const {
    id,
    title,
    defaultValue,
    readOnly,
    type,
    placeholder,
    required,
    rows,
    showCount,
    maxLength,
    addbutton,
    onKeyUp,
  } = props;

  const { formRegister, formState, control } = useInput();

  return (
    <>
      <label
        className={`flex flex-col w-full${title ? " gap-2" : ""}`}
        htmlFor={id}
      >
        <div className="flex gap-1">
          {title}
          {required && <span className="text-red-500">*</span>}
        </div>
        {type === "password" ? (
          <Controller
            name={id.includes("_") ? id.split("_")[0] : id} // useform 컨트롤 용 name으로 사용
            control={control}
            rules={formRegister[id]}
            defaultValue={defaultValue}
            render={({ field }) => (
              <AntInput.Password
                id={id}
                size="large"
                placeholder={placeholder}
                disabled={readOnly}
                onKeyUp={(e) => onKeyUp && onKeyUp(e)}
                {...field}
              />
            )}
          />
        ) : type === "textArea" ? (
          <Controller
            name={id.includes("_") ? id.split("_")[0] : id}
            control={control}
            rules={formRegister[id]}
            defaultValue={defaultValue}
            render={({ field }) => (
              <div id={styles.textAreaBox}>
                <TextArea
                  id={id}
                  rows={rows}
                  size="large"
                  showCount={showCount}
                  maxLength={maxLength}
                  placeholder={placeholder}
                  {...field}
                />
              </div>
            )}
          />
        ) : (
          <Controller
            name={id.includes("_") ? id.split("_")[0] : id}
            control={control}
            rules={formRegister[id]}
            defaultValue={defaultValue}
            render={({ field }) => (
              <div className={addbutton ? "flex gap-3" : ""}>
                <AntInput
                  id={id}
                  size="large"
                  disabled={readOnly}
                  placeholder={placeholder}
                  type={type}
                  {...field}
                  count={{
                    show: formRegister[id]?.maxLength ? true : false,
                    max: formRegister[id]?.maxLength?.value || 0,
                  }}
                />
                {addbutton && addbutton} {/* 추가 버튼 (중복 확인) */}
              </div>
            )}
          />
        )}

        {formState.errors[id]?.message && (
          <p className="toolTip">{formState.errors[id]?.message.toString()}</p>
        )}
      </label>
    </>
  );
};

Input.displayName = "Input";

export default Input;
