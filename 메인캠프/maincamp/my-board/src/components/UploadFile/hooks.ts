import { UploadFileDocument } from '@/commons/graphql/graphql';
import { useMutation } from '@apollo/client';
import { ChangeEvent, useRef, useEffect, useState } from 'react';
import { IUploadImage } from './types';
import { CheckValidationFile } from '@/commons/utils/fileValidationFunc';

export const useUploadFile = ({
  imageUrls, // 부모로부터 전달받은 이미지 배열 (자식에선 안되서 부모에서 지정)
  onUpdateImageUrls, // 부모 컴포넌트로 배열 업데이트 함수 전달
}: IUploadImage) => {
  const fileRef = useRef<(HTMLInputElement | null)[]>([]); // 여러 개의 input을 배열로 관리
  const [uploadFile] = useMutation(UploadFileDocument);
  const [localImageUrls, setLocalImageUrls] = useState<string[]>([]); // 로컬 이미지 상태 관리

  // 부모 컴포넌트에서 전달된 이미지와 동기화
  useEffect(() => {
    setLocalImageUrls(imageUrls); // 부모에서 받은 imageUrls를 로컬 상태로 설정
  }, [imageUrls]);

  // 이미지 업로드 처리
  const handleImage = async (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // 파일용량 막기
    const isValid = CheckValidationFile(selectedFile);
    if (!isValid) return;

    try {
      const result = await uploadFile({
        variables: { file: selectedFile },
      });
      const newImageUrl = result.data?.uploadFile.url;

      if (newImageUrl) {
        const updatedUrls = [...localImageUrls]; // 기존 배열 복사
        updatedUrls[index] = newImageUrl; // 선택한 인덱스의 이미지 URL을 변경
        setLocalImageUrls(updatedUrls); // 로컬 이미지 배열 갱신
        onUpdateImageUrls(updatedUrls); // 부모 컴포넌트에 배열 업데이트 전달
      }
    } catch (error) {
      console.error('이미지 업로드 오류:', error);
    }
  };

  const removeImage = (index: number) => {
    const updatedUrls = [...localImageUrls];
    updatedUrls[index] = ''; // 빈문자열로 변경
    setLocalImageUrls(updatedUrls); // 로컬 이미지 배열 갱신
    onUpdateImageUrls(updatedUrls); // 부모 컴포넌트에 배열 업데이트 전달
  };
  // ref로 이미지 클릭 (void 반환)
  const setFileInputRef = (el: HTMLInputElement | null, index: number) => {
    fileRef.current[index] = el; // ref 배열에 해당 index의 input 저장
  };

  const onClickImg = (index: number) => {
    fileRef.current[index]?.click(); // 해당 인덱스의 input 클릭
  };

  return {
    handleImage,
    onClickImg,
    setFileInputRef,
    localImageUrls, // 로컬 이미지 URL 반환
    removeImage,
  };
};
