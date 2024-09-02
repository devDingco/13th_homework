window.onload = () => {
	// 1. 주소에서 number 가져오기
	const query = window.location.search;
	const param = new URLSearchParams(query);
	const number = param.get("number");

	// 2. 스토리지에 저장된 일기목록 가져오기
	const savedList = window.localStorage.getItem("민지의일기목록") ?? "[]";
	const list = JSON.parse(savedList);

	// 3. 일기목록에서 현재일기번호 가져오기
	const diaryContainer = list[number];

	let mood = diaryContainer.mood;
	let mention;
	switch (mood) {
		case "happy":
			mention = "행복해요";
			imgpath = "./imgjoy-emoji.png";
			moodColor = "#EA5757";
			break;
		case "sad":
			mention = "슬퍼요";
			imgpath = "./imgsad-emoji.png";
			moodColor = "#28B4E1";
			break;
		case "surprised":
			mention = "놀랐어요";
			imgpath = "./imgsurprised-emoji.png";
			moodColor = "#D59029";
			break;
		case "mad":
			mention = "화나요";
			imgpath = "./imganger-emoji.png";
			moodColor = "#777";
			break;
		default:
			mention = "etc";
			imgpath = "./imgetc-emoji.png";
			moodColor = "#A229ED";
			break;
	}

	// 4. 일기상세내용 화면에 그리기
	window.document.getElementById("detail-title").innerHTML =
		diaryContainer.title;
	window.document.getElementById("detail-mood").innerHTML = mention;
	window.document.getElementById("detail-mood").style.color = moodColor;
	window.document.getElementById("detail-conetent").innerHTML =
		diaryContainer.contents;
	window.document.getElementById("detail-mood-image").src = imgpath;
	window.document.getElementById("detail-mood-image").alt = mention;
	window.document.getElementById("detail-date").innerHTML = diaryContainer.date;
};

const modify = () => {
	// 1. 주소에서 number 가져오기
	const query = window.location.search;
	const param = new URLSearchParams(query);
	const number = param.get("number");

	// 2. 수정페이지로 이동하기
	window.location.href = `./edit.html?number=${number}`;
};
