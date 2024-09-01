// JS: 일기등록
// 배열에 객체로 일기 push하여 등록할 수 있게 해주세요.
// JS: 일기목록
// 일기등록시 일기목록에 마지막 순서로 추가되게 해주세요.
// JS: 일기상세
// 일기목록에서 카드 클릭하면 alert으로 상세 정보를 보여주세요.

let 일기상세정보 = [];

const JS_일기카드보여주기 = () => {
    let date = new Date();

    const options = {
        year: date.getFullYear(),
        month: (date.getMonth() + 1).toString().padStart(2, '0'),
        date: date.getDate(),
    };

    const 일기제목 = window.document.getElementById('id_제목').value;
    const 일기내용 = window.document.getElementById('id_내용').value;
    const 일기날짜 = options.year + '-' + options.month + '-' + options.date;

    const 일기담는통 = {
        제목: 일기제목,
        내용: 일기내용,
        날짜: 일기날짜,
    };
    console.log(일기날짜);
};

JS_일기카드보여주기();
