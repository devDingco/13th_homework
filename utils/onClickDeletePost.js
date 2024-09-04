function onClickDeletePost() {
    const dailyArray = JSON.parse(localStorage.getItem("dailyArray"));
    const queryString = location.search;
    const queryId = new URLSearchParams(queryString).get("id");

    const deleteArray = dailyArray.filter(
        (daily) => daily.id != Number(queryId)
    );
    localStorage.setItem("dailyArray", JSON.stringify(deleteArray));
    alert("삭제 되었습니다.");
    history.back();
}
