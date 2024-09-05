// - [ ]  CSS: 일기수정
//     - [ ]  수정완료 클릭시 버튼이 기울어지게 해주세요.
// - [ ]  JS: 일기등록
//     - [ ]  “행복”, “슬픔” 등 기분을 선택할 수 있게 해주세요.
//     - [ ]  `forEach`로 체크된 라디오버튼을 추출해주세요.
//     - [ ]  껐다 켜도 일기 남아있게 구현해주세요.
// - [ ]  JS: 일기목록
//     - [ ]  `map`으로 렌더링 방식을 변경해주세요.
//     - [ ]  기분 필터링 기능 추가해주세요. ⇒ “행복”, “슬픔” 등
//     - [ ]  “행복”, “우울”, “기타”에 따라 이미지를 변경해주세요.
// - [ ]  JS: 일기상세
//     - [ ]  상세페이지 만들고 `<a />`로 이동할 수 있어야 합니다.
// - [ ]  JS: 일기수정
//     - [ ]  상세페이지에서 일기를 수정할 수 있게 해주세요.

const JS_일기카드보여주기 = () => {
    const 로컬스토리지저장된일기목록 =
        window.localStorage.getItem('민지의일기목록') ?? '[]';
    const 일기상세정보 = JSON.parse(로컬스토리지저장된일기목록);

    // console.log(일기상세정보);

    let date = new Date();
    const options = {
        year: date.getFullYear(),
        month: (date.getMonth() + 1).toString().padStart(2, '0'),
        date: date.getDate(),
    };

    // 1-1. 내가 쓴 일기 불러오기
    const 일기제목담는통 = window.document.getElementById('id_제목').value;
    const 일기내용담는통 = window.document.getElementById('id_내용').value;
    const 일기날짜담는통 =
        options.year + '-' + options.month + '-' + options.date;

    let 일기기분담는통;
    window.document.getElementsByName('감정').forEach((element) => {
        if (element.checked) {
            일기기분담는통 = element.value;
        }
    });

    // 1-2. 오늘의 기분 불러오기
    let 행복불러오기 = window.document.getElementById('id_행복').checked;
    let 슬픔불러오기 = window.document.getElementById('id_슬픔').checked;
    let 놀람불러오기 = window.document.getElementById('id_놀람').checked;
    let 화남불러오기 = window.document.getElementById('id_화남').checked;
    let 기타불러오기 = window.document.getElementById('id_기타').checked;

    // 2.일기목록에 일기 추가하기
    let 일기담는통 = {
        제목: 일기제목담는통,
        내용: 일기내용담는통,
        감정: 일기기분담는통,
        날짜: 일기날짜담는통,
    };

    일기상세정보.push(일기담는통);
    window.localStorage.setItem('민지의일기목록', JSON.stringify(일기상세정보));

    // console.log(일기불러오기문자열);

    // 3. 마지막으로 추가한 일련번호 가져오기
    const 일기번호 = 일기상세정보.length - 1;
    // console.log(일기번호);

    // 4. 현재까지 그려진 일기 가져오기
    const HTML_기존도화지가져오기 =
        window.document.getElementById('HTML_메인왼쪽일기보여주는곳').innerHTML;

    const HTML_메인왼쪽일기보여주는곳 = 일기상세정보
        .map(
            (element, index) =>
                `   
            
            <div class="CSS_메인왼쪽">
                <div class="CSS_메인왼쪽_카드" >
                    <a class="CSS_일기사진" href="./detail.html?number=${index}">
                        ${
                            element.감정 === '행복'
                                ? '<img class="CSS_기분이미지" src="./image/happy.png" alt="행복"/>'
                                : ''
                        }
                        ${
                            element.감정 === '슬픔'
                                ? '<img class="CSS_기분이미지" src="./image/sad.png" alt="슬픔" />'
                                : ''
                        }
                        ${
                            element.감정 === '놀람'
                                ? '<img class="CSS_기분이미지" src="./image/shocked.png" alt="놀람" />'
                                : ''
                        }
                        ${
                            element.감정 === '화남'
                                ? '<img class="CSS_기분이미지" src="./image/anger.png" alt="화남" />'
                                : ''
                        }
                        ${
                            element.감정 === '기타'
                                ? '<img class="CSS_기분이미지" src="./image/thinking.png" alt="기타" />'
                                : ''
                        }
                        </a>
                        <div class="CSS_메인왼쪽_카드_디테일">
                            <div class="CSS_메인왼쪽_카드_디테일_기분">
                            ${
                                element.감정 === '행복'
                                    ? '<div class="CSS_행복">행복함</div>'
                                    : ''
                            }
                            ${
                                element.감정 === '슬픔'
                                    ? '<div class="CSS_슬픔">슬픔</div>'
                                    : ''
                            }
                            ${
                                element.감정 === '놀람'
                                    ? '<div class="CSS_놀람">놀람</div>'
                                    : ''
                            }
                            ${
                                element.감정 === '화남'
                                    ? '<div class="CSS_화남">화남</div>'
                                    : ''
                            }
                            ${
                                element.감정 === '기타'
                                    ? '<div class="CSS_기타">기타</div>'
                                    : ''
                            }
                        </div>
                        <div class="CSS_메인왼쪽_카드_디테일_날짜">
                            ${element.날짜}
                        </div>
                    </div>
                    <div class="CSS_메인왼쪽_카드_디테일_멘트">
                            ${element.제목}
                    </div>
                </div>
            </div>
            `
        )
        .join();
    window.document.getElementById('HTML_메인왼쪽일기보여주는곳').innerHTML =
        HTML_메인왼쪽일기보여주는곳;
};

const JS_상세페이지기능 = () => {};

const JS_글보기기능 = (일기번호받는통) => {
    const 일기담는통 = 일기상세정보[일기번호받는통];
    const 제목담는통 = 일기담는통.제목;
    const 내용담는통 = 일기담는통.내용;

    alert(`
    제목: ${제목담는통}
    내용: ${내용담는통}       
    `);
};
