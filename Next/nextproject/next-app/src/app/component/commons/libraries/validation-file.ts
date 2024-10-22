export const validation = (file?: File) => {
  if (!file) {
    // 파일이 없으면 (typeof file === "undefined")
    alert("파일이 없음");
    return false;
  }

  if (file.size > 5 * 1024 * 1024) {
    alert("용량이 너무 큽니다.");
    return false;
    // 함수 종료, 아래 실행 X
  }

  if (file.type.includes("jpeg") && !file.type.includes("png")) {
    alert("업로드 파일 형식이 아닙니다.");
    return false;
  }

  return true;
};
