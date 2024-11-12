import { useCreateBoardMutation } from '@/graphql/mutations/createBoard/createBoard.generated';
import { useUploadFileMutation } from '@/graphql/mutations/uploadFile/uploadFile.generated';
import {
  boardsManagerSchema,
  IBoardsManager,
} from '@/schemas/boardsManagerSchema';
import { ApolloError } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function useBoardsManager() {
  const router = useRouter();
  const [boardManager] = useCreateBoardMutation();
  const [uploadFile] = useUploadFileMutation();
  const [imageUrls, setImageUrls] = useState(['', '', '']);
  const [files, setFiles] = useState<File[]>([]);

  const methods = useForm<IBoardsManager>({
    resolver: zodResolver(boardsManagerSchema),
    mode: 'onChange',
  });

  //editor
  const onChangeContents = (textValue) => {
    methods.setValue('contents', textValue);
    methods.trigger('contents');
  };

  //uploadfile
  const onChangeFile = (index: number) => async (e) => {
    const selectedFile = e.target.files[0];

    const fileReader = new FileReader();
    fileReader.readAsDataURL(selectedFile);
    fileReader.onload = (e) => {
      if (typeof e.target?.result === 'string') {
        const tempUrls = [...imageUrls]; //얕은복사
        tempUrls[index] = e.target?.result; //미리보기 주소
        setImageUrls(tempUrls);

        const tempFiles = [...files];
        tempFiles[index] = selectedFile;
        setFiles(tempFiles);
      }
    };
  };

  //등록하기 함수
  const onChangeRegister = async (data) => {
    const { Modal } = await import('antd');
    const imgResults = await Promise.all(
      files.map((el) => uploadFile({ variables: { file: el } }))
    );
    const imgResultsUrls = imgResults.map((el) => el.data?.uploadFile.url);
    try {
      const result = await boardManager({
        variables: {
          createBoardInput: { ...data, images: imgResultsUrls },
        },
      });
      console.log('등록 후 내용', result);
      const boardId = result.data?.createBoard._id;
      Modal.success({
        title: '성공',
        content: '게시글이 등록되었습니다.',
        onOk: () => {
          router.push(`/boards/${boardId}`);
        },
      });
    } catch (error) {
      let errorMessage = '';
      if (error instanceof ApolloError && error.message) {
        errorMessage = error.message;
      }
      Modal.error({
        title: '실패',
        content: errorMessage,
      });
    }
  };

  return {
    onChangeContents,
    methods,
    onChangeRegister,
    onChangeFile,
    imageUrls,
  };
}
