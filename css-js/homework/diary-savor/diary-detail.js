// 페이지 스크롤 기능
const commentArea = document.getElementById("diary-comment");

const scrollComment = () => {
  window.scrollBy({ commentArea, behavior: "smooth" });
};

window.onload = scrollComment;
