import "../../../BoardsDetail.css";

const BoardsDetail = () => {
  const 게시글내용 = `
살겠노라 살겠노라. 청산에 살겠노라.
머루랑 다래를 먹고 청산에 살겠노라.
얄리얄리 얄랑셩 얄라리 얄라

우는구나 우는구나 새야. 자고 일어나 우는구나 새야.
너보다 시름 많은 나도 자고 일어나 우노라.
얄리얄리 얄라셩 얄라리 얄라

갈던 밭(사래) 갈던 밭 보았느냐. 물 아래(근처) 갈던 밭 보았느냐
이끼 묻은 쟁기를 가지고 물 아래 갈던 밭 보았느냐.
얄리얄리 얄라셩 얄라리 얄라

이럭저럭 하여 낮일랑 지내 왔건만
올 이도 갈 이도 없는 밤일랑 또 어찌 할 것인가.
얄리얄리 얄라셩 얄라리 얄라

어디다 던지는 돌인가 누구를 맞히려던 돌인가.
미워할 이도 사랑할 이도 없이 맞아서 우노라.
얄리얄리 얄라셩 얄라리 얄라

살겠노라 살겠노라. 바다에 살겠노라.
나문재, 굴, 조개를 먹고 바다에 살겠노라.
얄리얄리 얄라셩 얄라리 얄라

가다가 가다가 듣노라. 에정지(미상) 가다가 듣노라.
사슴(탈 쓴 광대)이 솟대에 올라서 해금을 켜는 것을 듣노라.
얄리얄리 얄라셩 얄라리 얄라

가다 보니 배불룩한 술독에 독한 술을 빚는구나.
조롱박꽃 모양 누룩이 매워 (나를) 붙잡으니 내 어찌 하리이까.[1]
얄리얄리 얄라셩 얄라리 얄라
  `;

  return (
    <div className="게시물상세화면상자">
      {/* 게시글 제목부분 */}
      <div className="게시물타이틀상자">
        <p>
          살어리 살어리랏다 쳥산(靑山)애 살어리랏다멀위랑 ᄃᆞ래랑 먹고
          쳥산(靑山)애 살어리랏다얄리얄리 얄랑셩 얄라리 얄라
        </p>
        <div className="작성자등록일자담는상자">
          <div className="작성자상자">
            <img src="/images/icons/img.svg" alt="프로필사진" />
            <span>홍길똥</span>
          </div>
          <span>24.09.23</span>
        </div>
      </div>
      <hr />
      <div>
        {/* 링크복사, 위치 아이콘 표시 */}
        <div className="아이콘상자">
          <img
            src="/images/icons/Link Icon Weight 300.svg"
            alt="링크복사아이콘"
          />
          <img
            src="/images/icons/location_on_24dp_E8EAED_FILL0_wght300_GRAD0_opsz24.svg"
            alt="위치아이콘"
          />
        </div>
        {/* 게시글 사진, 내용, 동영상, 좋아요싫어요 버튼 상자 */}
        <div className="게시글총내용상자">
          {/* 사진 */}
          <div>
            <img
              src="/images/donggle1.jpeg"
              alt="고양이사진"
              width={400}
              height={531}
            />
          </div>
          {/* 게시글 내용 */}
          <pre>{게시글내용}</pre>
          {/* 게시글 동영상 */}
          <div className="동영상배경상자">
            <div></div>
          </div>
          {/* 좋아요 싫어요 상자 */}
          <div className="좋싫상자">
            {/* 싫어요 상자 */}
            <div>
              <img src="/images/icons/bad.svg" alt="싫어요버튼" />
              <span>24</span>
            </div>
            {/* 좋아요 상자 */}
            <div className="좋아요상자">
              <img src="/images/icons/good.svg" alt="좋아요버튼" />
              <span>12</span>
            </div>
          </div>
          {/* 목록, 수정하기 버튼 상자 */}
          <div className="목록수정버튼상자">
            <button>
              <img src="/images/icons/Left icon.svg" alt="목록버튼" />
              목록으로
            </button>
            <button>
              <img src="/images/icons/Left icon (1).svg" alt="수정하기버튼" />
              수정하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardsDetail;
