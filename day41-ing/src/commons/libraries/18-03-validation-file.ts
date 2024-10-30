export const checkValidationFile = (file?: File) => {
  // 함수의 매개변수는 타입추론이 안되기 때문에 타입을 명시해야한다.
  // 안하면 any타입이 자동으로
  // if (typeof file === "undefined") {
  //   alert("파일이 없습니다");
  //   return false;
  // }

  if (!(file instanceof File)) {
    alert("파일이 없습니다!");
    return false;
  }

  if (file.size > 5 * 1024 * 1024) {
    alert("파일 용량이 너무 큽니다. (제한: 5MB)");
    // return; // 여기서 리턴하면 checkValidationFile 함수를 종료함 => onChangeFile함수를 종료해야함
    return false;
  }

  if (!file.type.includes("jpeg") && !file.type.includes("png")) {
    alert("jpeg 또는 png 파일만 업로드 가능합니다.");
    return false;
  }
  return true;
};
