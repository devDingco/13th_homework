window.onload = () => {
    JS_일기카드보여주기();
};

window.addEventListener('scroll', () => {
    window.document.getElementById('CSS_감정선택상자아이디').style =
        'background-color: #000; color:#fff';
});

const JS_일기카드보여주기 = () => {
    const 로컬스토리지저장된일기목록 =
        window.localStorage.getItem('민지의일기목록') ?? '[]';
    const 일기목록 = JSON.parse(로컬스토리지저장된일기목록);

    const HTML_메인왼쪽카드그리기 = 일기목록
        .map(
            (element, index) =>
                `   
            <div class="CSS_메인왼쪽">
                <div class="CSS_메인왼쪽_카드" >
                    <img src="./image/closeicon.png" class="CSS_닫힘버튼" onclick='JS_삭제버튼(event, ${index})'/>
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
        .join('');
    window.document.getElementById('HTML_메인왼쪽일기보여주는곳').innerHTML =
        HTML_메인왼쪽카드그리기;
};

const 일기목록 = [];

const JS_글쓰기기능 = () => {
    let date = new Date();
    const options = {
        year: date.getFullYear(),
        month: (date.getMonth() + 1).toString().padStart(2, '0'),
        date: date.getDate(),
    };

    // !!! date 2자리 숫자 만들기
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

    let 일기담는통 = {
        제목: 일기제목담는통,
        내용: 일기내용담는통,
        감정: 일기기분담는통,
        날짜: 일기날짜담는통,
    };

    const 로컬스토리지저장된일기목록 =
        window.localStorage.getItem('민지의일기목록') ?? '[]';
    const 일기목록 = JSON.parse(로컬스토리지저장된일기목록);

    일기목록.push(일기담는통);
    window.localStorage.setItem('민지의일기목록', JSON.stringify(일기목록));

    JS_일기카드보여주기();
};

const JS_글보기기능 = (일기번호받는통) => {
    const 일기담는통 = 일기상세정보[일기번호받는통];
    const 제목담는통 = 일기담는통.제목;
    const 내용담는통 = 일기담는통.내용;

    alert(`
    제목: ${제목담는통}
    내용: ${내용담는통}       
    `);

    location.href = `./detail.html?일기번호=${일기번호받는통}`;
};

const JS_필러링기능 = (event) => {
    const 필터선택내용 = event.target.value;

    const 로컬스토리지저장된일기목록 =
        window.localStorage.getItem('민지의일기기록') ?? [];
    const 일기목록 = JSON.parse(로컬스토리지저장된일기목록);

    let 필터링된일기목록;

    switch (필터선택내용) {
        case '행복선택': {
            필터링된일기목록 = 일기목록.filter(
                (element) => element.감정 === '행복'
            );
            break;
        }
    }

    const HTML_필터로걸러진카드 = 필터링된일기목록
        .map(
            (element, index) =>
                `
        <div class="CSS_메인왼쪽">
                <div class="CSS_메인왼쪽_카드" >
                    <img src="./image/closeicon.png" class="CSS_닫힘버튼" onclick='JS_삭제버튼(event, ${index})'/>
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
        .join('');

    alert('왜안넘어가?');

    window.document.getElementById('HTML_메인왼쪽일기보여주는곳').innerHTML =
        HTML_필터로걸러진카드;
};

// !!! 원래색으로 돌아오는것도 구현해야함
const 플로팅버튼 = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// idea: filter사용
const JS_삭제버튼 = (event, index2) => {
    event.preventDefault();

    const 로컬스토리지저장된일기목록 =
        window.localStorage.getItem('민지의일기목록');

    const 일기목록 = 로컬스토리지저장된일기목록
        ? JSON.parse(로컬스토리지저장된일기목록)
        : [];

    const 삭제후일기목록 = 일기목록.filter((el, index) => index !== index2);

    window.localStorage.setItem(
        '민지의일기목록',
        JSON.stringify(삭제후일기목록)
    );

    JS_일기카드보여주기();
};
