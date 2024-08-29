// interface postObjectType {
//     id: string;
//     date: number;
//     title: string;
//     content: string;
//     img: string;
// }

// 이번 목표 - if문 최대한 안 쓰기

const idList = ["angry", "etc", "happy", "sad", "surprise"];

// 금일 날짜
const date = new Date();
const year = date.getFullYear();
const month =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
const today = `${year}.${month}.${day}`;

// push된 객체를 담는 array
const dailyArray = [
    {
        id: 0,
        moodEng: "happy",
        mood: "행복해요",
        date: today,
        title: "타이틀 영역입니다.",
        content: "컨텐츠 영역입니다.",
        img: `./img/happy.png`,
    },
    {
        id: 1,
        moodEng: "sad",
        mood: "슬퍼요",
        date: today,
        title: "타이틀 영역입니다.",
        content: "컨텐츠 영역입니다.",
        img: `./img/sad.png`,
    },
    {
        id: 2,
        moodEng: "surprise",
        mood: "놀랐어요",
        date: today,
        title: "타이틀 영역입니다.",
        content: "컨텐츠 영역입니다.",
        img: `./img/surprise.png`,
    },
    {
        id: 3,
        moodEng: "etc",
        mood: "기타",
        date: today,
        title: "타이틀 영역입니다.",
        content: "컨텐츠 영역입니다.",
        img: `./img/etc.png`,
    },
    {
        id: 4,
        moodEng: "angry",
        mood: "화나요",
        date: today,
        title: "타이틀 영역입니다.",
        content: "컨텐츠 영역입니다.",
        img: `./img/angry.png`,
    },
];

// map을 이용하여 미리 값을 할당할 수 있는 postObject
const postObject = idList.map((id) => ({
    id: 0,
    moodEng: id, // 기분 영어
    mood: "", // 기분 한글
    date: today, // 금일 날짜
    title: "", // post title
    content: "", // post content
    img: `./img/${id}.png`, // post img url
}));

function pushDaily() {
    const titleElement = document.getElementById("titleId");
    const contentElement = document.getElementById("contentId");

    // input 태그 내에 name="radio"인 것을 찾은 이후 checked 속성을 이용하여 checked 된 element
    const selectedRadioElement = document.querySelector(
        'input[name="radio"]:checked'
    );
    // html 구조를 보면 부모 태그 내에 input과 label로 이루어져 있음.
    // mood 즉 기분 한글을 뽑아오기 위해서 라디오된 형제 element 추출
    const selectedRadioSiblingElement = selectedRadioElement.nextElementSibling;

    // find를 이용하여 미리 만들어둔 postObejct와 현재 radio된 id가 같은 객체를 추출
    const resultObject = postObject.find(
        (post) => post.moodEng == selectedRadioElement.id
    );

    // 이후 mood, title, content, 고유의 key인 id 할당
    resultObject.mood = selectedRadioSiblingElement.innerText;
    resultObject.title = titleElement.value;
    resultObject.content = contentElement.value;
    resultObject.id = dailyArray.length;

    // 이후 부모 element를 추출해서 자식들 중 제일 뒤에 append
    const parentElement = document.getElementById("post");

    const postContainer = document.createElement("div");
    postContainer.className = "post-container";
    postContainer.innerHTML = `
        <img src="${resultObject.img}" alt="1" id=${resultObject.id} onclick="onClickDailyInfor(event)" />
        <div class="post-title">
            <div class="post-font-${resultObject.moodEng}">${resultObject.mood}</div>
            <div class="post-date">${resultObject.date}</div>
        </div>
        <div class="post-content">${resultObject.title}</div>
    `;

    parentElement.appendChild(postContainer);

    // 부모 element append 한 이후 dailyArray에 push
    dailyArray.push(resultObject);
}
