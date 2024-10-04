import ReactQuill, { Quill } from "react-quill-new";
import ImageResize from "quill-image-resize-module-react";
import React, { forwardRef } from "react";
import "react-quill-new/dist/quill.snow.css";

// parchment 모듈 가져오기
import * as Parchment from "parchment";

// Quill에 parchment 모듈 등록
Quill.register("parchment", Parchment);
Quill.register("modules/imageResize", ImageResize);

type ReactQuillBoxProps = {
  id?: string;
  title?: React.ReactNode;
  name?: string;
  onChange?: (value: string) => void;
  readonly?: boolean;
  placeholder?: string;
  errormessage?: string;
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
  imageResize: {
    // 옵션 설정 (필요에 따라 설정)
    modules: ["Resize", "DisplaySize", "Toolbar"],
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
          {...rest}
        />
        {errormessage && <p className="toolTip">{errormessage}</p>}
      </>
    );
  }
);

ReactQuillBox.displayName = "ReactQuillBox";

export default ReactQuillBox;
