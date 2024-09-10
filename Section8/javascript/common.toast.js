const JS_복사토스트메시지실행기능 = () => {
  window.document.getElementById("HTML_복사토스트메시지").style =
    "display: block";

  setTimeout(() => {
    window.document.getElementById("HTML_복사토스트메시지").style =
      "display: none";
  }, 1000);
};
