
// 상세 페이지 데이터 가져와서 렌더링 함수
const detailDataGet = () => {

  const id = queryStringGet();
  // console.log(id);
  const diaryArr = JSON.parse(localStorage.getItem('diaryArray'));
  console.log(diaryArr);
  const diary = diaryArr.filter((diary, index) => diary.id === id)[0];
  console.log(diary);
  const title = document.querySelector('.detailTitle');
  const date = document.querySelector('.detailDate span');
  const content = document.querySelector('.detailContent');
  const moodTypeText = document.querySelector('.moodTypeText');
  const moodTypeImg = document.querySelector('.moodTypeImg');

  // console.log(moodTypeSet, diary.moodType);

  moodTypeText.setAttribute('style', `color: var(--font-color-${moodTypeSet[diary.moodType].colorNum}`);

  title.innerText = diary.title;
  date.innerText = diary.writeDate;
  content.innerHTML = diary.content;
  moodTypeText.innerText = diary.moodType;
  moodTypeImg.src = moodTypeSet[diary.moodType].imgSrcS;
}
detailDataGet();


// 수정 버튼 클릭 시 edit 페이지로 아이디값 포함하여 이동
const editBtn = () => {
  const pageId = queryStringGet();
  location.href = `./edit.html?diaryId=${pageId}`;
}


const textCopy = () => {
  const pageId = queryStringGet();
  const diaryContent = diaryArr.filter((diary, index) => diary.id === pageId)[0].content.replace(/<[^>]*>?/g, '');
  navigator.clipboard.writeText(diaryContent);
  alert('일기 내용이 복사되었습니다.');
}
