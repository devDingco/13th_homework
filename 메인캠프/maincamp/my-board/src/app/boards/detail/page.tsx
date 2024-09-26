import styles from './styles.module.css';
const BoardsDetail = () => {
  return (
    <div id="detailContainer" className="container">
      <div className="flex flex-col w-full justify-between">
        <div id="boardTitle" className="prose-b_28_36 mb-4">
          추후 글 제목이 들어가는 공간입니다.
        </div>
        <div className="flex justify-between mb-2">
          <div className="flex items-center">
            <img className="mr-2" src="/images/profile.png" alt="profile" />
            <p id="writer" className="prose-l_14_20">
              요플레
            </p>
          </div>
          <div className="boardDate">
            <p id="date" className="prose-r_14_20">
              2024.11.11
            </p>
          </div>
        </div>
        <div
          className={`flex justify-end w-full gap-2 pt-2 border-t border-gray-200`}
        >
          <img src="/images/link.png" alt="공유" className="w-4" />
          <img src="/images/location.png" alt="위치" className="w-4" />
        </div>
      </div>

      <div className="boardContent">
        <img
          className="w-80 h-96"
          src="/images/exampleImg.png"
          alt="예시 그림"
        />
        <div id="detailContent">
          <p>추후 글이 들어올 예정</p>
        </div>
        <img
          className="w-full h-auto"
          src="/images/videoEx.png"
          alt="예시 동영상"
        />
      </div>
      <div className="flex w-full justify-center text-center gap-4">
        {/* 추후 각각의 div을 만지면 count */}
        <div className="flex flex-col">
          <img src="/images/bad.png" alt="싫어요" className="w-6 h-auto" />
          <p id="badCount" style={{ color: 'black' }} className="prose-r_14_20">
            24
          </p>
        </div>
        <div className="flex flex-col">
          <img src="/images/good.png" alt="좋아요" className="w-6 h-auto" />
          <p id="goodCount" style={{ color: 'red' }} className="prose-r_14_20">
            54
          </p>
        </div>
      </div>
      <div className="flex text-center justify-center w-full gap-4">
        <button className="flex justify-center items-center h-8 p-4 gap-1 rounded-lg border-solid border border-black text-center bg-none font-bold">
          <img className="w-4 h-auto" src="/images/list_icon.png" alt="목록" />
          목록으로
        </button>
        <button className="flex justify-center items-center h-8 p-4 gap-1 rounded-lg border-solid border border-black text-center bg-none font-bold">
          <img className="w-4 h-auto" src="/images/edit_icon.png" alt="수정" />
          수정하기
        </button>
      </div>
    </div>
  );
};
export default BoardsDetail;
