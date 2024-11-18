export const checkValidationImage = (file: File) => {
  if (file.size > 5 * 1024 * 1024) {
    alert("파일 용량이 너무 큽니다.(제한: 5MB)");
    return false;
  }

  if (
    !file.type.includes("jpeg") &&
    !file.type.includes("png") &&
    !file.type.includes("svg")
  ) {
    alert("jpeg 또는 png 파일만 업로드 가능합니다.");
    return false;
  }
  return true;
};

export const checkWithSpace = (input: string) => {
  const hasSpace = /\s/.test(input);
  const isOnlySpace = input.trim().length === 0;

  if (hasSpace) return true;
  if (isOnlySpace) return true;
  return false;
};
