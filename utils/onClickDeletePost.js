function onClickDeletePost() {
    const dailyArray = JSON.parse(localStorage.getItem("dailyArray"));
    const queryString = location.search;
    const queryId = new URLSearchParams(queryString).get("id");
    console.log(queryId);

    const deleteArray = dailyArray.filter(
        (daily) => daily.id != Number(queryId)
    );
    localStorage.setItem("dailyArray", JSON.stringify(deleteArray));
    history.back();
}
