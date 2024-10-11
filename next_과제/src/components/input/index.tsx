// import Icon from "@/components/iconFactory";
import { ChangeEvent, forwardRef } from "react";
// import styles from "@/components/input/styles.module.scss";
import { Input as AntInput } from "antd";
import type { InputRef } from "antd";

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
  className?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  addonAfter?: string;
  addonBefore?: string;
};

const Input = forwardRef<InputRef, InputProps>((props, ref) => {
  const { title, errormessage } = props;
  // console.log(props.id, errormessage);

  // const showImage = (e: ChangeEvent<HTMLInputElement>) => {
  //   const targetLabel = e.target.parentNode as HTMLLabelElement;
  //   const targetFile = e.target.files as FileList;
  //   const selectedFiles: string[] = Array.from(targetFile).map((file) => {
  //     return URL.createObjectURL(file);
  //   });

  //   targetLabel.classList.add(styles.imgViewBox);
  //   targetLabel.style.backgroundImage = `url(${selectedFiles[0]})`;
  // };

  // if (props.type === "file" && props.accept === "image/*") {
  //   return (
  //     <div className={`flex flex-col${title ? " gap-2" : ""}`}>
  //       <div className="flex gap-1">
  //         {title}
  //         {props.required && <span className="text-red-500">*</span>}
  //       </div>
  //       <div className={`flex gap-4 ${props.required ? "validStyle" : ""}`}>
  //         <label className="imgUploadBox" htmlFor={props.id}>
  //           <AntInput ref={ref} id={props.id}{...props} />
  //           <span className="w-10 h-10">
  //             <Icon icon="add" className="fill-gray-500 w-10" />
  //           </span>
  //           클릭해서 사진 업로드
  //         </label>
  //       </div>
  //       {errormessage && <p className="toolTip">{errormessage}</p>}
  //     </div>
  //   );
  // }

  return (
    <label
      className={`flex flex-col w-full${title ? " gap-2" : ""}`}
      htmlFor={props.id}
    >
      <div className="flex gap-1">
        {title}
        {props.required && <span className="text-red-500">*</span>}
      </div>
      {/* <input
        ref={ref}
        className={`border border-gray-300 rounded-lg w-full py-3 px-4${
          props.readOnly ? " bg-gray-100" : ""
        } ${className ? " " + className : ""}`}
        {...rest}
      /> */}
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
