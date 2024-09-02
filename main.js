const 일기목록 = [];

const JS_글쓰기기능 = () => {

  // 0. 날짜가져오기 기능
  const date = new Date();

  const options = {
    year: date.getFullYear(),
    month: (date.getMonth() + 1).toString().padStart(2, "0"),
    date: (date.getDate() + 1).toString().padStart(2, "0")
  }

  // 1-1. 사용자 입력값 가져오기
  const 날짜담긴곳 = `${options.year}-${options.month}-${options.date}`
  const 제목담긴곳 = document.getElementById("HTML_제목입력창").value
  const 내용담긴곳 = document.getElementById("HTML_내용입력창").value


  // 1-2. 오늘의 기분 불러오기
  let 행복해요클릭 = document.getElementsByName("HTML_기분선택버튼")[0].checked === true;
  let 슬퍼요클릭 = document.getElementsByName("HTML_기분선택버튼")[1].checked === true;
  let 놀랐어요클릭 = document.getElementsByName("HTML_기분선택버튼")[2].checked === true;
  let 화나요클릭 = document.getElementsByName("HTML_기분선택버튼")[3].checked === true;
  let 기타클릭 = document.getElementsByName("HTML_기분선택버튼")[4].checked === true;


  // 2. 일기 객체 생성 및 추가
  const 일기담는곳 = {
    제목: 제목담긴곳,
    내용: 내용담긴곳,
    날짜: 날짜담긴곳,
    기분: 행복해요클릭 ? '행복해요' :
    슬퍼요클릭 ? '슬퍼요' :
    놀랐어요클릭 ? '놀랐어요' :
    화나요클릭 ? '화나요' :
    기타클릭 ? '기타' : '기분을 선택하지 않음',
    기분이미지: 행복해요클릭 ? "./assets/joy.png" :
    슬퍼요클릭 ? './assets/sadness.png' :
    놀랐어요클릭 ? './assets/surprised.png' :
    화나요클릭 ? './assets/anger.png' :
    기타클릭 ? './assets/idontknownothing.png' : ''
  };
  console.log(일기담는곳) 


  일기목록.push(일기담는곳);
  localStorage.setItem('일기목록', JSON.stringify(일기목록));


  // 3. 마지막으로 추가한 일기번호 가져오기
  const 일기번호 = 일기목록.length - 1;

  // 4. 현재까지 그려진 일기도화지 가져오기
  const HTML_기존의일기도화지 =
  window.document.getElementById("HTML_일기보여주는곳").innerHTML;

  // 5. 새로운 일기도화지 만들기
  const HTML_새로운일기도화지 = `
    <div class="CSS_일기" onclick=JS_글보기기능(${일기번호})>
      <a href="./detailPage.html" onclick="storeDiaryData(${일기번호})"> 
      <div class="CSS_일기사진">
        ${
          행복해요클릭 === true 
            ? '<img class="CSS_기분이미지" src="./assets/joy.png" alt="행복" />' 
            : ""
        }
        ${
          슬퍼요클릭 === true 
            ? '<img class="CSS_기분이미지" src="./assets/sadness.png" alt="슬픔" />' 
            : ""
        }
        ${
          놀랐어요클릭 === true 
            ? '<img class="CSS_기분이미지" src="./assets/surprised.png" alt="놀람" />'
            : ""
        }
        ${
          화나요클릭 === true 
            ? '<img class="CSS_기분이미지" src="./assets/anger.png" alt="화남" />' 
            : ""
        }
        ${
          기타클릭 === true 
            ? '<img class="CSS_기분이미지" src="./assets/idontknownothing.png" alt="기타" />' 
            : ""
        }
      </div>
      <div class="CSS_일기내용">
        ${
          행복해요클릭 === true
          ? '<div class="CSS_기분 CSS_행복">행복해요</div>'
          : ""
        }
        ${
          슬퍼요클릭 === true
          ? '<div class="CSS_기분 CSS_슬픔">슬퍼요</div>'
          : ""
        }
        ${
          놀랐어요클릭 === true
          ? '<div class="CSS_기분 CSS_놀람">놀랐어요</div>'
          : ""
        }
        ${
          화나요클릭 === true
          ? '<div class="CSS_기분 CSS_화남">화나요</div>'
          : ""
        }
        ${
          기타클릭 === true
          ? '<div class="CSS_기분 CSS_기타">기타</div>'
          : ""
        }
        <div class="CSS_날짜">${날짜담긴곳}</div>
      </div>
      <div class="CSS_일기제목">${제목담긴곳}</div>
      </a>
    </div>
  `

  // 6. HTML_일기보여주는곳에 기존의 일기도화지에서 새로운 일기도화지 추가해주기
  document.getElementById("HTML_일기보여주는곳").innerHTML =
  HTML_기존의일기도화지 + HTML_새로운일기도화지
};

// 페이지 로드 시 저장된 일기 목록 불러오기
window.onload = () => {
  const 저장된일기목록 = localStorage.getItem('일기목록');

  if (저장된일기목록) {
    const 일기목록JSON = JSON.parse(저장된일기목록);

    // 불러온 일기들을 배열에 다시 담기
    일기목록JSON.forEach((일기, index) => {
      일기목록.push(일기);

// <div class="CSS_일기" onclick=JS_글보기기능(${index})>에서 온클릭빼고 밑에 a태그 넣음

      const HTML_새로운일기도화지 = `
        <div class="CSS_일기">
          <a href="./detailPage.html" onclick="storeDiaryData(${index})"> 
            <div class="CSS_일기사진">
              ${일기.기분 === '행복해요' ? '<img class="CSS_기분이미지" src="./assets/joy.png" alt="행복" />' : ""}
              ${일기.기분 === '슬퍼요' ? '<img class="CSS_기분이미지" src="./assets/sadness.png" alt="슬픔" />' : ""}
              ${일기.기분 === '놀랐어요' ? '<img class="CSS_기분이미지" src="./assets/surprised.png" alt="놀람" />' : ""}
              ${일기.기분 === '화나요' ? '<img class="CSS_기분이미지" src="./assets/anger.png" alt="화남" />' : ""}
              ${일기.기분 === '기타' ? '<img class="CSS_기분이미지" src="./assets/idontknownothing.png" alt="기타" />' : ""}
            </div>
            <div class="CSS_일기내용">
              ${일기.기분 === '행복해요' ? '<div class="CSS_기분 CSS_행복">행복해요</div>' : ""}
              ${일기.기분 === '슬퍼요' ? '<div class="CSS_기분 CSS_슬픔">슬퍼요</div>' : ""}
              ${일기.기분 === '놀랐어요' ? '<div class="CSS_기분 CSS_놀람">놀랐어요</div>' : ""}
              ${일기.기분 === '화나요' ? '<div class="CSS_기분 CSS_화남">화나요</div>' : ""}
              ${일기.기분 === '기타' ? '<div class="CSS_기분 CSS_기타">기타</div>' : ""}
              <div class="CSS_날짜">${일기.날짜}</div>
            </div>
            <div class="CSS_일기제목">${일기.제목}</div>
          </a>  
        </div>
      `;

      // 기존의 일기도화지에 새로운 일기도화지를 함께 보여주기
      document.getElementById("HTML_일기보여주는곳").innerHTML += HTML_새로운일기도화지;
    });
  }
}


// 상세 페이지로 이동할 때 현재 일기 데이터를 로컬 스토리지에 저장하는 함수
function storeDiaryData(일기번호) {
  // 로컬 스토리지에서 일기 목록 가져오기
  const 저장된일기목록 = localStorage.getItem('일기목록');
  if (저장된일기목록) {
    const 일기목록 = JSON.parse(저장된일기목록);
    const 일기 = 일기목록[일기번호];

    // 현재 일기 정보를 로컬 스토리지에 저장
    localStorage.setItem('currentDiary', JSON.stringify(일기));
  }
}

// 셀렉트 박스 값에 따른 필터링

document.addEventListener('DOMContentLoaded', () => {
  // 셀렉트 박스와 일기보여주는곳을 선택
  const diaryFilter = document.getElementById('diaryFilter');
  const diaryContainer = document.getElementById('HTML_일기보여주는곳');

  // 셀렉트 필터를 적용하는 함수
  function filterDiaries() {
    const selectedValue = diaryFilter.value;
    console.log("Selected Value:", selectedValue); // 선택된 값 확인

    // 로컬 스토리지에서 일기 목록 가져오기
    const 저장된일기목록 = localStorage.getItem('일기목록');
    if (저장된일기목록) {
      const 일기목록 = JSON.parse(저장된일기목록);

      // 선택된 기분에 따라 일기 필터링
      const filteredDiaries = selectedValue === 'all'
        ? 일기목록
        : 일기목록.filter(diary => diary.기분 === selectedValue);

        console.log("Filtered Diaries:", filteredDiaries); // 필터링된 일기 확인

      // 일기 카드를 다시 그리기
      diaryContainer.innerHTML = filteredDiaries.map((일기, index) => `
        <div class="CSS_일기">
          <a href="./detailPage.html" onclick="storeDiaryData(${index})"> 
            <div class="CSS_일기사진">
              ${일기.기분 === '행복해요' ? '<img class="CSS_기분이미지" src="./assets/joy.png" alt="행복" />' : ""}
              ${일기.기분 === '슬퍼요' ? '<img class="CSS_기분이미지" src="./assets/sadness.png" alt="슬픔" />' : ""}
              ${일기.기분 === '놀랐어요' ? '<img class="CSS_기분이미지" src="./assets/surprised.png" alt="놀람" />' : ""}
              ${일기.기분 === '화나요' ? '<img class="CSS_기분이미지" src="./assets/anger.png" alt="화남" />' : ""}
              ${일기.기분 === '기타' ? '<img class="CSS_기분이미지" src="./assets/idontknownothing.png" alt="기타" />' : ""}
            </div>
            <div class="CSS_일기내용">
              ${일기.기분 === '행복해요' ? '<div class="CSS_기분 CSS_행복">행복해요</div>' : ""}
              ${일기.기분 === '슬퍼요' ? '<div class="CSS_기분 CSS_슬픔">슬퍼요</div>' : ""}
              ${일기.기분 === '놀랐어요' ? '<div class="CSS_기분 CSS_놀람">놀랐어요</div>' : ""}
              ${일기.기분 === '화나요' ? '<div class="CSS_기분 CSS_화남">화나요</div>' : ""}
              ${일기.기분 === '기타' ? '<div class="CSS_기분 CSS_기타">기타</div>' : ""}
              <div class="CSS_날짜">${일기.날짜}</div>
            </div>
            <div class="CSS_일기제목">${일기.제목}</div>
          </a>  
        </div>
      `).join('');
    }

    // selectedValue: 셀렉트 박스에서 선택된 값을 가져옵니다. 이는 사용자가 필터링을 위해 선택한 기분 값입니다.
    // 로컬 스토리지에서 일기 목록 가져오기: localStorage.getItem('일기목록')을 통해 저장된 일기 목록을 가져오고, JSON으로 파싱합니다.
    // 일기 필터링: 선택된 기분 값(selectedValue)에 따라 일기 목록을 필터링합니다. 'all'이 선택된 경우, 모든 일기를 반환하고, 그렇지 않으면 기분이 일치하는 일기만 반환합니다.
    // 일기 카드 그리기: 필터링된 일기 목록을 map 함수를 사용하여 HTML 문자열로 변환합니다. innerHTML에 이 HTML을 추가하여 페이지에 일기 항목들을 표시합니다.

  }

  // 셀렉트 박스의 값이 변경될 때마다 필터 적용
  diaryFilter.addEventListener('change', filterDiaries);

  // 페이지 로드 시 필터링된 일기 표시
  filterDiaries();
});



// const JS_글보기기능 = (일기번호) => {
//   const 일기담는곳 = 일기목록[일기번호];
//   const 제목담는곳 = 일기담는곳.제목;
//   const 내용담는곳 = 일기담는곳.내용;
//   const 날짜담는곳 = 일기담는곳.날짜;
//   const 기분담는곳 = 일기담는곳.기분;
//   const 이미지담는곳 = 일기담는곳.기분이미지;

//   alert(`
//     제목: ${제목담는곳}
//     내용: ${내용담는곳}
//     날짜: ${날짜담는곳}
//     기분: ${기분담는곳}
//     이미지: ${이미지담는곳}   
//     `);

// }
