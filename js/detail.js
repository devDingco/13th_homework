console.log(queryStringGet());
// 상세 페이지 데이터 가져와서 렌더링 함수
const detailDataGet = () => {
  const id = queryStringGet();
  // console.log(diaryArr);
  const diary = diaryArr.find((diary, index) => index === id);
  // console.log(diary);
  const title = document.querySelector('.detailTitle');
  const date = document.querySelector('.detailDate span');
  const content = document.querySelector('.detailContent');
  const moodTypeText = document.querySelector('.moodTypeText');
  const moodTypeImg = document.querySelector('.moodTypeImg');

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
  const id = queryStringGet();
  location.href = `./edit.html?diaryId=${id}`;
}


const deleteBtn = () => {
  const id = queryStringGet();
  const prompt = confirm('정말 삭제하시겠습니까?');
  if (prompt) {
    diaryArr.splice(id, 1);
    localStorage.setItem('diaryArray', JSON.stringify(diaryArr));
    alert('삭제가 완료되었습니다.');
    location.href = './index.html';
  }
}