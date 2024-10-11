import { Input } from "antd";
import type { InputRef } from "antd";
import { forwardRef } from "react";
import styles from "@/components/textAreaBox/styles.module.scss";
const { TextArea } = Input;

interface ITextAreaProps {
  id?: string;
  errormessage?: string;
  rows?: number;
  showCount?: boolean;
  maxLength?: number;
  placeholder?: string;
  defaultValue?: string;
}

const TextAreaBox = forwardRef<InputRef, ITextAreaProps>((props, ref) => {
  // console.log(props);

  return (
    <div id={styles.textAreaBox}>
      <TextArea id={`${props.id || ""}`} ref={ref} {...props} />
      <p className="text-red-600">{props.errormessage}</p>
    </div>
  );
});

TextAreaBox.displayName = "TextAreaBox";

export default TextAreaBox;
