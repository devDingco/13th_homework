import ReactQuill from "react-quill-new";
import React, { useRef } from "react";
import "react-quill-new/dist/quill.snow.css";
import { text } from "body-parser";

type ReactQuillBoxProps = {
  id?: string;
  title?: React.ReactNode;
  contents: { text: string; html: string };
  setcontents: (value: { text: string; html: string }) => void;
  onChange?: (event: string) => void;
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
};

const ReactQuillBox = (props: ReactQuillBoxProps) => {
  const {
    id,
    title,
    contents,
    setcontents,
    onChange,
    readonly,
    errormessage,
    ...rest
  } = props;
  const quillRef = useRef<any>(null);

  const handleChange = () => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      const editorText = editor.getText();
      setcontents({ text: editor.getText(), html: editor.root.innerHTML });
      onChange && onChange(editorText);
    }
  };

  return (
    <>
      {title}
      <ReactQuill
        ref={quillRef}
        id={id}
        theme="snow"
        value={contents.html || ""}
        modules={modules}
        onChange={() => handleChange()}
        readOnly={readonly}
        placeholder={props.placeholder}
        {...rest}
      />
      {errormessage && <p className="toolTip">{errormessage}</p>}
    </>
  );
};

export default ReactQuillBox;
