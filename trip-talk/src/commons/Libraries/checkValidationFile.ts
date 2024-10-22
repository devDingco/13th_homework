import { ICheckValidationFile } from "../../types/components.type";
import checkValidationFileType from "./checkValidationFileType";

export default function checkValidationFile(file: ICheckValidationFile) {
  const jpeg = checkValidationFileType(file, "jpeg");
  const png = checkValidationFileType(file, "png");
  const webp = checkValidationFileType(file, "webp");

  if (!file) {
    alert("파일이 없습니다.");
    return false;
  }
  if (file.size > 5 * 1024 * 1024) {
    alert("파일 용량이 너무 큽니다.(제한: 5MB)");
    return false;
  }
  if (jpeg && png && webp) {
    alert("jpeg, png, webp 파일만 업로드 가능합니다.");
    return false;
  }
  return true;
}
