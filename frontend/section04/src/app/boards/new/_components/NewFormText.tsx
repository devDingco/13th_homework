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
};

export default function InputFormText({
  title,
  onChange,
}: IInputFormTextProps) {
  return (
    <>
      <div className="content-area">
        <InputFormTitle title={title} />
        {title !== "content" ? (
          <input
            id={title}
            className="input-text"
            type={title === "password" ? "password" : "text"}
            placeholder={placeholderObj[title]}
            onChange={(e) => onChange?.(e)}
          />
        ) : (
          <textarea
            id={title}
            className="input-textarea"
            placeholder={placeholderObj[title]}
            onChange={(e) => onChange?.(e)}
          ></textarea>
        )}
      </div>
    </>
  );
}
