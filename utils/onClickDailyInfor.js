function onClickDailyInfor(event) {
    const dailyArray = JSON.parse(localStorage.getItem("dailyArray"));
    const detailInfor = dailyArray[event.target.id];
    alert(
        `제목은 "${detailInfor.title}"이고 내용은 "${detailInfor.content}"이고 나는 "${detailInfor.mood}". 오늘 날짜는 "${detailInfor.date}"입니다.`
    );
}
