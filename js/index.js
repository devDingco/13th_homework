const assetMap = {
    "banner" : "../asset/png/d72d05561bfdb209c688de2957f78ef1.jpeg",
    "sad" : "../asset/png/b19da762c846d560f8bfcde81d4efdc5.png",
    "surprised" : "../asset/png/a0d14d42505d44a355217f4a6333160a.png",
    "happy" : "../asset/png/394c18eb9129e4d3f22f03a59519cfdc.png",
    "other" : "../asset/png/47d90f65f868897bceebf4a1969de84b.png",
    "angry" : "../asset/png/4ae621ed2ead07f5b36fb83001247dba.png"
};
window.onload = () => 
{
    const diaryArray = [];
    

    document.querySelector("#adding-form").addEventListener(
        "submit", (e) =>
        {
            e.preventDefault();
            let emotion;
            for (let i of e.target.querySelectorAll("input[type='radio']"))
                if (i.checked) emotion = i.value;
            const title = e.target.querySelector("input.text-input").value;
            const content = e.target.querySelector("textarea.text-input").value;
            diaryArray.push({
                "emotion" : emotion,
                "title" : title,
                "content" : content
            });
            let koreanemo;
            switch (emotion)
            {
                case "happy": koreanemo="행복해요"; break;
                case "sad": koreanemo="슬퍼요"; break;
                case "surprised": koreanemo="놀랐어요"; break;
                case "other": koreanemo="기타"; break;
                case "angry": koreanemo="화나요"; break;
            }
            if ('content' in document.createElement('template')) {
                const diaryList = document.querySelector("ul#diarylist");
                const templateHTML = document.querySelector("template");
                const templClone = document.importNode(templateHTML.content, true);
                templClone.querySelector("p#add-title").innerHTML = title;
                templClone.querySelector("span#add-emo").innerHTML = koreanemo;
                templClone.querySelector("span#add-date").innerHTML = new Date().toString();
                templClone.querySelector("div.diary-listitem-bg").style.backgroundImage = `url(${assetMap[emotion]})`;
                diaryList.appendChild(templClone);
            }
        }
    );
}
