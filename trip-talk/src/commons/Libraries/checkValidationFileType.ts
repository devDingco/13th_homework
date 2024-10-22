import { ICheckValidationFile } from "../../types/components.type";

export default function checkValidationFileType(
  file: ICheckValidationFile,
  fileType: string
) {
  console.log(file.type.includes(fileType));
  return !file.type.includes(fileType);
}
