const JS_필터링기능 = (event) => {
    const 필터선택 = event.target.value;
    const 이미지 = document.querySelectorAll("HTML_이미지");
    이미지.forEach((HTML_이미지) => {
        switch (필터선택) {
            // case "기본형" : {
            //     HTML_이미지.setAttribute("style", "aspect-ratio: 1/1;");
            //     break;
            // }
            case "가로형" : {
                HTML_이미지.setAttribute("style", "aspect-ration: 4 / 3;");
                break;
            }
            case "세로형" : {
                HTML_이미지.setAttribute("style", "aspect-ration: 3 / 4;");
                break;
            }

          }
    })
}

const JS_강아지사진 = () => {
    fetch("https://dog.ceo/api/breeds/image/random/10").then((받아온결과) => {
          받아온결과.json().then((객체로변한결과) => {
              console.log("결과:", 객체로변한결과)
              const 상자 = 객체로변한결과.message
              document.getElementById("HTML_이미지영역").innerHTML = 상자.map(el =>`
              <img src="${el}"  />
              `)
          })
      })
    }
