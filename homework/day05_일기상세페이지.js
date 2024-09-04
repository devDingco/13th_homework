

window.onload = () => {

    const queryString = location.search;
    const queryStringData = new URLSearchParams(queryString)
    const ListId = queryStringData.get("idV")
    console.log(ListId)

    // 쿼리스트링으로 받아온 인덱스값을 배열에서 꺼내준다
    const localdate01 =  localStorage.getItem("detailList") ?? "[]"
    const localdate02 =  JSON.parse(localdate01) 
    // const diaryOpen = localdate02[ListId] -> 인덱스값이 아니라서 오류


    

    // 로컬 스토리지 안에있는 배열요소와 id 매치하기
    localdate02.forEach(element => {
        if(element.idV === ListId){

            let 기분이미지 = "";
            // 상세페이지 작은감정이미지 맞게 뿌리기
            switch(element.기분){
                case "행복해요": {
                    기분이미지 = `<img src="./CSS&JS 마스터/행복해요 (s).png" width="32px">`
                    break;
                }
                case "슬퍼요": {
                    기분이미지 = `<img src="./CSS&JS 마스터/슬퍼요 (s).png" width="32px">`
                    break;
                }
                case "놀랐어요": {
                    기분이미지 = `<img src="./CSS&JS 마스터/슬퍼요 (s).png" width="32px">`
                    break;
                }
                case "화나요": {
                    기분이미지 = `<img src="./CSS&JS 마스터/슬퍼요 (s).png" width="32px">`
                    break;
                }
                case "기타": {
                    기분이미지 = `<img src="./CSS&JS 마스터/슬퍼요 (s).png" width="32px">`
                    break;
                }
            }

            document.getElementById("localPintBox").innerHTML =`
                <section class="titleBox">
                            <div class="titlePrint">${element.제목}</div>
                            <div class="myEmotion">
                                <div class="myEmotionPrint">
                                    ${기분이미지}
                                    <span style="color:${element.기분색}">${element.기분}</span>
                                </div>
                                <div class="writeDayPrint">${element.작성날짜} 작성</div>
                            </div>
                        </section>
                        <section class="detailBox">
                            <div>내용</div>
                            <div class="wirtePrint">${element.내용}</div>
                        </section>
                        <section class="detailBoxBtn">
                            <a href="./day05_일기수정p.html?idV=${ListId}" >
                                <button>수정</button>
                            </a>
                        </section>
                </section>
    `
        }
        
    });

    
    

}





