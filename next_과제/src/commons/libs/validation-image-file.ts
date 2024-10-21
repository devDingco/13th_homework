import { message } from "antd";

export const validationImageFile = (file?: File) => {
  if (!file || typeof file === "undefined" || file === null) {
    message.open({
      type: "error",
      content: "파일이 없습니다.",
    });
    return;
  }

  if (file.size > 1024 * 1024 * 5) {
    message.open({
      type: "error",
      content: "이미지 파일은 5MB 이하만 업로드 가능합니다.",
    });
    return;
  }

  if (
    !file.type.includes("png") &&
    !file.type.includes("jpeg") &&
    !file.type.includes("jpg")
  ) {
    message.open({
      type: "error",
      content: "이미지 파일은 png, jpeg, jpg 형식만 업로드 가능합니다.",
    });
    return;
  }

  return true;
};
