export const checkVaildation = (file) => {
  if (file.size > 5 * 1024 * 1024) {
    alert("파일 용량이 큽니다. (5MB 미만)"); // => if걸리면 리턴넣어서 실행안되게함
    return false;
  }

  if (!file.type.includes("jpeg") && !file.type.includes("png")) {
    alert("jpeg 또는 png 파일만 업로드 가능합니다.");
    return false;
  }

  return true;
};
