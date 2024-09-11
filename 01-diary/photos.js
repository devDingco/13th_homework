const fetchDogsFromAPI = () => {
    document.getElementById("skeleton_box").style = "display: block;"
    const api = "https://dog.ceo/api/breeds/image/random/10"

    fetch(api)
    .then(result => result.json())
    .then(data => { 
        const dogImages = data.message

        const imageDOMList = dogImages.map(el =>
            `<img class="contents_photos_item" src="${el}">`
        ).join("")

        document.getElementById("HTML_contents_photos_group").innerHTML = imageDOMList
        document.getElementById("skeleton_box").style = "display: none;"
    })

    settings()
}

const filterPhotos = (event) => {
    const selectedRatio = event.target.value
    const dogImages = document.querySelectorAll(".contents_photos_item")
    dogImages.forEach(el => {
        switch (selectedRatio) {
            case "기본형": {
                el.style.aspectRatio = "1 / 1"
                el.style.width = "100%"
                break
            }
    
            case "가로형": {
                el.style.aspectRatio = "4 / 3"
                el.style.width = "100%"
                break
            }
    
            case "세로형": {
                el.style.aspectRatio = "3 / 4"
                el.style.width = "100%"
                break
            }
        }
    })
}

const settings = () => {
    document.getElementById("photos_filter_dropbox").style = "display: block;"
}
