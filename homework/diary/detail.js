window.onload = () => {
    //location 페이지들의 정보를 담고있는 객체다
    const 쿼리스트링 = window.location.search;
    const 잘게나누어담은통 = new URLSearchParams(쿼리스트링);
    const 일기번호 = 잘게나누어담은통.get('number');

    const 스토리지에저장된일기목록 =
        window.localStorage.getItem('민지의일기목록') ?? '[]';
    const 일기목록 = JSON.parse(스토리지에저장된일기목록);

    const 일기담는통 = 일기목록[일기번호];
    console.log(일기담는통);

    let 기분 = 일기담는통.감정;
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
        일기담는통.제목;
    window.document.getElementById('HTML_감정메시지들어가는곳').innerHTML =
        기분메시지;
    window.document.getElementById('HTML_감정메시지들어가는곳').style.color =
        글자색;
    window.document.getElementById('HTML_날짜들어가는곳').innerHTML =
        일기담는통.날짜;
    window.document.getElementById('HTML_내용들어가는곳').innerHTML =
        일기담는통.내용;
    window.document.getElementById('HTML_감정사진들어가는곳').src = 이미지경로;
    window.document.getElementById('HTML_감정사진들어가는곳').alt = 기분메시지;

    const 스토리지에저장된회고목록 =
        window.localStorage.getItem('회고목록') ?? [];
    const 정제된회고목록 = JSON.parse(스토리지에저장된회고목록);
    const 회고목록통 = 정제된회고목록[일기번호];

    console.log(회고목록통);

    const HTML_회고목록내용보여주기 = 회고목록통.내용;
    console.log(HTML_회고목록내용보여주기);

    window.document.getElementById('id_회고목록보여주기').innerHTML =
        HTML_회고목록내용보여주기;
};

const JS_수정기능 = () => {
    const 쿼리스트링 = window.location.search;
    const 잘게나누어담은통 = new URLSearchParams(쿼리스트링);
    const 일기번호 = 잘게나누어담은통.get('number');
    window.location.href = `./edit.html?number=${일기번호}`;
};

let 회고목록 = [];
const JS_회고기능 = () => {
    const 회고내용 = window.document.getElementById('HTML_회고').value;

    let 회고목록담는통 = {
        내용: 회고내용,
    };

    회고목록.push(회고목록담는통);
    window.localStorage.setItem('회고목록', JSON.stringify(회고목록));
};
