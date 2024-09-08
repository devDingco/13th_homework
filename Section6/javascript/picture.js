const JS_필터링기능 = (event) => {
    const 필터선택 = event.target.value;
    const 이미지 = document.querySelectorAll("HTML_이미지");
    이미지.forEach((image) => {
        switch (필터선택) {
            case "기본형" : {
                image.setAttribute("style", "aspect-ratio: 1/1;");
                break;
            }
            case "가로형" : {
                image.setAttribute("style", "aspect-ration: 4 / 3;");
                break;
            }
            case "세로형" : {
                image.setAttribute("style", "aspect-ration: 3 / 4;");
                break;
            }
          }
    })

}
