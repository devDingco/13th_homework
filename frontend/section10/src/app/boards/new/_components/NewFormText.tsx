import InputFormTitle from "./NewFormTitle";
import NewFormValidationMessage from "./NewFormValidation";

const placeholderObj: IPlaceholderObj = {
  author: "작성자 명을 입력해 주세요.",
  password: "비밀번호를 입력해 주세요.",
  title: "제목을 입력해 주세요.",
  content: "내용을 입력해 주세요.",
  addressNum: "01234",
  addressInput: "주소를 입력해 주세요.",
  addressDetail: "상세주소",
  youtube: "링크를 입력해 주세요.",
  photo: "",
  comment: "댓글을 입력해 주세요.",
};

export default function InputFormText({
  title,
  onChange,
  value,
  disabled,
  readOnly,
}: IInputFormTextProps) {
  // if (title === "author") console.log("🌻", value);
  const isTextarea = title === "content" || title === "comment";

  return (
    <>
      <div
        className="content-area"
        style={{ width: title === "addressNum" ? "82px" : "100%" }}
      >
        <InputFormTitle title={title} />
        {!isTextarea ? (
          <input
            id={title}
            className="input-text"
            type={title === "password" ? "password" : "text"}
            disabled={disabled}
            readOnly={readOnly}
            value={value}
            placeholder={placeholderObj[title]}
            onChange={(e) => onChange?.(e)}
          />
        ) : (
          <textarea
            id={title}
            className={"input-textarea"}
            style={{
              height: title === "content" ? "336px" : "144px",
            }}
            value={value}
            placeholder={placeholderObj[title]}
            onChange={(e) => onChange?.(e)}
          ></textarea>
        )}
      </div>
    </>
  );
}
