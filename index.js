const WritePage = () => {
  const [files, setFiles] = React.useState([]);
  const imgRef = React.useRef();

  // 이미지 업로드 시 미리보기 input의 onChange
  const saveImgFile = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    const newFilePreviews = [];

    uploadedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        newFilePreviews.push(reader.result);
        // 모든 파일을 읽은 후 상태를 업데이트
        if (newFilePreviews.length === uploadedFiles.length) {
          setFiles((prevFiles) => [...prevFiles, ...newFilePreviews]);
        }
      };
    });
  };

  // 이렇게 하면 한번 첨부할 때 같은게 여러개 됨.
  // const saveImgFile = (e) => {
  //   const file = e.target.files[0];
  //   console.log("11", file);
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);

  //   return new Promise((resolve) => {
  //     reader.onload = () => {
  //       setFile(reader.result || null);
  //       resolve;
  //     };
  //   });
  // };

  return (
    <div className="all-container">
      <div className="container">
        <div className="title">게시글 등록</div>

        <div className="writer-info">
          <div className="writer">
            <p>
              작성자<span>*</span>
            </p>
            <input placeholder="작성자 명을 입력해 주세요."></input>
          </div>
          <div className="writer">
            <p>
              비밀번호<span>*</span>
            </p>
            <input placeholder="비밀번호를 입력해 주세요."></input>
          </div>
        </div>
        <div className="title-area">
          <p>
            제목<span>*</span>
          </p>
          <input placeholder="제목을 입력해 주세요."></input>
        </div>
        <div className="content-area">
          <p>
            내용<span>*</span>
          </p>
          <textarea placeholder="내용을 입력해 주세요."></textarea>
        </div>
        <div className="address-area">
          <p>주소</p>
          <div className="post-num">
            <input placeholder="01234" />
            <button>우편번호 검색</button>
          </div>
          <div className="address">
            <input placeholder="주소를 입력해 주세요." />
          </div>
          <div className="address">
            <input placeholder="상세주소" />
          </div>
        </div>
        <div className="youtube-area">
          <p>유튜브 링크</p>
          <input placeholder="링크를 입력해 주세요." />
        </div>
        <div className="file-area">
          <p>사진 첨부</p>
          <div className="add-file-area">
            {files.map((file, index) => (
              <div className="file" key={index}>
                <img src={file} alt={`upload-${index}`} />
              </div>
            ))}
            <label htmlFor="input-file">
              <div className="file">
                <div className="no-image">
                  <p>+</p>
                  <p>클릭해서 사진 업로드</p>
                </div>
                <input
                  type="file"
                  id="input-file"
                  multiple
                  style={{ display: "none" }}
                  onChange={(e) => saveImgFile(e)}
                  accept="image/*"
                />
              </div>
            </label>
          </div>
        </div>
        <div className="btn-area">
          <button>취소</button>
          <button>등록하기</button>
        </div>
      </div>
    </div>
  );
};
