import axios from "axios";
import { getCookie } from "cookies-next";


export const uploadImgSet = async (quillRef, ImageFormData, uploadImgData, setUploadImgData, imgSizeInfo) => {

  // !이미지 업로드 처리 및 url로 변경 처리
  const res = await axios({
    url: `${process.env.NEXT_PUBLIC_API_KEY}/api/images/upload`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${getCookie("accessToken")}`,
      ContentType: "multipart/form-data",
    },
    data: ImageFormData,
  }).then((res) => {
    return res.data;
  }).catch((err) => {
    console.log("res 에러", err);
  });

  console.log("이미지 업로드 처리 및 url로 변경 처리", res);

  const imgData = await res.data[0]
  const imgName = imgData.savedUri; //imgName.jpg
  const imgUrl = `${process.env.NEXT_PUBLIC_API_KEY}/api/images/${imgName}`;

  uploadImgData.push(imgName);
  setUploadImgData(uploadImgData);

  const editor = quillRef.current.getEditor();
  const range = editor.getSelection();
  const editorWidth = editor.root.offsetWidth - 30; // 30은 padding값

  console.log(imgSizeInfo, "imgSizeInfo");

  // editorWidth를 기준으로 imgSizeInfo.width 가 몇 %인지 계산
  let imgWidth = Math.ceil((imgSizeInfo.width / editorWidth) * 100);
  if (imgWidth > 100) { imgWidth = 100; }

  editor.insertEmbed(range.index, "image", {
    alt: imgName,
    src: imgUrl,
    style: `width:${imgWidth}%; height:auto;`,
  });

  editor.setSelection(range.index + 1);
  editor.focus();
}

// export const changeImgWidth = (quillRef, imgIndex, width) => {
//   // !모바일상에서 이미지 클릭시 사이즈 100%,50%,25% 변경가능하도록 설정필요
//   const quill = quillRef.current.getEditor();
//   const imgArr = quill.root.querySelectorAll("img");
//   const img = imgArr[imgIndex];
//   img.style.width = width + "%";
// }

// export const base64toFile = (base_data, filename) => {
//   var arr = base_data.split(','),
//     mime = arr[0].match(/:(.*?);/)[1],
//     bstr = atob(arr[1]),
//     n = bstr.length,
//     u8arr = new Uint8Array(n);
//   while (n--) {
//     u8arr[n] = bstr.charCodeAt(n);
//   }
//   return new File([u8arr], filename, { type: mime });
// }

// 랜덤한 숫자 생성
// export const randomNum = () => {
//   return Math.floor(Math.random() * 1000000000);
// }


export const ImageUpload = async (ImageFormData) => {
  // !이미지 업로드 처리 및 url로 변경 처리
  const res = await axios({
    url: `${process.env.NEXT_PUBLIC_API_KEY}/api/images/upload`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${getCookie("accessToken")}`,
      ContentType: "multipart/form-data",
    },
    data: ImageFormData,
  }).then((res) => {
    return res.data;
  }).catch((err) => {
    console.log("res 에러", err);
  });

  console.log("이미지 업로드 처리 및 url로 변경 처리", res);

  const imgData = await res.data[0]
  const imgName = imgData.savedUri; //imgName.jpg
  const imgUrl = `${process.env.NEXT_PUBLIC_API_KEY}/api/images/${imgName}`;
  return imgUrl;
}


export const keyDownEvent = (e, quillRef) => {
  // !ios에서 누른 경우에만 실행
  if (/iPhone/i.test(navigator.userAgent)) {
    if (e.key === "Enter" || e.keyCode === 13 || e.keyCode === 10) {
      console.log("키정보확인", e.key, e.keyCode)
      e.preventDefault();
      const editor = quillRef.current.getEditor();
      const range = editor.getSelection();
      editor.setSelection(range.index + 1, 0, 'silent');
    }
  }
}


// ! 업로드한 이미지 파일명 15자 이상이면 
// ! 업로드한 날짜로 이름을 변경하고 아니면 공백 제거하여 그대로 반환
export const getFileName = (targetFile) => {
  if (targetFile.name.replace(/ /g, "").length > 15) {
    var today = new Date();
    var year = today.getFullYear();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var day = ('0' + today.getDate()).slice(-2);
    return `${String(year).slice(2)}${month}${day}_.${targetFile.name.split('.').pop()}`;
  } else {
    return targetFile.name.replace(/ /g, "");
  }
}

// ! 업로드한 파일 이미지 사이즈 정보 (가로 세로 크기 구하기)
export const getImgSize = (targetFile) => {
  const imgSize = { width: "auto", height: "auto" }
  const reader = new FileReader();
  reader.readAsDataURL(targetFile);
  reader.onload = (e) => {
    const img = new Image();
    img.src = e.target.result;
    img.onload = () => {
      imgSize.width = img.width
      imgSize.height = img.height
    }
  }
  return imgSize
}



export const createSrcSet = (imageSrc) => {
  const createQueryString = (params) => {
    return Object.keys(params)
      .map((key) => `${key}=${params[key]}`)
      .join('&');
  }
  const viewport = ['400w', '700w', '1000w'];
  const widthParams = [{ w: '384' }, { w: '576' }, { w: '732' }];
  return widthParams.reduce(
    (prev, width, i) =>
      `${prev}/_next/image?${createQueryString({ url: imageSrc, ...width, q: '75' })} ${viewport[i]},`,
    '',
  );
}




export const getCustomImageBlot = (ImageBlot, readOnly, createSrcSet) => {

  class CustomImageBlot extends ImageBlot {
    static create(value) {
      const node = super.create(value);
      node.setAttribute("loading", "lazy");
      node.setAttribute("alt", value.alt);
      node.setAttribute("src", value.src);
      node.setAttribute("style", value.style);

      // node.setAttribute('width', node.width.toString());
      // node.setAttribute('height', node.height.toString());
      // node.setAttribute('width', parseInt(node.style.width, 10).toString());
      // node.setAttribute('height', parseInt(node.style.height, 10).toString());

      // node.style.width = value.clientWidth;
      node.setAttribute('srcset', createSrcSet(value.src));

      !readOnly &&
        node.addEventListener('load', () => {

          // node.setAttribute('width', value.width);
          // node.setAttribute('height', value.height);

          // const originWidth = node.clientWidth.toString();

          // 로드되면서 셋팅되는 값
          node.setAttribute('width', node.width.toString());
          node.setAttribute('height', node.height.toString());


          // node.setAttribute(
          //   'temp-width',
          //   !node.style.width || node.style.width === '100%'
          //     ? node.clientWidth.toString()
          //     : parseInt(node.style.width, 10).toString(),
          // );

          let timer;
          const observer = new MutationObserver((mutationsList) => {
            const resolvedRecord = mutationsList.find((mutation) => mutation.attributeName === 'resolved');
            if (resolvedRecord) {
              node.removeAttribute('resolved');
              return;
            }
            const mutationRecord = mutationsList.find(
              (mutation) =>
                mutation.type === 'attributes' &&
                (mutation.attributeName === 'style' || mutation.attributeName === 'width' || mutation.attributeName === 'height'),
            );
            if (mutationRecord) {

              const attributeWidth = node.getAttribute("width")
              // const attributeHeight = node.clientHeight;

              const editorWidth = document.querySelector('.ql-editor')?.offsetWidth - 30; // 30은 padding값

              let imgWidthPercent = Math.ceil((attributeWidth / editorWidth) * 100);
              if (imgWidthPercent > 100) { imgWidthPercent = 100; }

              const imgWidthPx = imgWidthPercent === 100 ? editorWidth : Math.ceil(editorWidth * (imgWidthPercent / 100));

              // let imgHeight = Math.ceil((attributeHeight / imgWidthPx) * 100) - 24; // 24은 padding값

              node.style.width = `${imgWidthPercent}%`;
              node.style.height = `auto`;

              clearTimeout(timer);
              timer = setTimeout(() => {

                node.setAttribute('resolved', '');
                node.setAttribute('style', mutationRecord.target.style.cssText);

                node.setAttribute('width', node.width.toString());
                node.setAttribute('height', node.height.toString());

                // node.setAttribute('width', parseInt(node.style.width, 10).toString());
                // node.setAttribute('height', parseInt(node.style.height, 10).toString());
              }, 200);
            }
          });
          observer.observe(node, { attributes: true });
        });

      return node;
    }

    static value(domNode) {
      return {
        loading: domNode.getAttribute("loading") || "lazy",
        alt: domNode.getAttribute("alt") || "",
        src: domNode.getAttribute("src") || "",
        style: domNode.getAttribute("style") || "",
        width: domNode.getAttribute('width') || '100%',
        height: domNode.getAttribute('height') || 'auto',
      };
    }
  }
  return CustomImageBlot;
};




