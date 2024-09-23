import './App.css';

const InputField = ({
  className,
  label = '',
  type,
  required = false,
  placeholder,
}) => {
  return (
    <div className={className}>
      <label>{label}</label>
      <input type={type} required={required} placeholder={placeholder} />
    </div>
  );
};

const TextAreaField = ({ className, label, type, required, placeholder }) => {
  return (
    <div className={className}>
      <label>{label}</label>
      <textarea
        type={type}
        required={required}
        placeholder={placeholder}
      ></textarea>
    </div>
  );
};

function App() {
  return (
    <div className="post_form">
      <header>
        <h1>게시물 등록</h1>
      </header>

      <main>
        <section className="작성자_비밀번호__영역">
          <InputField
            className="작성자_비밀번호__입력영역"
            label="작성자"
            type="text"
            required={true}
            placeholder="작성자 명을 입력해 주세요."
          />
          <InputField
            className="작성자_비밀번호__입력영역"
            label="비밀번호"
            type="password"
            required={true}
            placeholder="비밀번호를 입력해 주세요."
          />
        </section>
        <hr />
        <section className="제목__영역">
          <InputField
            className="제목__입력영역"
            label="제목"
            type="text"
            required={true}
            placeholder="제목을 입력해 주세요."
          />
        </section>
        <hr />

        <section className="내용__영역">
          <TextAreaField
            className="내용__입력영역"
            label="내용"
            type="text"
            required={true}
            placeholder="비밀번호를 입력해 주세요."
          />
        </section>
        <section className="주소__영역">
          <div className="우편번호__입력영역">
            <div className="우편번호__보기">
              <span className="주소__텍스트">주소</span>
            </div>
            <div className="우편번호__영역">
              <input
                type="text"
                className="우편번호__입력"
                value="01234"
                disabled
              />
              <button className="우편번호__버튼">
                <span className="버튼__라벨">우편번호 검색</span>
              </button>
            </div>
          </div>
          <InputField
            className="주소__입력영역"
            type="text"
            placeholder="주소를 입력해 주세요."
          />
          <InputField
            className="상세주소__입력영역"
            type="text"
            placeholder="상세주소"
          />
        </section>
        <hr />
        <section className="유튜브링크__영역">
          <InputField
            className="유튜브링크__입력영역"
            label="유튜브 링크"
            type="text"
            required={true}
            placeholder="링크를 입력해 주세요."
          />
        </section>
        <hr />
        <section className="사진첨부__영역">
          <label>사진 첨부</label>
          <div className="사진__입력영역">
            {new Array(3).fill(null).map((el) => (
              <div className="사진업로드_예시본"></div>
            ))}
          </div>
        </section>
      </main>

      <footer>
        <button className="취소__버튼">취소</button>
        <button className="등록하기__버튼">등록하기</button>
      </footer>
    </div>
  );
}

export default App;
