import Icon from "components/iconFactory";
import { forwardRef } from "react";

type InputProps = {
  id?: string;
  title?: string;
  errormessage?: string;
  type?: string;
  accept?: string;
  required?: boolean;
  uploadcount?: number;
  placeholder?: string;
  value?: string;
};

type inputRef = HTMLInputElement;

const Input = forwardRef<inputRef, InputProps>((props, ref) => {
  let { title, errormessage, ...rest } = props;

  if (props.type === "file" && props.accept === "image/*") {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex gap-1">
          {title}
          {props.required && <span className="text-red-500">*</span>}
        </div>
        <div className={`flex gap-4 ${props.required ? "validStyle" : ""}`}>
          {props.uploadcount &&
            Array.from({ length: props.uploadcount }).map((_, index) => (
              <label key={index} className="imgUploadBox">
                <input ref={ref} className="blind imgFile" {...rest} />
                <Icon icon="add" className="fill-gray-500 w-10" />
                클릭해서 사진 업로드
              </label>
            ))}
        </div>
        {errormessage && <p className="toolTip">{errormessage}</p>}
      </div>
    );
  }

  return (
    <label className="flex flex-col gap-2 w-full" htmlFor={props.id}>
      <div className="flex gap-1">
        {title}
        {props.required && <span className="text-red-500">*</span>}
      </div>
      <input
        ref={ref}
        className="border border-gray-300 rounded-lg w-full py-3 px-4"
        {...rest}
      />
      {errormessage && <p className="toolTip">{errormessage}</p>}
    </label>
  );
});

export default Input;
