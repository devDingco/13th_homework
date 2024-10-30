import { useCallback } from "react";
import QuillImageDropAndPaste from 'quill-image-drop-and-paste'
import imageCompression from 'browser-image-compression';
import { badWordCheck } from '@/utils/badWordCheck';
import { getCookie } from "cookies-next";

export const useReactQuill = (props: IReactQuillProps) => {

  const uploadImgSet = async (quillRef, ImageFormData, uploadImgData, setUploadImgData, imgSizeInfo) => {

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


  const keyDownEvent = (e, quillRef) => {
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
  const getFileName = (targetFile) => {
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
  const getImgSize = (targetFile) => {
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






  //! 이미지 업로드 처리
  const imageCompressHandler = useCallback((file) => {

    const targetFile = file;
    const targetType = String(targetFile.type);
    const ImageFormData = new FormData();

    // ! 업로드한 이미지 가로 세로 사이즈 정보 가져오기
    const imgSizeInfo = getImgSize(targetFile)
    console.log("업로드한 이미지 사이즈", imgSizeInfo)

    // 파일명 공백제거 및 10글자 이상일 경우 이름을 올린 날짜로 변경
    const fileName = getFileName(targetFile);

    if (targetType !== "image/gif") {
      // ! 업로드 파일이 gif 파일이 아닌 경우
      imageCompression(targetFile, { maxSizeMB: 9, useWebWorker: true, fileType: targetType }).then((res) => {
        const compressFile = new File([res], fileName, { type: targetType })
        ImageFormData.append("fileList", compressFile)

        if (!badWordCheck(targetFile.name.replace(/ /g, ""))) {
          alert("파일 이름에 비속어가 포함되어 있어 업로드가 불가합니다.")
        } else {
          uploadImgSet(quillRef, ImageFormData, uploadImgData, setUploadImgData, imgSizeInfo); // 이미지 업로드 처리
        }
      }).catch((err) => {
        console.log("이미지 사이즈 compression 실패", err);
      })
    } else {
      // ! 업로드 파일이 gif 파일인 경우 9MB 이하만 업로드
      if (targetFile.size <= 9000000) {
        if (!badWordCheck(targetFile.name.replace(/ /g, ""))) {
          alert("파일 이름에 비속어가 포함되어 있어 업로드가 불가합니다.")
        } else {
          ImageFormData.append("fileList", targetFile)
          uploadImgSet(quillRef, ImageFormData, uploadImgData, setUploadImgData, imgSizeInfo); // 이미지 업로드 처리
        }
      } else {
        alert("gif 파일은 9MB 이하만 업로드 가능합니다.")
      }
    }
  }, [uploadImgData, setUploadImgData, quillRef]);

  //! 드래그앤 드롭 이미지 업로드 처리
  const imageDragAndDrop = useCallback((imageDataUrl, type, imageData) => {
    const file = imageData.toFile();
    imageCompressHandler(file)
  }, [imageCompressHandler]);

  // ! 파입 업로드형 이미지 업로드 처리
  const imageHandler = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("id", "file-image");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.style.display = "none";
    input.click();

    input.addEventListener("change", () => {
      const file = input.files[0];
      imageCompressHandler(file)
    });
  }, [imageCompressHandler]);

  // ! 유투브 업로드 
  const videoHandler = useCallback(() => {

    const getVideoUrl = (url) => {
      if (!url) return null;
      let match = url.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtube\.com\/watch.*v=([a-zA-Z0-9_-]+)/) ||
        url.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtu\.be\/([a-zA-Z0-9_-]+)/) ||
        url.match(/^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/);
      // console.log(match[2]);

      if (match && match[2] && match[2].length === 11) {
        return ('https') + '://www.youtube.com/embed/' + match[2] + '?showinfo=0';
      }
      if (match = url.match(/^(?:(https?):\/\/)?(?:www\.)?vimeo\.com\/(\d+)/)) { // eslint-disable-line no-cond-assign
        return (match[1] || 'https') + '://player.vimeo.com/video/' + match[2] + '/';
      }
      return null;
    }

    let url = prompt("유투브 영상 링크를 입력해주세요: ");
    url = getVideoUrl(url);

    if (url != null) {
      const editor = quillRef?.current.getEditor();
      const range = editor.getSelection();
      editor.insertEmbed(range.index, 'video', url);
      editor.setSelection(range.index + 1);
    }
  }, []);

  return {
    imageDragAndDrop,
    imageHandler,
    videoHandler
  }
}

