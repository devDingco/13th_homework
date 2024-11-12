export default function InputFormTitle({ title }: IInputFormTextProps) {
  const titleObj = {
    author: "작성자",
    password: "비밀번호",
    title: "제목",
    content: "내용",
    addressNum: "주소",
    addressInput: "",
    addressDetail: "",
    youtube: "유튜브 링크",
    photo: "사진 첨부",
    comment: "",
  };

  const isReqired =
    title === "author" ||
    title === "password" ||
    title === "title" ||
    title === "content";

  return (
    <div className="input-form-title mb-2">
      <div className="input-form-title-text">{titleObj[title]}</div>
      {isReqired && <div className="required-star">*</div>}
    </div>
  );
}
