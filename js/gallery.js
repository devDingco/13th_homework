// 강아지 사진 api 호출
async function getDogImgData() {
  const res = await fetch('https://dog.ceo/api/breeds/image/random/10')
  const data = await res.json()
  const imgData = data.message;
  return imgData;
}
// 위 함수로 바로 호출시 promise 객체가 반환됨
// promise 객체를 then 메소드로 처리하거나 async await로 처리해야 
// 비동기 처리가 가능함

const dogImgArr = async () => {
  const imgData = await getDogImgData();
  return imgData;
}

// 강아지 사진 리스트 렌더링 함수
const galleryListRender = async () => {
  const imgArr = await dogImgArr();
  const galleryListWrap = document.querySelector('.galleryListWrap');
  const skeletonBox = `<div class="skeleton_loading"></div>`
  const galleryUl = document.createElement('ul');
  galleryListWrap.appendChild(galleryUl);
  galleryUl.innerHTML = imgArr.map(img => `<li>${skeletonBox}<img src="${img}" alt="dog"></li>`).join('')

  // 이미지 로딩 완료 후 스켈레톤 숨기기 함수
  const imgList = document.querySelectorAll('.galleryListWrap img');
  console.log(imgList);
  imgList.forEach(img => {
    img.addEventListener('load', () => {
      setTimeout(() => {
        img.previousElementSibling.classList.add('hide');
      }, 1000)
    })
  })

}
galleryListRender();

// 갤러리 필터 선택에 따른 노출 변경 처리 함수
const galleryFilter = (optionValue) => {
  const galleryListWrap = document.querySelector(".galleryListWrap")
  const valueList = { 기본형: 'ratio-1-1', 가로형: 'ratio-4-3', 세로형: 'ratio-3-4' }

  const removeClassArr = Object.keys(valueList).filter((key) => optionValue !== key).map((key) => valueList[key]);
  removeClassArr.forEach((key) => galleryListWrap.classList.remove(key))
  galleryListWrap.classList.add(valueList[optionValue])

}



