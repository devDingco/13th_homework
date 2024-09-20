const RegisterPost = () => {
  return (
    <div className='app-register'>
      <form className='register-form'>
        <legend className='form-title'>게시물 등록</legend>
        <div className='flex width-50'>
          <div className='required flex col gap-8'>
            <label htmlFor='post-writer-input'>작성자</label>
            <input type='text' id='post-writer-input' placeholder='작성자 명을 입력해 주세요.' />
          </div>

          <div className='required flex col gap-8'>
            <label htmlFor='post-password-input'>비밀번호</label>
            <input type='password' id='post-password' placeholder='비밀번호를 입력해 주세요.' />
          </div>
        </div>
        <div className='border-b required flex col gap-8'>
          <label htmlFor='post-title'>제목</label>
          <input type='password' id='post-title' placeholder='제목을 입력해 주세요.' />
        </div>
        <div className='required flex col gap-8'>
          <label htmlFor='post-content'>내용</label>
          <textarea id='post-content' placeholder='내용을 입력해 주세요.' />
        </div>
        <div className='border-b flex col gap-8'>
          <label htmlFor='post-address'>주소</label>
          <div className='flex gap-8'>
            <input type='text' id='post-address' placeholder='01234' />
            <button type='button' className='button-common button-border-type'>
              우편번호 검색
            </button>
          </div>
          <input type='text' placeholder='주소를 입력해 주세요.' />
          <input type='text' placeholder='상세주소' />
        </div>
        <div className='border-b flex col gap-8'>
          <label htmlFor='post-youtube'>유튜브 링크</label>
          <input type='text' id='post-youtube' placeholder='링크를 입력해 주세요.' />
        </div>
        <div className='flex col gap-8'>
          <label>사진 첨부</label>
          <div className='flex gap-16'>
            <button type='button' className='flex col button-upload'>
              <img src='./assets/icon/icon_plus.svg' />
              <span>클릭해서 사진 업로드</span>
            </button>
            <button type='button' className='flex col button-upload'>
              <img src='./assets/icon/icon_plus.svg' />
              <span>클릭해서 사진 업로드</span>
            </button>
            <button type='button' className='flex col button-upload'>
              <img src='./assets/icon/icon_plus.svg' />
              <span>클릭해서 사진 업로드</span>
            </button>
          </div>
        </div>
        <div className='actions flex gap-16 justify-end'>
          <button type='button' className='button-common button-border-type'>
            취소
          </button>
          <button className='button-common button-fill-type'>등록하기</button>
        </div>
      </form>
    </div>
  );
};
