function onChangeRatio(event) {
    const imgElement = document.getElementById("dog-img");
    if (event.target.value === "default") {
        imgElement.style.aspectRatio = "1/1";
    } else if (event.target.value === "col") {
        imgElement.style.aspectRatio = "3/4";
    } else if ((event.target.value = "row")) {
        imgElement.style.aspectRatio = "4/3";
    }
}
