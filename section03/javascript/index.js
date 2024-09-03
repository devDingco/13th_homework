window.onload = () => {
    // 일기 목록에 그리기
    JS_일기그리기기능();

    // 일기 목록을 로컬 스토리지에서 불러와서 화면에 표시
    const diaryList = document.getElementById('HTML_일기리스트');
    let diaries = JSON.parse(localStorage.getItem('diaries')) || [];
    diaries.forEach(function(diary, index) {
        const newDiaryItem = document.createElement('li');
        newDiaryItem.textContent = diary;
        newDiaryItem.id = `diary-${index}`;

        // 삭제 버튼 생성
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '삭제';
        deleteButton.className = 'delete-button';
        deleteButton.addEventListener('click', function() {
            JS_일기삭제기능(index);
        });

        newDiaryItem.appendChild(deleteButton);
        diaryList.appendChild(newDiaryItem);
    });
};

document.addEventListener("DOMContentLoaded", function () {
    // 스크롤 시 필터 배경색 반전 기능
    const filterElement = document.querySelector(".CSS_필터");
    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            filterElement.style.backgroundColor = "#ddd";
        } else {
            filterElement.style.backgroundColor = "white";
        }
    });
});

// 일기 삭제 기능
function JS_일기삭제기능(index) {
    const diaryList = document.getElementById('HTML_일기리스트');
    const diaryItem = document.getElementById(`diary-${index}`);
    if (diaryItem) {
        diaryList.removeChild(diaryItem);

        // 로컬 스토리지에서 삭제된 일기 제거
        let diaries = JSON.parse(localStorage.getItem('diaries')) || [];
        diaries.splice(index, 1);
        localStorage.setItem('diaries', JSON.stringify(diaries));
    }
}

const JS_일기그리기기능 = () => {
    // 스토리지에 저장된 일기 목록 가져오기
    const 스토리지에저장된일기목록 =
        window.localStorage.getItem("민지의일기목록") ?? "[]";
    const 일기목록 = JSON.parse(스토리지에저장된일기목록);

    // 일기 목록 화면에 새롭게 전체 그리기
    const HTML_새로운일기도화지 = 일기목록
        .map(
            (el, index) => `
            <a href="./detail.html?number=${index}">
                <div class="CSS_일기" id="diary-${index}">
                <div class="CSS_삭제아이콘" onclick="JS_일기삭제기능(${index})">✖</div>
                    <div class="CSS_일기사진">
                      ${
                            el.기분 === "행복"
                                ? '<img class="CSS_기분이미지" src="./assets/images/joy.png" alt="행복" />'
                                : ""
                        }
                      ${
                            el.기분 === "슬픔"
                                ? '<img class="CSS_기분이미지" src="./assets/images/sadness.png" alt="슬픔" />'
                                : ""
                        }
                      ${
                            el.기분 === "놀람"
                                ? '<img class="CSS_기분이미지" src="./assets/images/surprised.png" alt="놀람" />'
                                : ""
                        }
                      ${
                            el.기분 === "화남"
                                ? '<img class="CSS_기분이미지" src="./assets/images/anger.png" alt="화남" />'
                                : ""
                        }
                      ${
                            el.기분 === "기타"
                                ? '<img class="CSS_기분이미지" src="./assets/images/etc.png" alt="기타" />'
                                : ""
                        }
                    </div>
                    <div class="CSS_일기내용">
                      ${el.기분 === "행복" ? `<div class="CSS_기분 CSS_행복">행복해요</div>` : ""}
                      ${el.기분 === "슬픔" ? `<div class="CSS_기분 CSS_슬픔">슬퍼요</div>` : ""}
                      ${el.기분 === "놀람" ? `<div class="CSS_기분 CSS_놀람">놀랐어요</div>` : ""}
                      ${el.기분 === "화남" ? `<div class="CSS_기분 CSS_화남">화나요</div>` : ""}
                      ${el.기분 === "기타" ? `<div class="CSS_기분 CSS_기타">기타</div>` : ""}
                      <div class="CSS_날짜">${el.작성일}</div>
                    </div>
                    <div class="CSS_일기제목"> ${el.제목}</div>
                </div>
            </a>
        `
        )
        .join("");
    window.document.getElementById("HTML_일기보여주는곳").innerHTML =
        HTML_새로운일기도화지;
};

const 일기목록 = [];

const JS_글쓰기기능 = () => {
    // 현재 날짜 가져오기
    const date = new Date();
    const options = {
        year: date.getFullYear(),
        month: (date.getMonth() + 1).toString().padStart(2, "0"),
        date: date.getDate(),
    };

    // 내가 쓴 일기 불러오기
    const 날짜담는통 = new Date().toISOString().split("T")[0].replace(/-/g, ". ");
    const 제목담는통 = window.document.getElementById("HTML_제목입력창").value;
    const 내용담는통 = window.document.getElementById("HTML_내용입력창").value;
    let 기분담는통;
    window.document.getElementsByName("HTML_기분선택버튼").forEach((el) => {
        if (el.checked) 기분담는통 = el.value;
    });

    // 일기 목록에 일기 추가하기
    const 일기담는통 = {
        제목: 제목담는통,
        내용: 내용담는통,
        기분: 기분담는통,
        작성일: 날짜담는통,
    };

    const 스토리지에저장된일기목록 =
        window.localStorage.getItem("민지의일기목록") ?? "[]";
    const 일기목록 = JSON.parse(스토리지에저장된일기목록);
    일기목록.push(일기담는통);
    window.localStorage.setItem("민지의일기목록", JSON.stringify(일기목록));

    JS_일기그리기기능();

    // 입력 필드 초기화
    document.getElementById("HTML_제목입력창").value = "";
    document.getElementById("HTML_내용입력창").value = "";
};

const JS_필터링기능 = (event) => {
    const 선택한내용 = event.target.value;

    const 스토리지에저장된일기목록 =
        window.localStorage.getItem("민지의일기목록") ?? "[]";
    const 일기목록 = JSON.parse(스토리지에저장된일기목록);
    let 필터링된일기목록;

    switch (선택한내용) {
        case "HTML_행복선택": {
            필터링된일기목록 = 일기목록.filter((el) => el.기분 === "행복");
            break;
        }
        case "HTML_슬픔선택": {
            필터링된일기목록 = 일기목록.filter((el) => el.기분 === "슬픔");
            break;
        }
        case "HTML_놀람선택": {
            필터링된일기목록 = 일기목록.filter((el) => el.기분 === "놀람");
            break;
        }
        case "HTML_화남선택": {
            필터링된일기목록 = 일기목록.filter((el) => el.기분 === "화남");
            break;
        }
        case "HTML_기타선택": {
            필터링된일기목록 = 일기목록.filter((el) => el.기분 === "기타");
            break;
        }
        default: {
            필터링된일기목록 = 일기목록;
            break;
        }
    }

    const HTML_새로운일기도화지 = 필터링된일기목록
        .map(
            (el, index) => `
            <a href="./detail.html?number=${index}">
                <div class="CSS_일기" id="diary-${index}">
                <div class="CSS_삭제아이콘" onclick="JS_일기삭제기능(${index})">✖</div>
                    <div class="CSS_일기사진">
                      ${
                            el.기분 === "행복"
                                ? '<img class="CSS_기분이미지" src="./assets/images/joy.png" alt="행복" />'
                                : ""
                        }
                      ${
                            el.기분 === "슬픔"
                                ? '<img class="CSS_기분이미지" src="./assets/images/sadness.png" alt="슬픔" />'
                                : ""
                        }
                      ${
                            el.기분 === "놀람"
                                ? '<img class="CSS_기분이미지" src="./assets/images/surprised.png" alt="놀람" />'
                                : ""
                        }
                      ${
                            el.기분 === "화남"
                                ? '<img class="CSS_기분이미지" src="./assets/images/anger.png" alt="화남" />'
                                : ""
                        }
                      ${
                            el.기분 === "기타"
                                ? '<img class="CSS_기분이미지" src="./assets/images/etc.png" alt="기타" />'
                                : ""
                        }
                    </div>
                    <div class="CSS_일기내용">
                      ${el.기분 === "행복" ? `<div class="CSS_기분 CSS_행복">행복해요</div>` : ""}
                      ${el.기분 === "슬픔" ? `<div class="CSS_기분 CSS_슬픔">슬퍼요</div>` : ""}
                      ${el.기분 === "놀람" ? `<div class="CSS_기분 CSS_놀람">놀랐어요</div>` : ""}
                      ${el.기분 === "화남" ? `<div class="CSS_기분 CSS_화남">화나요</div>` : ""}
                      ${el.기분 === "기타" ? `<div class="CSS_기분 CSS_기타">기타</div>` : ""}
                      <div class="CSS_날짜">${el.작성일}</div>
                    </div>
                    <div class="CSS_일기제목"> ${el.제목}</div>
                </div>
            </a>
        `
        )
        .join("");
    window.document.getElementById("HTML_일기보여주는곳").innerHTML =
        HTML_새로운일기도화지;
};
