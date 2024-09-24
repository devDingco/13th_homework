import { forwardRef } from "react";

type TextAreaProps = {
  id?: string;
  title?: string;
  errormessage?: string;
  required?: boolean;
  placeholder?: string;
};

type textAreaRef = HTMLTextAreaElement;

const TextArea = forwardRef<textAreaRef, TextAreaProps>((props, ref) => {
  const { title, errormessage, ...rest } = props;
  console.log();
  return (
    <label className="flex flex-col gap-2" htmlFor={props.id}>
      <div>
        {title}
        {props.required && <span className="text-red-500">*</span>}
      </div>
      <textarea
        ref={ref}
        className="border border-gray-300 rounded-lg w-full py-3 px-4 h-80"
        {...rest}
      ></textarea>
      {errormessage && <p className="toolTip">{errormessage}</p>}
    </label>
  );
});

export default TextArea;
