const 이미지업로든버튼 = () => {
  return (
    <>
      <button class="사진업로드상자">
        <img src="./images/icons/add.svg" width="40" height="40" />
        <span>클릭해서 사진 업로드</span>
        <input hidden type="file" accept="image/*" onchange="" />
        <img id="사진미리보기" src="#" alt="미리보기" hidden />
      </button>
    </>
  );
};
