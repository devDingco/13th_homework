// !댓글 데이터 불러오는 함수
const commentDataGet = () => {
  const pageId = queryStringGet();
  const commentArr = diaryArr.filter((diary) => diary.id === pageId)[0].comment;
  if (!commentArr) {
    // 해당하는 상세 페이지 데이터의 댓글이 없을 경우 댓글 키값 및 빈 배열 값을 추가
    const diaryArrAddComment = diaryArr.map((diary) => {
      if (diary.id === pageId) {
        diary.comment = [];
      }
      return diary;
    });
    // console.log(diaryArrAddComment);
    localStorage.setItem('diaryArray', JSON.stringify(diaryArrAddComment));
    return [];
  } else {
    return commentArr;
  }
}
commentDataGet()


// !댓글 데이터 등록 함수
const commentAdd = () => {
  const pageId = queryStringGet(); // 현재 페이지의 id값
  const commentArr = commentDataGet(); // 댓글 데이터 가져오기
  const commentInput = document.querySelector('#commentInput');

  if (commentInput.value === '') {
    alert('회고를 입력해주세요.');
    return;
  }

  const commentDate = new Date().toISOString().slice(0, 10).replace(/-/g, ".");
  commentArr.push({ commentId: commentArr.length + 1, writeData: commentDate, content: commentInput.value });
  const diaryArrAddComment = diaryArr.map((diary) => {
    if (diary.id === pageId) {
      diary.comment = commentArr;
    }
    return diary;
  });
  localStorage.setItem('diaryArray', JSON.stringify(diaryArrAddComment));
  commentRender();
  commentInput.value = '';
}

// !회고 엔터키 입력 시 댓글 등록 함수 호출
const commentAddEnter = (event) => {
  if (event.key === 'Enter') {
    const commentInput = document.querySelector('#commentInput');
    if (commentInput.value === '') {
      alert('회고를 입력해주세요.');
      return;
    }
    commentAdd();
    commentInput.value = '';
  }
}

// !댓글 렌더링 함수
const commentRender = () => {
  const commentList = document.querySelector('.commentList');
  commentList.innerHTML = '<ul></ul>';
  const commentArr = commentDataGet();
  if (commentArr.length === 0) {
    commentList.innerHTML = '<p class="empty">등록된 댓글이 없습니다.</p>';
    return;
  }
  commentArr.map((comment) => {
    const commentLi = document.createElement('li');
    commentLi.innerHTML = `${comment.content} <span class="commentDate">${comment.writeData}</span>`;
    commentList.querySelector('ul').appendChild(commentLi);
  })
}
commentRender();