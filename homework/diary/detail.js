window.onload = () => {
    //location 페이지들의 정보를 담고있는 객체다
    const 쿼리스트링 = window.location.search;
    const 잘게나누어담은통 = new URLSearchParams(쿼리스트링);
    const 일기번호 = 잘게나누어담은통.get('number');

    const 스토리지에저장된일기목록 =
        window.localStorage.getItem('민지의일기목록') ?? '[]';
    const 일기목록 = JSON.parse(스토리지에저장된일기목록);

    const 일기담는통 = 일기목록[일기번호];

    let 기분 = 일기담는통?.감정; // 옵셔널 체이닝 사용
    let 기분메시지;
    switch (기분) {
        case '행복':
            기분메시지 = '행복해요';
            이미지경로 = './image/mini-happy.png';
            글자색 = '#EA5757';
            break;
        case '슬픔':
            기분메시지 = '슬퍼요';
            이미지경로 = './image/mini-sad.png';
            글자색 = '#28B4E1';
            break;
        case '놀람':
            기분메시지 = '놀랐어요';
            이미지경로 = './image/mini-surprise.png';
            글자색 = '#D59029';
            break;
        case '행복':
            기분메시지 = '화나요';
            이미지경로 = './image/mini-anger.png';
            글자색 = '#777';
            break;
        default:
            기분메시지 = '기타';
            이미지경로 = './image/mini-thinking.png';
            글자색 = '#A229ED';
            break;
    }

    window.document.getElementById('HTML_제목들어가는곳').innerHTML =
        일기담는통?.제목;
    window.document.getElementById('HTML_감정메시지들어가는곳').innerHTML =
        기분메시지;
    window.document.getElementById('HTML_감정메시지들어가는곳').style.color =
        글자색;
    window.document.getElementById('HTML_날짜들어가는곳').innerHTML =
        일기담는통?.날짜;
    window.document.getElementById('HTML_내용들어가는곳').innerHTML =
        일기담는통?.내용;
    window.document.getElementById('HTML_감정사진들어가는곳').src = 이미지경로;
    window.document.getElementById('HTML_감정사진들어가는곳').alt = 기분메시지;

    JS_회고그리기기능();
};

const JS_수정기능 = () => {
    const 쿼리스트링 = window.location.search;
    const 잘게나누어담은통 = new URLSearchParams(쿼리스트링);
    const 일기번호 = 잘게나누어담은통.get('number');
    window.location.href = `./edit.html?number=${일기번호}`;
};

const JS_회고추가기능 = () => {
    const 쿼리스트링 = window.location.search;
    const 잘게나누어담은통 = new URLSearchParams(쿼리스트링);
    const 일기번호 = 잘게나누어담은통.get('number');

    const 스토리지에저장된일기목록 =
        window.localStorage.getItem('민지의일기목록') ?? '[]';
    const 일기목록 = JSON.parse(스토리지에저장된일기목록);

    const 회고내용담는통 = window.document.getElementById('HTML_회고').value;

    // 현재 일기에 나머지 고대로 두고, 회고목록에 신규 회고만 추가
    const 원래있었던회고목록 = 일기목록[일기번호].회고목록;

    // 날짜
    const date = new Date();
    const options = {
        year: date.getFullYear(),
        month: (date.getMonth() + 1).toString().padStart(2, '0'),
        date: date.getDate().toString().padStart(2, '0'),
    };

    const 날짜담는통 = options.year + '.' + options.month + '.' + options.date;

    원래있었던회고목록 === undefined
        ? (일기목록[일기번호].회고목록 = [
              {
                  회고내용: 회고내용담는통,
                  작성일: 날짜담는통,
              },
          ])
        : 일기목록[일기번호].회고목록.push({
              회고내용: 회고내용담는통,
              작성일: 날짜담는통,
          });

    window.localStorage.setItem('민지의일기목록', JSON.stringify(일기목록));

    alert('회고등록 하셨네요');
    JS_회고그리기기능();
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

const JS_삭제기능 = () => {
    const 쿼리스트링 = window.location.search;
    const 잘게나누어담은통 = new URLSearchParams(쿼리스트링);
    const 일기번호 = 잘게나누어담은통.get('number');
    const 스토리지에저장된일기목록 =
        window.localStorage.getItem('민지의일기목록') ?? '[]';
    const 일기목록 = JSON.parse(스토리지에저장된일기목록);

    const 일기삭제후목록 = 일기목록.filter(
        (el, index) => index !== parseInt(일기번호, 10)
    );

    console.log(일기삭제후목록);

    window.localStorage.setItem(
        '민지의일기목록',
        JSON.stringify(일기삭제후목록)
    );

    alert('삭제되었습니다. 삭제된 일기는 저장되지 않습니다');

    // 현재 페이지를 지우고, 새로운 페이지로 교체 => 뒤로가기해도 현재 페이지로 돌아올 수 없음
    location.replace('./index.html');
};

const JS_내용복사하기 = () => {
    const 쿼리스트링 = window.location.search;
    const 잘게나누어담은통 = new URLSearchParams(쿼리스트링);
    const 일기번호 = 잘게나누어담은통.get('number');
    const 스토리지에저장된일기목록 =
        window.localStorage.getItem('민지의일기목록') ?? '[]';
    const 일기목록 = JSON.parse(스토리지에저장된일기목록);

    const 일기목록내용 = 일기목록[일기번호].내용;
    navigator.clipboard.writeText(일기목록내용);

    alert('복사되었습니다');
};
