interface ICheckValidationFile {
  size: number;
}

export default function checkValidationFile(file: ICheckValidationFile) {
  if (file.size > 5 * 1024 * 1024) {
    console.log("파일 용량이 너무 큽니다.(제한: 5MB)");
    return false;
  }
  return true;
}
