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
        console.log(el.style.aspectRatio)
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



// const selectPhotosFilterMenu = (event) => {
//     checkSelectedPhotosFilter()
//     const value = event.target.value
//         switch (value) {
//         case "기본형": {
//             document.getElementById("photos_filter_dropbox").style.cssText = `--dropdown_title: "기본형"`
//             break
//         }

//         case "세로형": {
//             document.getElementById("photos_filter_dropbox").style.cssText = `--dropdown_title: "세로형"`
//             break
//         }

//         case "가로형": {
//             document.getElementById("photos_filter_dropbox").style.cssText = `--dropdown_title: "가로형"`
//             break
//         }
//     }
//     document.getElementById("photos_filter_dropbox_menu").style = "display: none;"ㅌ   
// }

// const checkSelectedPhotosFilter = () => {
//     const menuList = document.getElementsByName("photos_filter_item")
//     menuList.forEach(el => {
//         console.log(el.id);
//         if (el.checked === true) {
//             document.getElementById(el.id).style = `
//              color: #3AB50F0D;
//              background-color: #3AB50F0D;
//              `
//         }
//     })
// }

