import { forwardRef } from "react";
import { Input as AntInput } from "antd";
import type { InputRef } from "antd";
import type { InputProps } from "./types";
import { Controller } from "react-hook-form";

const Input = forwardRef<InputRef, InputProps>((props, ref) => {
  const { title, errormessage } = props;
  return (
    <label
      className={`flex flex-col w-full${title ? " gap-2" : ""}`}
      htmlFor={props.id}
    >
      <div className="flex gap-1">
        {title}
        {props.required && <span className="text-red-500">*</span>}
      </div>
      {props.type === "password" ? (
        <AntInput.Password
          ref={ref}
          id={props.id}
          size="large"
          disabled={props.readOnly}
          {...props}
        />
      ) : (
        <AntInput
          ref={ref}
          id={props.id}
          size="large"
          disabled={props.readOnly}
          {...props}
        />
      )}

      {errormessage && <p className="toolTip">{errormessage}</p>}
    </label>
  );
});

Input.displayName = "Input";

export default Input;
