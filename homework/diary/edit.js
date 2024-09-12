window.onload = () => {
    const 쿼리스트링 = window.location.search;
    const 잘게나누어담은통 = new URLSearchParams(쿼리스트링);
    const 일기번호 = 잘게나누어담은통.get('number');

    const 스토리지에저장된일기목록 =
        window.localStorage.getItem('민지의일기목록') ?? '[]';
    const 일기목록 = JSON.parse(스토리지에저장된일기목록);

    // console.log(스토리지에저장된일기목록);

    const 일기담는통 = 일기목록[일기번호];
    // console.log(일기담는통);

    window.document.getElementById('id_제목').value = 일기담는통?.제목;
    window.document.getElementById('id_내용').value = 일기담는통?.내용;
    window.document.getElementsByName('감정').forEach((el) => {
        if (el.value === 일기담는통.기분) el.checked = true;
    });

    JS_회고그리기기능();
};

const JS_수정기능 = () => {
    const 쿼리스트링 = window.location.search;
    const 잘게나누어담은통 = new URLSearchParams(쿼리스트링);
    const 일기번호 = 잘게나누어담은통.get('number');

    const 스토리지에저장된일기목록 =
        window.localStorage.getItem('민지의일기목록') ?? [];

    const 일기목록 = JSON.parse(스토리지에저장된일기목록);

    let 수정된기분담는통;
    window.document.getElementsByName('감정').forEach((el) => {
        if (el.checked) 수정된기분담는통 = el.value;
    });
    const 수정된제목담는통 = window.document.getElementById('id_제목').value;
    const 수정된내용담는통 = window.document.getElementById('id_내용').value;

    // 수정된내용 localStorage의 저장하기
    일기목록[일기번호] = {
        제목: 수정된제목담는통,
        내용: 수정된내용담는통,
        기분: 수정된기분담는통,
        작성일: 일기목록[일기번호].작성일,
    };

    window.localStorage.setItem('민지의일기목록', JSON.stringify(일기목록));

    console.log(
        window.localStorage.setItem('민지의일기목록', JSON.stringify(일기목록))
    );
    // 디테일페이지로 돌아가기
    location.replace(`./detail.html?number=${일기번호}`);
};

const JS_수정취소하기기능 = () => {
    const 쿼리스트링 = window.location.search;
    const 잘게나누어담은통 = new URLSearchParams(쿼리스트링);
    const 일기번호 = 잘게나누어담은통.get('number');

    window.location.replace(`./detail.html?number=${일기번호}`);
};

const JS_회고그리기기능 = () => {
    // 주소에서 일기번호 가져오기
    const 쿼리스트링 = window.location.search;
    const 잘게나누어담은통 = new URLSearchParams(쿼리스트링);
    const 일기번호 = 잘게나누어담은통.get('number');

    // 스토리지에 저장된 일기목록 가져오기
    const 로컬스토리지저장된일기목록 =
        localStorage.getItem('민지의일기목록') ?? '[]';
    const 일기목록 = JSON.parse(로컬스토리지저장된일기목록);

    const 일기담는통 = 일기목록[일기번호];
    // console.log(일기담는통);

    // 현재일기에서 회고목록만 뽑아내기
    // 위에 일기담는통에는 회고목록이라는 key값이 없음
    // 따라서 일기담는통.회고목록 = undefined이 됨
    // undefinedrk 되면 새로운 배열을 넣어줌
    const 회고목록 = 일기담는통.회고목록 ?? [];

    // 회고목록 화면에 새롭게 전체 그리기
    let HTML_새로운회고목록 = '';
    회고목록.forEach((element, index) => {
        const 마지막요소 = index === 회고목록.length - 1;

        HTML_새로운회고목록 =
            HTML_새로운회고목록 +
            `
        <div class="CSS_회고담는상자">
            <div class="CSS_회고내용">${element.회고내용}</div>
            <div class="CSS_회고작성일">[${element.작성일}]</div>
        </div>
        `;
    });
    document.getElementById('id_회고목록보여주기').innerHTML =
        HTML_새로운회고목록;
};
