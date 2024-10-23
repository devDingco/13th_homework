import { forwardRef } from "react";
import { Input as AntInput } from "antd";
import type { InputRef } from "antd";
import type { InputProps } from "./types";
import { Controller } from "react-hook-form";
import { useInput } from "./hook";
import styles from "./styles.module.scss";
const { TextArea } = AntInput;

const Input = forwardRef<InputRef, InputProps>((props, ref) => {
  const {
    id,
    title,
    errormessage,
    control,
    defaultValue,
    readOnly,
    type,
    placeholder,
    required,
    rows,
    showCount,
    maxLength,
    addbutton,
  } = props;

  const { formResister } = useInput();

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
            rules={formResister[id]}
            defaultValue={defaultValue}
            render={({ field }) => (
              <AntInput.Password
                id={id}
                size="large"
                placeholder={placeholder}
                disabled={readOnly}
                {...field}
                ref={ref}
              />
            )}
          />
        ) : type === "textArea" ? (
          <Controller
            name={id.includes("_") ? id.split("_")[0] : id}
            control={control}
            rules={formResister[id]}
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
                  ref={ref}
                />
              </div>
            )}
          />
        ) : (
          <Controller
            name={id.includes("_") ? id.split("_")[0] : id}
            control={control}
            rules={formResister[id]}
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
                  ref={ref}
                />
                {addbutton && addbutton} {/* 추가 버튼 (중복 확인) */}
              </div>
            )}
          />
        )}

        {errormessage && <p className="toolTip">{errormessage}</p>}
      </label>
    </>
  );
});

Input.displayName = "Input";

export default Input;
