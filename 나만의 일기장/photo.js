window.onload = () => {
  uploadPhoto();
};

const uploadPhoto = () => {
  fetch('https://dog.ceo/api/breeds/image/random/10').then((result) => {
    result.json().then((finalResult) => {
      const photoList = finalResult.message;

      // 사진 목록에 각 스켈레톤 추가
      document.getElementById('photoList').innerHTML = photoList
        .map(
          () => `
          <div class="list">
          <!-- 스켈레톤 추가 -->
            <div class="skeleton-box">
              <div class = "stick"></div>
            </div> 
            <img class="photo" style="display:none;"/> 
          </div>`
        )
        .join('');

      // 이미지 로드 후 스켈레톤을 교체
      const photos = document.querySelectorAll('.photo');
      // url은 photoList의 각 요소. 즉, finalResult.message
      photoList.forEach((url, index) => {
        // index로 photo라는 클래스 이름을 가진 이미지 요소 선택
        const img = photos[index];
        img.src = url;

        // 이미지가 로드되면 스켈레톤을 숨기고 이미지 표시
        // 스켈레톤을 보여주기 위해 이미지 뜨는 시간 늘렸음
        setTimeout(() => {
          img.style.width = '440px';
          img.style.display = 'block';
          // 현재 요소의 직전 형제 요소를 의미 : 즉 스켈레톤
          img.previousElementSibling.style.display = 'none';
        }, 1900);
      });
    });
  });
};

const filteredPhoto = (e) => {
  const value = e.target.value;

  const imgList = document.querySelectorAll('.photo');

  if (value === '가로형') {
    imgList.forEach((img) => {
      img.style.aspectRatio = '4 / 3';
    });
  } else if (value === '세로형') {
    imgList.forEach((img) => {
      img.style.aspectRatio = '3 / 4';
    });
  } else if (value === '기본') {
    imgList.forEach((img) => {
      img.style.aspectRatio = '1 / 1';
    });
  }
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const disappearBtn = () => {
  const float = document.querySelector('.floating-btn');

  if (window.scrollY === 0) {
    float.style.display = 'none';
  } else {
    float.style.display = 'block';
  }
};
window.addEventListener('scroll', disappearBtn);
