import add from "../assets/icon/add.svg";

// 게시글 등록 페이지 버튼
export const addressSearchButton = () => {
  return <button className="addressSearch">우편번호 검색</button>;
};

export const postCancelButton = () => {
  return <button className="checkButton postCancelButton">취소</button>;
};

export const postSubmitButton = ({ onClick }: any, buttonActiveStyle: boolean) => {
  // backgroundColor: "var(--n-main, #2974e5)"
  // backgroundColor: "var(--gray-300, #c7c7c7)"
  console.log(onClick);
  console.log(buttonActiveStyle);

  return (
    <button
      id="postSubmitButton"
      className="checkButton postSubmitButton"
      onClick={onClick}
      style={{ backgroundColor: buttonActiveStyle ? "var(--n-main, #2974e5)" : "var(--gray-300, #c7c7c7)" }}
    >
      등록하기
    </button>
  );
};

export const addImageButton = () => {
  return (
    <button className="postUploadImageButton">
      <img src={add} alt="add" />
      <p>사진 업로드</p>
    </button>
  );
};
