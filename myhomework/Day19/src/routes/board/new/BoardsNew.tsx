import { ChangeEvent, useState } from "react";

const BoardsNew = () => {
  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [isActive, setIsActive] = useState(false);

  const onChangeWriter = (event: ChangeEvent<HTMLInputElement>) => {
    setWriter(event.target.value);

    if (event.target.value && password && title && content)
      return setIsActive(true);
    setIsActive(false);
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);

    if (writer && event.target.value && title && content)
      return setIsActive(true);
    setIsActive(false);
  };

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);

    if (writer && password && event.target.value && content)
      return setIsActive(true);
    setIsActive(false);
  };

  const onChangeContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);

    if (writer && password && title && event.target.value)
      return setIsActive(true);
    setIsActive(false);
  };

  const registButton = () => {
    console.log(writer);
    console.log(password);
    console.log(title);
    console.log(content);
    resetFormData();
    alert("게시글 등록에 성공하였습니다.");
  };

  const writername = "작성자 명을 입력해 주세요.";
  const passwordPlaceholder = "비밀번호를 입력해 주세요.";
  const titlePlaceholder = "제목을 입력해 주세요.";
  const contentsPlaceholder = "내용을 입력해 주세요.";
  const adrNum = "01234";
  const adrType = "주소를 입력해 주세요.";
  const adrDetail = "상세주소";
  const youtube = "링크를 입력해 주세요.";

  function resetFormData() {
    // 폼 초기화
    const el = document.querySelectorAll("input, textarea");
    for (let i = 0; i < el.length; i++) {
      const element = el[i] as HTMLInputElement | HTMLTextAreaElement;
      element.value = "";
    }
  }

  const cancelButton = () => {
    resetFormData();
    alert("등록이 취소되었습니다.");
  };

  return (
    <div className="layout">
      <div className="postTitle">게시물 등록</div>
      <div className="part">
        <div className="group">
          {" "}
          <div>
            작성자<span> *</span>
          </div>
          <input
            id="writer"
            type="text"
            placeholder={writername}
            onChange={onChangeWriter}
          />
        </div>
        <div className="group">
          {" "}
          <div>
            비밀번호<span> *</span>
          </div>
          <input
            id="password"
            type="password"
            placeholder={passwordPlaceholder}
            onChange={onChangePassword}
          />
        </div>
      </div>

      <div className="part">
        <div className="group">
          {" "}
          <div>
            제목<span> *</span>
          </div>
          <input
            id="title"
            type="text"
            placeholder={titlePlaceholder}
            onChange={onChangeTitle}
          />
        </div>
      </div>

      <div className="content_part">
        <div className="group">
          {" "}
          <div>
            내용<span> *</span>
          </div>
          <textarea
            id="contents"
            rows={10}
            placeholder={contentsPlaceholder}
            onChange={onChangeContent}
          ></textarea>
        </div>
      </div>

      <div className="address">
        <div className="group">
          {" "}
          주소
          <div className="section">
            <input id="addressNum" type="text" placeholder={adrNum} />
            <button className="searchAddress" type="button">
              우편번호 검색
            </button>
          </div>
          <input id="addressType" type="text" placeholder={adrType} />
          <input id="addressDetail" type="text" placeholder={adrDetail} />
        </div>
      </div>

      <div className="upload">
        <div className="group">
          {" "}
          유튜브 링크
          <input id="youtube" type="url" placeholder={youtube} />
        </div>
      </div>

      <div className="upload">
        <div className="group">
          {" "}
          사진 첨부
          <div className="photoGroup">
            <button className="photobox">클릭해서 사진 업로드</button>
            <button className="photobox">클릭해서 사진 업로드</button>
            <button className="photobox">클릭해서 사진 업로드</button>
          </div>
        </div>
      </div>

      <div className="buttons">
        <button className="cancel" type="button" onClick={cancelButton}>
          취소
        </button>
        <button
          className="regist"
          type="button"
          onClick={registButton}
          style={{ backgroundColor: isActive === true ? "#2974E5" : "#C7C7C7" }}
        >
          등록하기
        </button>
      </div>
    </div>
  );
};

export default BoardsNew;
