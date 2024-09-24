const BoardsDetail = () => {
  return (
    <>
      <div className='app-detail'>
        <div className='detail-header'>
          <h2>제목</h2>
          <div className='detail-header-info flex'>
            <div className='info-writer'>
              <img src='' className='writer-image' alt='작성자 프로필 이미지' />
              <span className='writer-name'>홍길동</span>
            </div>
            <div className='info-date'>2024.11.11</div>
          </div>
        </div>
        <section className='detail-content'>
          <div className='content-info'>
            <img src='' alt='파일 첨부됨' />
            <img src='' alt='주소 입력됨' />
          </div>
          <div className='contents'>
            <img src='' alt='게시물 이미지' className='contents-cover' />
            <p className='contents-text'>
              살겠노라 살겠노라. 청산에 살겠노라. 머루랑 다래를 먹고 청산에 살겠노라. 얄리얄리 얄랑셩 얄라리 얄라 우는구나 우는구나 새야. 자고 일어나 우는구나 새야. 너보다 시름 많은 나도 자고 일어나
              우노라. 얄리얄리 얄라셩 얄라리 얄라 갈던 밭(사래) 갈던 밭 보았느냐. 물 아래(근처) 갈던 밭 보았느냐 이끼 묻은 쟁기를 가지고 물 아래 갈던 밭 보았느냐. 얄리얄리 얄라셩 얄라리 얄라 이럭저럭
              하여 낮일랑 지내 왔건만 올 이도 갈 이도 없는 밤일랑 또 어찌 할 것인가. 얄리얄리 얄라셩 얄라리 얄라 어디다 던지는 돌인가 누구를 맞히려던 돌인가. 미워할 이도 사랑할 이도 없이 맞아서
              우노라. 얄리얄리 얄라셩 얄라리 얄라 살겠노라 살겠노라. 바다에 살겠노라. 나문재, 굴, 조개를 먹고 바다에 살겠노라. 얄리얄리 얄라셩 얄라리 얄라 가다가 가다가 듣노라. 에정지(미상) 가다가
              듣노라. 사슴(탈 쓴 광대)이 솟대에 올라서 해금을 켜는 것을 듣노라. 얄리얄리 얄라셩 얄라리 얄라 가다 보니 배불룩한 술독에 독한 술을 빚는구나. 조롱박꽃 모양 누룩이 매워 (나를) 붙잡으니 내
              어찌 하리이까.[1] 얄리얄리 얄라셩 얄라리 얄라
            </p>
            <div className='contents-video'>
              <img src='' alt='유튜브 썸네일' />
            </div>
            <div className='contents-action'>
              <div className='action-dislike'>
                <button type='button' className='button-dislike'>
                  <img src='' alt='싫어요 버튼' />
                </button>
                <span>24</span>
              </div>
              <div className='action-like'>
                <button type='button' className='button-like'>
                  <img src='' alt='좋아요 버튼' />
                </button>
                <span>12</span>
              </div>
            </div>
          </div>
        </section>
        <div className='detail-buttons'>
          <button type='button' className='border-type-button button-back'>
            <img src='' alt='목록으로 가기 버튼 아이콘' />
            <span>목록으로</span>
          </button>
          <button type='button' className='border-type-button button-back'>
            <img src='' alt='수정하기 버튼 아이콘' />
            <span>수정하기</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default BoardsDetail;
