import { Modal } from 'antd';

const CheckValidationFile = (selectedFile?: File) => {
  if (typeof selectedFile === 'undefined') {
    Modal.error({
      title: '오류',
      content: '선택된 파일이 없습니다.',
    });
    return;
  }

  if (selectedFile.size > 1024 * 1024 * 5) {
    Modal.warn({
      title: '경고',
      content: '5MB 이하의 파일만 업로드 가능합니다.',
    });
    return false;
  }
  return true;
};
export { CheckValidationFile };
