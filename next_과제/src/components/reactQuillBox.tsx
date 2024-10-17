"use client";
import ReactQuill, { Quill } from "react-quill-new";
import QuillResizeImage from "quill-resize-image";
import { forwardRef } from "react";
import "react-quill-new/dist/quill.snow.css";

Quill.register("modules/resize", QuillResizeImage);

type ReactQuillBoxProps = {
  id?: string;
  title?: React.ReactNode;
  name?: string;
  onChange?: (value: string) => void;
  readonly?: boolean;
  placeholder?: string;
  errormessage?: string;
  defaultValue?: string;
};

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
  resize: {
    locale: {},
  },
};

const ReactQuillBox = forwardRef<ReactQuill, ReactQuillBoxProps>(
  (props, ref) => {
    const { id, title, onChange, readonly, errormessage, ...rest } = props;

    const handleChange = (
      value: string, // html string
      d: any, // delta
      s: any, // source
      editor: ReactQuill.UnprivilegedEditor // editor - quill instance
    ) => {
      // console.log(value);
      // console.log(d);
      // console.log(s);
      // console.log(editor.getText());
      if (onChange) {
        const getHTML = editor.getHTML();
        onChange(getHTML);
      }
    };

    return (
      <>
        {title}
        <ReactQuill
          ref={ref}
          id={id}
          theme="snow"
          modules={modules}
          onChange={handleChange}
          readOnly={readonly}
          placeholder={props.placeholder}
          // defaultValue={props.defaultValue}
          {...rest}
        />
        {errormessage && <p className="toolTip">{errormessage}</p>}
      </>
    );
  }
);

ReactQuillBox.displayName = "ReactQuillBox";

export default ReactQuillBox;
