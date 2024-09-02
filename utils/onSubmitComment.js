function onSubmitComment(event) {
    event.preventDefault();

    const queryString = location.search;
    const queryId = new URLSearchParams(queryString).get("id");
    const storeDailyArray = JSON.parse(localStorage.getItem("dailyArray"));

    const dailyArray = storeDailyArray.filter(
        (daily) => Number(daily.id) === Number(queryId)
    );
    const sectionElement = document.getElementById("section-list");

    dailyArray[0].comments.push(event.target.children[0].value);

    sectionElement.innerHTML = "";

    dailyArray[0].comments.map((comment) => {
        const divElement = document.createElement("div");
        divElement.innerHTML = `
            <div class="section-comment">
                <div>${comment}</div>
                <div class="section-date">[2024.09.24]</div>
            </div>`;
        sectionElement.appendChild(divElement);
    });

    localStorage.setItem("dailyArray", JSON.stringify(storeDailyArray));
}
