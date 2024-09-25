import { ChangeEvent, useState } from "react";
import "../../../styles/boards/new/BoardsNew.css";
import close from "../../../assets/icon/close.svg";
import { addressSearchButton, postCancelButton, postSubmitButton, addImageButton } from "../../../components/button";

const BoardsNew = () => {
  const [isVaild, setIsVaild] = useState(false);
  const [buttonActiveStyle, setButtonActiveStyle] = useState(false);

  // 이벤트 받아올 변수
  const [owner, setOwner] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // 경고 메시지 변수
  const [ownerVaild, setOwnerVaild] = useState("");
  const [passwordVaild, setPasswordVaild] = useState("");
  const [titleVaild, setTitleVaild] = useState("");
  const [contentVaild, setContentVaild] = useState("");

  const onChangeOwner = (event: ChangeEvent<HTMLInputElement>) => {
    setOwner(event.target.value);

    if (event.target.value && password && title && content) {
      setIsVaild(true);
      setButtonActiveStyle(true);
    } else {
      setButtonActiveStyle(false);
      setOwnerVaild("필수입력 사항입니다.");
      setIsVaild(false);
    }
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);

    if (owner && event.target.value && title && content) {
      setIsVaild(true);
      setButtonActiveStyle(true);
    } else {
      setButtonActiveStyle(false);
      setPasswordVaild("필수입력 사항입니다.");
      setIsVaild(false);
    }
  };

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);

    if (owner && password && event.target.value && content) {
      setIsVaild(true);
      setButtonActiveStyle(true);
    } else {
      setButtonActiveStyle(false);
      setTitleVaild("필수입력 사항입니다.");
      setIsVaild(false);
    }
  };

  const onChangeContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);

    if (owner && password && title && event.target.value) {
      setIsVaild(true);
      setButtonActiveStyle(true);
    } else {
      setButtonActiveStyle(false);
      setContentVaild("필수입력 사항입니다.");
      setIsVaild(false);
    }
  };

  const onClickPostVaildation = () => {
    if (isVaild && owner && password && title && content) {
      alert("게시글 등록이 가능한 상태입니다.");
    } else {
      alert("필수항목에 빈값이 존재합니다.");
    }
  };

  return (
    <div className="uploadPostPage">
      <div className="menuTitle">
        <p>게시글 등록하기</p>
        <img src={close} alt="close" />
      </div>
      <div className="postContainer">
        {/* 작성자, 비번 */}
        <div className="titleContainer">
          <div className="inputContainer">
            <div className="labelTitle">
              <p className="label">작성자</p>
              <p className="important">*</p>
            </div>
            <input
              id="postOwner"
              className="infoInput"
              type="text"
              placeholder="작성자 명을 입력해 주세요."
              onChange={onChangeOwner}
            />
            <p
              id="postOwnerVaild"
              className="postVaildation"
              style={{
                display: !owner ? "block" : "none",
                color: "var(--red, #F66A6A)",
                fontSize: "1.6rem",
                fontWeight: "500",
                lineHeight: "2.4rem",
              }}
            >
              {ownerVaild}
            </p>
          </div>
          <div className="inputContainer">
            <div className="labelTitle">
              <p className="label">비밀번호</p>
              <p className="important">*</p>
            </div>
            <input
              id="postPassword"
              className="infoInput"
              type="password"
              placeholder="비밀번호를 입력해 주세요."
              onChange={onChangePassword}
            />
            <p
              id="postPasswordVaild"
              className="postVaildation"
              style={{
                display: !password ? "block" : "none",
                color: "var(--red, #F66A6A)",
                fontSize: "1.6rem",
                fontWeight: "500",
                lineHeight: "2.4rem",
              }}
            >
              {passwordVaild}
            </p>
          </div>
        </div>
        <hr />
        {/* 제목 */}
        <div className="inputContainer">
          <div className="labelTitle">
            <p className="label">제목</p>
            <p className="important">*</p>
          </div>
          <input
            id="postTitle"
            className="infoInput"
            type="text"
            placeholder="제목을 입력해 주세요."
            onChange={onChangeTitle}
          />
          <p
            id="postTitleVaild"
            className="postVaildation"
            style={{
              display: !title ? "block" : "none",
              color: "var(--red, #F66A6A)",
              fontSize: "1.6rem",
              fontWeight: "500",
              lineHeight: "2.4rem",
            }}
          >
            {titleVaild}
          </p>
        </div>
        <hr />
        {/* 내용 */}
        <div className="inputContainer">
          <div className="labelTitle">
            <p className="label">내용</p>
            <p className="important">*</p>
          </div>
          <textarea
            id="postContent"
            className="infoInputContent"
            placeholder="내용을 입력해 주세요."
            onChange={onChangeContent}
          ></textarea>
          <p
            id="postContentVaild"
            className="postVaildation"
            style={{
              display: !content ? "block" : "none",
              color: "var(--red, #F66A6A)",
              fontSize: "1.6rem",
              fontWeight: "500",
              lineHeight: "2.4rem",
            }}
          >
            {contentVaild}
          </p>
        </div>
        {/* 주소 */}
        <div className="inputContainer addressInput">
          <p className="label">주소</p>
          <div className="addressMail">
            <input className="infoInputAddress" type="text" placeholder="01234" />
            {addressSearchButton()}
          </div>
          <input className="infoInput" type="text" placeholder="주소를 입력해 주세요." />
          <input className="infoInput" type="text" placeholder="상세주소" />
        </div>
        <hr />
        {/* 유튜브 링크 */}
        <div className="inputContainer">
          <p className="label">유튜브 링크</p>
          <input className="infoInput" type="text" placeholder="링크를 입력해 주세요." />
        </div>
        <hr />
        {/* 사진 첨부 */}
        <div className="postUploadeImg">
          <p className="label">사진 첨부</p>
          <div className="postUploadImage">
            {addImageButton()}
            {addImageButton()}
            {addImageButton()}
          </div>
        </div>
        <div className="postButtonGroup">
          {postCancelButton()}
          {postSubmitButton({ onClick: onClickPostVaildation }, buttonActiveStyle)}
        </div>
      </div>
    </div>
  );
};

export default BoardsNew;
