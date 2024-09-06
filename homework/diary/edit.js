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

    window.document.getElementById('id_제목').value = 일기담는통.제목;
    window.document.getElementById('id_내용').value = 일기담는통.내용;
    window.document.getElementsByName('감정').forEach((el) => {
        if (el.value === 일기담는통.기분) el.checked = true;
    });
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
