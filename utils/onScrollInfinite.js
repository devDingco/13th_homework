let timer;
function onScrollInfinite() {
    const pictureElement = document.getElementById("article-picture-component");
    if (pictureElement.style.display === "flex") {
        if (
            document.documentElement.scrollTop +
                document.documentElement.clientHeight ===
            document.documentElement.scrollHeight
        ) {
            if (timer) return;
            timer = setTimeout(() => {
                clearTimeout(timer);
                timer = null;
                const fetchAPI = async () => {
                    try {
                        await fetch(
                            "https://dog.ceo/api/breeds/image/random/10"
                        )
                            .then((res) => res.json())
                            .then(
                                (res) =>
                                    (document.getElementById(
                                        "article-picture-component"
                                    ).innerHTML =
                                        document.getElementById(
                                            "article-picture-component"
                                        ).innerHTML +
                                        res.message
                                            .map(
                                                (img) => `
                            <div>
                                <img src=${img} class="dog-img" id="dog-img" />
                            </div>`
                                            )
                                            .join(""))
                            );
                    } catch (err) {
                        alert(`ERROR : ${err}`);
                    }
                };
                fetchAPI();
            }, 1000);
        }
    }
}

window.addEventListener("scroll", onScrollInfinite);
