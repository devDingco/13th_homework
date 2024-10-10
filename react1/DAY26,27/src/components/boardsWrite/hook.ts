import { useMutation, useQuery } from '@apollo/client';
import { useParams, useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';

import { CREATE_BOARD } from '@/commons/queries/createBoard';
import { FETCH_BOARD } from '@/commons/queries/fetchBoard';
import { UPDATE_BOARD } from '@/commons/queries/updateBoard';
import { IBoardsNew } from '@/app/types/IBoardsNew';

export const useBoardsNew = ({
    isEdit,
    data,
}: {
    isEdit: boolean;
    data: any;
}): IBoardsNew => {
    const router = useRouter();
    const params = useParams();

    const [writer, setWriter] = useState('');
    const [password, setPassword] = useState('');
    const [title, setTitle] = useState(isEdit ? data.title : '');
    const [content, setContent] = useState(isEdit ? data.content : '');
    const [errorAlert, setErrorAlert] = useState('');
    const [isActive, setIsActive] = useState<boolean>(false);

    const [updateBoard] = useMutation(UPDATE_BOARD);
    const [createBoard] = useMutation(CREATE_BOARD);

    const { data: fetchedData, loading } = useQuery(FETCH_BOARD, {
        variables: { boardId: params.boardId },
        skip: !isEdit,
    });

    console.log(data);

    useEffect(() => {
        if (isEdit && fetchedData) {
            setWriter(fetchedData.fetchBoard.writer || '');
            setTitle(fetchedData.fetchBoard.title || '');
            setContent(fetchedData.fetchBoard.contents || '');
            setPassword('');
        }
    }, [fetchedData, isEdit]);

    const handleValidation = (): boolean => {
        if (!writer || !password || !title || !content) {
            setErrorAlert('필수등록 사항 입니다');
            setIsActive(false);
            return false;
        }
        setErrorAlert('');
        setIsActive(true);
        return true;
    };

    const handleSubmit = async (): Promise<void> => {
        if (handleValidation()) {
            try {
                const result = await createBoard({
                    variables: {
                        createBoardInput: {
                            writer: writer,
                            title: title,
                            password: password,
                            contents: content,
                        },
                    },
                });
                console.log(result);
                router.push(`/boards/${result.data.createBoard._id}`);
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleUpdate = async () => {
        if (handleValidation()) {
            try {
                const inputPassword = prompt('비밀번호를 입력하십쇼');
                if (!inputPassword || inputPassword.trim() === '') {
                    setErrorAlert('비밀번호는 필수입니다');
                    return;
                }
                const result = await updateBoard({
                    variables: {
                        updateBoardInput: {
                            title: title,
                            contents: content,
                        },
                        password: inputPassword,
                        boardId: params.boardId,
                    },
                });
                console.log('업데이트성공', result.data.updateBoard);
                router.push(`/boards/${params.boardId}`);
            } catch (error) {
                setErrorAlert('오류가 발생했어요');
                console.error('업데이트오류', error);
            }
        }
    };

    const handleReset = (): void => {
        setWriter('');
        setPassword('');
        setTitle('');
        setContent('');
        setIsActive(false);
    };

    const handleName = (e: ChangeEvent<HTMLInputElement>): void => {
        setWriter(e.target.value);
        handleValidation();
    };

    const handlePassword = (e: ChangeEvent<HTMLInputElement>): void => {
        setPassword(e.target.value);
        handleValidation();
    };

    const handleTitle = (e: ChangeEvent<HTMLInputElement>): void => {
        setTitle(e.target.value);
        handleValidation();
    };

    const handleContent = (e: ChangeEvent<HTMLTextAreaElement>): void => {
        setContent(e.target.value);
        handleValidation();
    };

    return {
        writer,
        password,
        title,
        content,
        handleName,
        handlePassword,
        handleTitle,
        handleContent,
        handleUpdate,
        handleSubmit,
        handleReset,
        errorAlert,
        isActive,
        loading,
    };
};
