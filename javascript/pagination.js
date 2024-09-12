let 시작페이지 = 1
let 페이지당개수 = 5
let 일기목록개수 = 일기목록.length
console.log(일기목록개수)
const JS_이전페이지이동기능 = () => {
  시작페이지 = 시작페이지 - 10
  JS_페이지그리기기능()
}

const JS_다음페이지이동기능 = () => {
  시작페이지 = 시작페이지 + 10
  JS_페이지그리기기능()
}

const JS_페이지그리기기능 = () => {
  const 페이지들 = new Array(5).fill(1).map((el,index) => {
    const 페이지번호 = index + 시작페이지

    return `<button>${페이지번호}</button>`
  }).join(" ")

  document.getElementById("HTML_페이지보여주는곳").innerHTML = 페이지들
}

JS_페이지그리기기능()