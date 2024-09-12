const uploadPhoto = () => {
  fetch('https://dog.ceo/api/breeds/image/random/10')
    .then((result) => result.json())
    .then((finalResult) => {
      const photoList = finalResult.message;

      // 사진 목록에 각 스켈레톤 추가
      const photoContainer = document.getElementById('photoList');
      photoList.forEach(() => {
        const photoDiv = document.createElement('div');
        photoDiv.className = 'list';
        photoDiv.innerHTML = `
          <div class="skeleton-box">
            <div class="stick"></div>
          </div>
          <img class="photo" style="display:none;" />`;
        photoContainer.appendChild(photoDiv);
      });

      // 이미지 로드 후 스켈레톤을 교체
      const photos = document.querySelectorAll('.photo');
      // url은 photoList의 각 요소. 즉, finalResult.message
      photoList.forEach((url, index) => {
        // 새로 추가된 10개 이미지 중 index로 photo라는 클래스 이름을 가진 이미지 요소 선택
        const img = photos[photos.length - 10 + index];
        img.src = url;

        // 이미지가 로드되면 스켈레톤을 숨기고 이미지 표시

        setTimeout(() => {
          if (window.innerWidth <= 768) {
            img.style.width = '100vw';
            img.style.padding = '0 20px';
          } else {
            img.style.width = '440px';
          }

          img.style.display = 'block';
          img.style.borderRadius = '2rem';
          // 현재 요소의 직전 형제 요소를 의미 : 즉 스켈레톤
          img.previousElementSibling.style.display = 'none';
        }, 1000);
      });
    });
};

//무한스크롤에 스로툴링
let isFetching = false; // 중복 호출 방지
const throttleScroll = () => {
  if (isFetching) return;

  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  const scrollPercent = scrollTop / (scrollHeight - clientHeight);

  if (scrollPercent >= 0.9) {
    isFetching = true; // 호출 중 상태로 변경

    // 새로운 사진을 불러오고, 스로틀링 후 다시 호출 가능하도록 설정
    uploadPhoto();
    setTimeout(() => {
      isFetching = false; // 1초 후 다시 호출 가능
    }, 1000);
  }
};

// 스크롤 이벤트 리스너
window.addEventListener('scroll', throttleScroll);

// 초기 사진 로드
uploadPhoto();

const filteredPhoto = (e) => {
  const value = e.target.value;

  const imgList = document.querySelectorAll('.photo');
  const photoFilterItems = document.querySelectorAll('.photoFilter li');

  // 모든 li의 'selected' 클래스를 제거
  photoFilterItems.forEach((item) => {
    item.classList.remove('selected');
  });

  const selectedLabel = document.querySelector(
    `input[value="${value}"]`
  ).nextElementSibling;
  selectedLabel.parentElement.classList.add('selected');

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

  document.getElementById(
    'customFilter'
  ).style.cssText = `--inputValue : "${value}" `;
  document.getElementById('customFilter').click();
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
