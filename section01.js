window.onload = () => {
	// 1. 시작하면 일기 목록에 그리기
	showContents();
};

const showContents = () => {
	// 1. 스토리지에 저장된 일기목록 가져오기
	const savedList = window.localStorage.getItem("list") ?? "[]";
	const list = JSON.parse(savedList);

	// 2. 일기목록 화면에 새롭게 전체 그리기
	const newDiary = list
		.map(
			(el, index) => `
        <a href="./detail.html?number=${index}">
          <div class="moodWrapper__item">
              <div class="mood-thumbnail">
                ${
									el.mood === "happy"
										? '<img class="mood-image" src="./imgjoy.png" alt="happy" />'
										: ""
								}
                ${
									el.mood === "sad"
										? '<img class="mood-image" src="./imgsad.png" alt="sad" />'
										: ""
								}
                ${
									el.mood === "surprised"
										? '<img class="mood-image" src="./imgsurprised.png" alt="surprised" />'
										: ""
								}
                ${
									el.mood === "mad"
										? '<img class="mood-image" src="./imganger.png" alt="mad" />'
										: ""
								}
                ${
									el.mood === "etc"
										? '<img class="mood-image" src="./imgetc.png" alt="etc" />'
										: ""
								}
              </div>
              <div class="mood-feel">
                ${
									el.mood === "happy"
										? `<div class="detail-thumbnail happy">행복해요</div>`
										: ""
								}
                ${
									el.mood === "sad"
										? `<div class="detail-thumbnail sad">슬퍼요</div>`
										: ""
								}
                ${
									el.mood === "surprised"
										? `<div class="detail-thumbnail surprised">놀랐어요</div>`
										: ""
								}
                ${
									el.mood === "mad"
										? `<div class="detail-thumbnail mad">화나요</div>`
										: ""
								}
                ${
									el.mood === "etc"
										? `<div class="detail-thumbnail etc">기타</div>`
										: ""
								}
                <div class="mood-date">${el.date}</div>
              </div>
              <div class="mood-title"> ${el.title}</div>
          </div>
        </a>
  `
		)
		.join("");
	window.document.getElementById("wrapper__left__body").innerHTML = newDiary;
};

const list = [];

const write = () => {
	// 0. 현재 날짜 가져오기

	const date = new Date();

	const options = {
		year: date.getFullYear(),
		month: (date.getMonth() + 1).toString().padStart(2, "0"),
		date: date.getDate(),
	};

	// 1-1. 내가쓴 일기 불러오기
	const 날짜담는통 = options.year + "-" + options.month + "-" + options.date;
	const titleContainer = window.document.getElementById("diary-title").value;
	const contentContainer =
		window.document.getElementById("diary-content").value;
	let moodContainer;
	window.document.getElementsByName("feel").forEach((el) => {
		if (el.checked) moodContainer = el.value;
	});

	// 2. 일기목록에 일기 추가하기
	const diaryContainer = {
		title: titleContainer,
		내용: contentContainer,
		mood: moodContainer,
		date: 날짜담는통,
	};

	const savedList = window.localStorage.getItem("list") ?? "[]";
	const list = JSON.parse(savedList);
	list.push(diaryContainer);
	window.localStorage.setItem("list", JSON.stringify(list));

	showContents();
};

const get = (number) => {
	const diaryContainer = list[number];
	const titleContainer = diaryContainer.title;
	const contentContainer = diaryContainer.contents;

	alert(`
    title: ${titleContainer}
    내용: ${contentContainer}       
  `);

	location.href = `./detail.html?number=${number}`;
};

const filter = (event) => {
	const selected = event.target.value;

	const savedList = window.localStorage.getItem("list") ?? "[]";
	const list = JSON.parse(savedList);
	let filteredlist;

	switch (selected) {
		case "happy": {
			filteredlist = list.filter((el) => el.mood === "happy");
			break;
		}
		case "sad": {
			filteredlist = list.filter((el) => el.mood === "sad");
			break;
		}
		case "surprised": {
			filteredlist = list.filter((el) => el.mood === "surprised");
			break;
		}
		case "mad": {
			filteredlist = list.filter((el) => el.mood === "mad");
			break;
		}
		case "etc": {
			filteredlist = list.filter((el) => el.mood === "etc");
			break;
		}
		default: {
			filteredlist = list;
			break;
		}
	}

	const newDiary = filteredlist
		.map(
			(el, index) => `
        <a href="./detail.html?number=${index}">
          <div class="moodWrapper__item">
              <div class="mood-thumbnail">
                ${
									el.mood === "happy"
										? '<img class="mood-image" src="./img/joy.png" alt="happy" />'
										: ""
								}
                ${
									el.mood === "sad"
										? '<img class="mood-image" src="./img/sad.png" alt="sad" />'
										: ""
								}
                ${
									el.mood === "surprised"
										? '<img class="mood-image" src="./img/surprised.png" alt="surprised" />'
										: ""
								}
                ${
									el.mood === "mad"
										? '<img class="mood-image" src="./img/anger.png" alt="mad" />'
										: ""
								}
                ${
									el.mood === "etc"
										? '<img class="mood-image" src="./img/etc.png" alt="etc" />'
										: ""
								}
              </div>
              <div class="mood-feel">
                ${
									el.mood === "happy"
										? `<div class="detail-thumbnail happy">행복해요</div>`
										: ""
								}
                ${
									el.mood === "sad"
										? `<div class="detail-thumbnail sad">슬퍼요</div>`
										: ""
								}
                ${
									el.mood === "surprised"
										? `<div class="detail-thumbnail surprised">놀랐어요</div>`
										: ""
								}
                ${
									el.mood === "mad"
										? `<div class="detail-thumbnail mad">화나요</div>`
										: ""
								}
                ${
									el.mood === "etc"
										? `<div class="detail-thumbnail etc">기타</div>`
										: ""
								}
                <div class="mood-date">${el.date}</div>
              </div>
              <div class="mood-title"> ${el.title}</div>
          </div>
        </a>
      `
		)
		.join("");
	window.document.getElementById("wrapper__left__body").innerHTML = newDiary;
};
