window.onload = () => {
	// 1. 주소에서 number 가져오기
	const query = window.location.search;
	const param = new URLSearchParams(query);
	const number = param.get("number");

	// 2. 스토리지에 저장된 일기목록 가져오기
	const savedList = window.localStorage.getItem("list") ?? "[]";
	const list = JSON.parse(savedList);

	// 3. 일기목록에서 현재일기번호 가져오기
	const diaryContainer = list[number];

	// 4. 일기상세내용 화면에 그리기
	window.document.getElementById("edit-title").value = diaryContainer.title;
	window.document.getElementById("edit-content").value = diaryContainer.내용;
	window.document.getElementsByName("feel").forEach((el) => {
		if (el.value === diaryContainer.mood) el.checked = true;
	});
};

const save = () => {
	// 1. 주소에서 number 가져오기
	const query = window.location.search;
	const param = new URLSearchParams(query);
	const number = param.get("number");

	// 2. 스토리지에 저장된 일기목록 가져오기
	const savedList = window.localStorage.getItem("list") ?? "[]";
	const list = JSON.parse(savedList);

	// 3. 변경된 일기 새로운 통에 담기
	const editedTitle = window.document.getElementById("edit-title").value;
	const editedContent = window.document.getElementById("edit-content").value;
	let editedMood;
	window.document.getElementsByName("feel").forEach((el) => {
		if (el.checked) editedMood = el.value;
	});

	list[number] = {
		제목: editedTitle,
		내용: editedContent,
		mood: editedMood,
		date: list[number].date,
	};
	window.localStorage.setItem("list", JSON.stringify(list));

	// 4. 상세페이지로 돌아가기
	location.replace(`./detail.html?number=${number}`);
};

const cancel = () => {
	// 1. 주소에서 number 가져오기
	const query = window.location.search;
	const param = new URLSearchParams(query);
	const number = param.get("number");

	// 2. 상세페이지로 돌아가기
	window.location.replace(`./detail.html?number=${number}`);
};
