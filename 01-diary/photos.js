let apiFetchTimer = null
let nowNavMenu = "diary"

const photosPageOnLoad = () => {
    document.getElementById("photos_filter_dropbox").style = "display: block;"
    fetchDogsFromAPI(data => {
        renderPhotos(data)
    })
}

const fetchDogsFromAPI = (completionHandler) => {
    // document.getElementById("skeleton_box").style = "display: block;"
    const api = `https://dog.ceo/api/breeds/image/random/10`
    fetch(api)
    .then(result => result.json())
    .then(data => {
        const images = data.message
        completionHandler(images)
    })
}

const renderPhotos = (data) => {
    const photoDOMList = data.map(el =>
        `<img class="contents_photos_item" src="${el}">`
    ).join("")

    document.getElementById("HTML_contents_photos_group").innerHTML = photoDOMList
}

const updateImageDOMList = (images) => {
    console.log("API를 추가로 호출합니다.")
    const oldDOMList = document.getElementById("HTML_contents_photos_group").innerHTML
    const newDOMList = images.map(el => 
        `<img class="contents_photos_item" src="${el}">`
    ).join("")
    document.getElementById("HTML_contents_photos_group").innerHTML = oldDOMList + newDOMList    
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

window.addEventListener("scroll", () => {
    const root = document.documentElement
    const scroll = root.scrollTop / (root.scrollHeight - root.clientHeight)

    if (nowNavMenu !== "photos") return;
    if (scroll < 0.8) return;
    if (apiFetchTimer !== null) return;

    fetchDogsFromAPI((data) => {
        updateImageDOMList(data)
    })
    
    apiFetchTimer = setTimeout(() => {
        apiFetchTimer = null

        const scroll = root.scrollTop / (root.scrollHeight - root.clientHeight)
        if(scroll === 1) {
            fetchDogsFromAPI((data) => {
                updateImageDOMList(data)
            })
        }
    }, 1000)
})
