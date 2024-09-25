const UploadFile = () => {
  return (
    <label className="btn-upload">
      <img src="/images/add.png" alt="file-upload-button"/>
      <div>클릭해서 사진 업로드</div>
      <input type="file" name="file" id="file" />
    </label>
  )
}
export default UploadFile