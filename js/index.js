'use strict';

import {throttle} from './functool.js';

const assetMap = {
    "banner" : "../asset/img/d72d05561bfdb209c688de2957f78ef1.jpeg",
    "sad" : "../asset/img/b19da762c846d560f8bfcde81d4efdc5.png",
    "surprised" : "../asset/img/a0d14d42505d44a355217f4a6333160a.png",
    "happy" : "../asset/img/394c18eb9129e4d3f22f03a59519cfdc.png",
    "other" : "../asset/img/47d90f65f868897bceebf4a1969de84b.png",
    "angry" : "../asset/img/4ae621ed2ead07f5b36fb83001247dba.png"
};

const translationMap = {
    "happy" : "행복해요",
    "sad" : "슬퍼요",
    "surprised" : "놀랐어요",
    "angry" : "화나요",
    "other" : "기타"
};

["diaryArray", "happy", "sad", "surprised", "angry", "other"].forEach(key => {
    if (!localStorage.getItem(key)) localStorage.setItem(key, JSON.stringify([]));
});

["lastIndex"].forEach(key => {
    if (!localStorage.getItem(key)) localStorage.setItem(key, JSON.stringify(-1));
});

JSON.parse(localStorage.getItem("diaryArray")).forEach(element => {
    if (element !== null) addDiaryUI(element);
});

document.querySelector("#adding-form").addEventListener(
    "submit", (e) => {
        e.preventDefault();
        const emotion = e.target.querySelector("input[type='radio']:checked").value;
        const title = e.target.querySelector("input.text-input").value;
        const content = e.target.querySelector("textarea.text-input").value;
        if (!title || !content) {
            alert("제목과 내용을 입력하세요");
            return;
        }
        diaryArray = JSON.parse(localStorage.getItem("diaryArray"));
        const emoIndex = JSON.parse(localStorage.getItem(emotion));
        emoIndex.push(diaryArray.length);
        localStorage.setItem(emotion, JSON.stringify([...emoIndex]));
        const dateNow = new Date();
        let objAdded;
        let tempInt;
        diaryArray.push(objAdded = {
            "emotion" : emotion,
            "title" : title,
            "content" : content,
            "datenow" : dateNow,
            "index" : (tempInt=JSON.parse(localStorage.getItem("lastIndex"))+1)
        });
        localStorage.setItem("lastIndex", tempInt);
        localStorage.setItem("diaryArray", JSON.stringify(diaryArray));
        addDiaryUI(objAdded);
        e.target.querySelector("input[type='radio'], input[checked]").checked = true;
        e.target.querySelector("input.text-input").value = "";
        e.target.querySelector("textarea.text-input").value = "";
    }
);

function addDiaryUI(listobj) {
    const emotion = listobj["emotion"];
    const title = listobj["title"];
    const dateNow = listobj["datenow"];
    let year, month, date;
    if (typeof dateNow === "string") {
        const m = dateNow.match(/(\d{4})-(\d{2})-(\d{2})/);
        year = Number(m[1]);
        month = Number(m[2]);
        date = Number(m[3]);
    }
    else {
        year = dateNow.getFullYear();
        month = dateNow.getMonth() + 1;
        date = dateNow.getDate();
    }
    const koreanemo = translationMap[emotion];
    if ('content' in document.createElement('template')) {
        const diaryList = document.querySelector("ul#diarylist");
        const templateHTML = document.querySelector("template#list-item-template");
        const templClone = templateHTML.content.cloneNode(true);
        const dateString = `${year}년 ${month}월 ${date}일`;
        templClone.querySelector("p#add-title").innerText = (title.length > 8)?title.substring(0,8)+'..':title;
        templClone.querySelector("span#add-emo").innerText = koreanemo;
        templClone.querySelector("span#add-date").innerText = dateString;
        templClone.querySelector("div.diary-listitem-bg").style.backgroundImage = `url(${assetMap[emotion]})`;
        templClone.querySelector("a.anchor-nodeco").href = `/edit.html?p=${listobj["index"]}`;
        const closeBtn = templClone.querySelector("button.listitem-close-btn");
        closeBtn.name = `${listobj.index}`;
        closeBtn.value = `${emotion}`;
        closeBtn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            const removeIdx = Number(closeBtn.name);
            const array = JSON.parse(localStorage.getItem("diaryArray"));
            array[removeIdx] = null;
            localStorage.setItem("diaryArray", JSON.stringify(array));
            const removeEmotion = closeBtn.value;
            const oldSet = new Set(JSON.parse(localStorage.getItem(removeEmotion)));
            oldSet.delete(removeIdx);
            localStorage.setItem(removeEmotion, JSON.stringify([...oldSet]));
            while (diaryList.hasChildNodes()) {
                diaryList.removeChild(diaryList.lastChild);
            }
            array.forEach(element => {
                if (element !== null) addDiaryUI(element);
            });
        });
        diaryList.prepend(templClone);
    }
}

document.querySelector("select#dropdownEmotionFilter").addEventListener("change", (e) => {
    e.preventDefault();
    const selection = e.target.querySelector(":checked").value;
    let predicate;
    switch (selection) {
        case "전체": predicate = (e, s) => 1 === 1; break;
        default: predicate = (e, s) => s.has(e); break;
    }
    const list = JSON.parse(localStorage.getItem("diaryArray"));
    let filterset;
    switch (selection) {
        case "전체": filterset = list; break;
        case "행복해요": filterset = JSON.parse(localStorage.getItem("happy")); break;
        case "슬퍼요": filterset = JSON.parse(localStorage.getItem("sad")); break;
        case "놀랐어요": filterset = JSON.parse(localStorage.getItem("surprised")); break;
        case "화나요": filterset = JSON.parse(localStorage.getItem("angry")); break;
        case "기타": filterset = JSON.parse(localStorage.getItem("other")); break;
    }
    filterset = new Set(filterset);
    if ('content' in document.createElement('template')) {
        const diaryList = document.querySelector("ul#diarylist");
        while (diaryList.hasChildNodes()) diaryList.removeChild(diaryList.lastChild);
        list.filter((e) => e !== null && predicate(e.index, filterset)).forEach(e => addDiaryUI(e));
    }
});

document.querySelector("select#dropdownImageAspect").addEventListener("change", (e) => {
    e.preventDefault();
    const selection = e.target.querySelector(":checked").value;
    const imgArray = document.querySelectorAll("img.dog-image");
    switch (selection) {
        case "기본형": imgArray.forEach(e => e.style = "aspect-ratio: 1 / 1;"); break;
        case "가로형": imgArray.forEach(e => e.style = "aspect-ratio: 4 / 3;"); break;
        case "세로형": imgArray.forEach(e => e.style = "aspect-ratio: 3 / 4;"); break;
    }
});

const diaryListHTML = document.querySelector("ul#diarylist");
diaryListHTML.addEventListener("scroll", (e) => {
    if (diaryListHTML.scrollTop > 0) {
        // console.log("dfa")
        document.querySelector("select#dropdownEmotionFilter").style = "background: var(--reverselightgray)"
    } else {
        document.querySelector("select#dropdownEmotionFilter").style = "background: var(--lightgray)"
    }
});

document.querySelector("div.scroll-up-btn").addEventListener("click", (e) => {
    diaryListHTML.scrollTo({top: 0, behavior: "smooth"});
});

const shutModal = (e) => {
    document.querySelector("div.curtain").style = "display: none; z-index: -1; position: static";
    document.querySelector("div.flexchild-right").style = "display:none;";
    window.removeEventListener("keydown", escListener);
};

const escListener = (e) => {
    if (e.key === "Escape") {
        shutModal();
    }
};

document.querySelector("button#write-btn").addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        diaryListHTML.scrollTo({top:0, behavior: "smooth"});
        document.querySelector("div.flexchild-right").style = "display:block;";
        document.querySelector("div.curtain").style = "position: absolute; display: block; width: 100vw; height: 100vh; z-index: 5; opacity: 50%; background: black;";
        window.addEventListener("keydown", escListener);
    }
);

document.querySelector("div.curtain").addEventListener("click", shutModal);

document.querySelector("div.container-picker-tab").addEventListener("click", e => {
    const toInactive = e.target.previousElementSibling ?? e.target.nextElementSibling;
    const toActive = e.target;
    toInactive.classList.remove("active");
    toInactive.classList.add("inactive");
    toActive.classList.remove("inactive");
    toActive.classList.add("active");
    
    switch (toActive.id) {
        case "diary-tab": {
            document.querySelector("main > section.diary-view").classList.remove("hidden");
            document.querySelector("main > section.photo-view").classList.add("hidden");
            break;
        }
        case "photo-tab": {
            document.querySelector("main > section.diary-view").classList.add("hidden");
            document.querySelector("main > section.photo-view").classList.remove("hidden");
            break;
        }
    }
});

function add10PicsWrapper() {
    const msgCache = [];
    let scroll = 0;
    function inner(e) {
        if (scroll>document.documentElement.scrollTop) return;
        console.log(scroll);
        console.log(document.documentElement.scrollTop);
        scroll = document.documentElement.scrollTop;
        const templateHTML = document.querySelector("template.dog-image-template");
        const imageList = document.querySelector("ul.image-scroll-zone");
        let templClone;
        [...Array(10)].forEach(i => {
            // console.log("out: " + performance.now());
            // console.log(templClone);
            fetch("https://dog.ceo/api/breeds/image/random") // DEBUG(0)>> GET https://dog.ceo/api/breeds/image/random net::ERR_INSUFFICIENT_RESOURCES
                .then(res => {
                    // console.log(templClone);
                    res.json()
                        .then(json => {
                            templClone = templateHTML.content.cloneNode(true);
                            // console.log(templClone);
                            // console.log("in: " + performance.now());
                            templClone.querySelector("img.dog-image").src = json["message"];
                            imageList.append(templClone);
                            msgCache.push(json["message"]);
                        })
                        .catch(reason => {
                            console.error(reason);
                            console.log("json error");
                        });
                })
                .catch(reason => {
                    // reason.name = "Fetch Image Error: https://dog.ceo/api/breed/image/random"; // Replaces "TypeError"
                    console.dir(reason);
                    console.error(reason); // DEBUG(0)>> Fetch Image Error : https://dog.ceo/api/breed/image/random: Failed to fetch \n at index.js:220:9 \n at Array.forEach (<anonymous>) \n at add10Pics (index.js:217:20) at index.js:328:9 \n (anonymous) @ index.js:238 \n Promise.catch \n (anonymous) @ index.js:237 \n add10Pics @ index.js:217 \n (anonymous) @ index.js:328
                    console.log("fetch error");
                    templClone = templateHTML.content.cloneNode(true);
                    // console.log(templClone);
                    // console.log("in: " + performance.now());
                    templClone.querySelector("img.dog-image").src = msgCache[Math.floor(msgCache.length * Math.random())];
                    imageList.append(templClone);
                })
                .finally(() => {
                });
        });
    };
    return inner;
}

const add10Pics = add10PicsWrapper();

document.querySelector("button#photo-tab").addEventListener("click", e => {
    add10Pics();
}, {once : true});

document.querySelector("input.dark-btn").addEventListener("change", e => {
    document.querySelector("div.flexchild-right").dataset.dark = (e.target.checked) ? "on":"off";
});


window.addEventListener("scroll", throttle(add10Pics, {debug:false}));

document.querySelector("input.search-input").addEventListener("input", e => {
    console.log(e.target.value);
    console.log(e.data);
});