import Icon from "@/components/iconFactory";
import { ChangeEvent, forwardRef } from "react";

type InputProps = {
  id?: string;
  title?: string;
  errormessage?: string;
  type?: string;
  accept?: string;
  required?: boolean;
  uploadcount?: number;
  placeholder?: string;
  defaultValue?: string;
  readOnly?: boolean;
};

type inputRef = HTMLInputElement;

const Input = forwardRef<inputRef, InputProps>((props, ref) => {
  const { title, errormessage, ...rest } = props;

  const showImage = (e: ChangeEvent<HTMLInputElement>) => {
    // const targetLable = e.target.parentNode as HTMLLabelElement;
    const targetFile = e.target.files as FileList;
    const targetFileArray = Array.from(targetFile);
    const selectedFiles: string[] = targetFileArray.map((file) => {
      return URL.createObjectURL(file);
    });
    console.log(selectedFiles[0]);
    //targetLable.setAttribute("style", `url(${selectedFiles[0]})`);
  };

  if (props.type === "file" && props.accept === "image/*") {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex gap-1">
          {title}
          {props.required && <span className="text-red-500">*</span>}
        </div>
        <div className={`flex gap-4 ${props.required ? "validStyle" : ""}`}>
          <label className="imgUploadBox" htmlFor={props.id}>
            <input
              ref={ref}
              id={props.id}
              className="blind imgFile"
              {...rest}
              onChange={(e) => showImage(e)}
            />
            <span className="w-10 h-10">
              <Icon icon="add" className="fill-gray-500 w-10" />
            </span>
            클릭해서 사진 업로드
          </label>
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
        className={`border border-gray-300 rounded-lg w-full py-3 px-4 ${
          props.readOnly ? "bg-gray-100" : ""
        }`}
        {...rest}
      />
      {errormessage && <p className="toolTip">{errormessage}</p>}
    </label>
  );
});

Input.displayName = "Input";

export default Input;
