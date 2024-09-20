const EditorPage = (props) => {
  return (
    <div className="editor-page">
      <EditorHeader title="게시물 등록" />
      <div style={{ display: "flex", justify-content:"space-between"s }}>
        <InputForm
          as="text"
          title="작성자"
          required={true}
          placeholder="작성자 명을 입력해 주세요."
        />
        <InputForm as="text" title="비밀번호" required={true} />
      </div>
      <hr />
      <InputForm as="text" title="제목" required={true} />
      <hr />

      <InputForm as="textarea" title="내용" required={true} />
      <InputForm as="text" title="주소" />
      <hr />

      <InputForm as="text" title="유튜브링크" />
      <hr />
      <InputForm as="photo" title="사진첨부" />
      <div>
        <EditButton reg={true} value="취소" />
        <EditButton value="등록하기" />
      </div>
    </div>
  );
};
