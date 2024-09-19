// 메인 배너 이미지 데이터를 가져오는 함수
const pixelsImgDataGet = async () => {
  fetch("https://api.pexels.com/v1/search?query=자연&per_page=5&size=small&locale=ko-KR", {
    headers: {
      "Authorization": "vLDGUQeT2Rq4TxJMXrGqoDDynylYn8N8dig3oLFiCGY8Iw3IwgAWM63A",
    }
  }).then((res) => {
    return res.json()
  }).then((data) => {
    console.log(data);
    localStorage.setItem("pixelsImgData", JSON.stringify([data]));
  }).catch((error) => {
    console.log(error);
  })
}


// 로컬스토리지에 저장된 데이터를 가져오는 함수
const pixelsImgData = () => {
  const photoArr = JSON.parse(localStorage.getItem("pixelsImgData"))[0].photos;
  const photoSrcArr = photoArr.map((photo) => {
    return photo.src.original;
  })
  return photoSrcArr;
}


// 로컬스토리지에 저장된 데이터가 없을 경우에만 이미지 데이터를 가져옴
if (localStorage.getItem("pixelsImgData") === null) {
  pixelsImgDataGet();
}
