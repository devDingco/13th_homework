// JavaScript code for managing diary entries

// Array to store diary entries
const diaryEntries = [];

// Function to handle diary submission
function addDiaryEntry() {
	// Get selected mood
	const selectedMood = document.querySelector('input[name="feel"]:checked');
	const mood = selectedMood ? selectedMood.nextElementSibling.textContent : "";

	// Get title and content
	const title = document.getElementById("title").value.trim();
	const content = document.getElementById("content").value.trim();

	// Check if all fields are filled
	if (!mood || !title || !content) {
		alert("모든 필드를 입력해주세요.");
		return;
	}

	// Get current date
	const date = new Date().toISOString().split("T")[0].replace(/-/g, ". ");

	// Create a new diary entry object
	const newDiaryEntry = {
		mood,
		date,
		title,
		content,
	};

	// Add the new entry to the diaryEntries array
	diaryEntries.push(newDiaryEntry);

	// Update the diary list in the UI
	appendDiaryEntry(newDiaryEntry);

	// Clear the form inputs
	clearForm();
}

// Function to append a new diary entry to the list
function appendDiaryEntry(entry) {
	const wrapperLeftBody = document.querySelector(".wrapper__left__body");

	// Determine the image path based on mood
	let moodColor;
	switch (entry.mood) {
		case "행복해요":
			moodColor = "happy";
			break;
		case "슬퍼요":
			moodColor = "sad";
			break;
		case "놀랐어요":
			moodColor = "surprise.";
			break;
		case "화나요":
			moodColor = "mad";
			break;
		case "기타":
			moodColor = "etc";
			break;
		default:
			moodColor = "etc"; // Fallback in case no mood is matched
			break;
	}
	// Determine the image path based on mood
	let moodImage;
	switch (entry.mood) {
		case "행복해요":
			moodImage = "./img/happy.png";
			break;
		case "슬퍼요":
			moodImage = "./img/sad.png";
			break;
		case "놀랐어요":
			moodImage = "./img/surprise.png";
			break;
		case "화나요":
			moodImage = "./img/angry.png";
			break;
		case "기타":
			moodImage = "./img/etc.png";
			break;
		default:
			moodImage = "./img/etc.png"; // Fallback in case no mood is matched
			break;
	}

	// Create a new div for the diary entry
	const diaryItem = document.createElement("div");
	diaryItem.classList.add("moodWrapper__item");
	diaryItem.onclick = () => showDiaryDetails(entry);

	// Set the inner HTML of the diary item
	diaryItem.innerHTML = `
        <img class="mood-thumbnail" src="${moodImage}" />
        <span class="mood-feel" id=${moodColor}>${entry.mood}</span>
        <span class="mood-date">${entry.date}</span>
        <div class="mood-title">${entry.title}</div>
    `;

	// Append the new diary entry to the wrapper
	wrapperLeftBody.appendChild(diaryItem);
}

// Function to show diary details
function showDiaryDetails(entry) {
	alert(
		`제목: ${entry.title}\n기분: ${entry.mood}\n날짜: ${entry.date}\n내용: ${entry.content}`
	);
}

// Function to clear the form inputs
function clearForm() {
	document.getElementById("title").value = "";
	document.getElementById("content").value = "";
	document
		.querySelectorAll('input[name="feel"]')
		.forEach((input) => (input.checked = false));
	checkFormCompletion(); // Update the button state
}

// Function to check if the form is complete
function checkFormCompletion() {
	const selectedMood = document.querySelector('input[name="feel"]:checked');
	const title = document.getElementById("title").value.trim();
	const content = document.getElementById("content").value.trim();
	const diarySubmitButton = document.querySelector(".diary-submit");

	// Enable or disable the submit button
	if (selectedMood && title && content) {
		diarySubmitButton.disabled = false;
	} else {
		diarySubmitButton.disabled = true;
	}
}

// Event listeners for diary submission button and input fields
const diarySubmitButton = document.querySelector(".diary-submit");
diarySubmitButton.addEventListener("click", addDiaryEntry);

// Add event listeners to input fields to check form completion
document.querySelectorAll('input[name="feel"]').forEach((input) => {
	input.addEventListener("change", checkFormCompletion);
});
document.getElementById("title").addEventListener("input", checkFormCompletion);
document
	.getElementById("content")
	.addEventListener("input", checkFormCompletion);

// Initial check to disable the submit button on page load
checkFormCompletion();
