const UploadFile = () => {
  return (
    <label for="file" className="btn-upload">
      <img src="./images/add.png" />
      <div>클릭해서 사진 업로드</div>
      <input type="file" name="file" id="file" />
    </label>
  )
}