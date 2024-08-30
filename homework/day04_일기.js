

const 등록하기버튼 = function(){
    const checkRadi1 = document.getElementById("행복해요체크").checked
    const checkRadio2 = document.getElementById("슬퍼요체크").checked
    const checkRadio3 = document.getElementById("놀랐어요체크").checked
    const checkRadio4 = document.getElementById("화나요체크").checked
    const checkRadio5 = document.getElementById("기타체크").checked
    const inputTitle = document.getElementById("제목란").value
    const inputChag  = document.getElementById("내용란").value

    alert(`
        ${checkRadi1},
        ${checkRadio2},
        ${checkRadio3},
        ${checkRadio4},
        ${checkRadio5},
        ${inputTitle},
        ${inputChag}
        `)


        // 일기등록 : 배열에 객체로 일기 push하여 등록할 수 있게 해주세요.
        const newIconBox  = document.getElementById("iconBoxFImgID");

        let newIconBoxArr = []
        newIconBoxArr.push

        
}
