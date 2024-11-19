export const isValidFile = (file: File) => {
  if (file.size > 5 * 1024 * 1024) {
    alert('파일 사이즈가 5MB 미만의 이미지를 사용해주세요.');
    return false;
  }

  if (!['image/png', 'image/jpeg'].includes(file.type)) {
    alert('jpeg, jpg 및 png 파일만 업로드 가능합니다.');
    return false;
  }

  return true;
};
