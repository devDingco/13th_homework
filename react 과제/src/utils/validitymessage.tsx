const validityMessage: { [key: string]: string } = {
  badInput: "잘못된 입력입니다.",
  patternMismatch: "패턴에 맞게 입력하세요",
  rangeOverflow: "범위를 초과하였습니다",
  rangeUnderflow: "범위에 미달하였습니다",
  stepMismatch: "간격에 맞게 입력하세요",
  tooLong: "최대 글자 미만으로 입력하세요",
  tooShort: "최소 글자 미만으로 입력하세요",
  typeMismatch: "형식에 맞게 입력하세요",
  valueMissing: "이 필드를 반드시 입력하세요",
};

// validity 객체를 받아 메세지 맵에서 오류 메세지를 찾는다
export function getMessage(validity: any) {
  for (const key in validityMessage) {
    if (validity[key]) {
      return validityMessage[key];
    }
  }
}

export function showError(el: HTMLObjectElement) {
  /**
   * 커스텀 메세지: setCustomValidity()
   * https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement/setCustomValidity
   * - 오류가 있으면 문자열 전달
   * - 오류가 없으면 빈 문자열 전달
   */

  // interface ValidityState {
  //   [key: string]: boolean;
  // }
  // const validity: ValidityState = { ... };
  // console.log(el.validity[]);
  // const checkValid = Object.keys(validity).map((key) => {
  //   // validity[key]
  //   return console.log(key, validity[key]);
  // });
  // console.log(checkValid);

  // Object.keys(validityMessage).map((key) => {
  //   if(el.validity[key])
  //     return el.validity[key]
  // })

  el.classList.add("invalidStyle");
  // 기본 툴팁 메시지 수정 기능
  el.setCustomValidity(getMessage(el.validity) || "");
}

export function showErrorHandler(event: React.FormEvent) {
  event.preventDefault(); // 브라우저 기본 툴팁 제거
  const el = event.target as HTMLObjectElement;
  showError(el);
}
