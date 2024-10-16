import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';
import {
    CreateBoardDocument,
    UpdateBoardDocument,
} from '@/commons/graphql/graphql';
import { useAppContext } from '@/contexts/AppContext';
import { AppState } from '@/reducers/appReducer';
import { IBoardsNewProps } from '@/app/types/IBoardsNewProps';
import { FETCH_BOARD } from '@/commons/queries/fetchBoard';
import { useYoutube } from '../youtube/hook';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useBoardsNew = ({ isEdit }: IBoardsNewProps) => {
    const router = useRouter();

    const {
        writer,
        setWriter,
        password,
        setPassword,
        title,
        setTitle,
        contents,
        setContents,
        youtubeUrl,
        setYoutubeUrl,
        boardAddress,
        setBoardAddress,
        dispatch,
        boardId,
    } = useAppContext();

    const { selectedVideoId, handleVideoSelect } = useYoutube();

    const [updateBoard] = useMutation(UpdateBoardDocument);
    const [createBoard] = useMutation(CreateBoardDocument);

    const [errorAlert, setErrorAlert] = useState('');
    const [isActive, setIsActive] = useState<boolean>(false);

    const { data, loading } = useQuery(FETCH_BOARD, {
        variables: { boardId: boardId },
        skip: !isEdit || !boardId,
    });
    if (!boardId) {
        console.log('어디로 갔느냐 이것아');
    }
    useEffect(() => {
        if (data && data.fetchBoard) {
            setWriter(data.fetchBoard?.writer || '');
            setTitle(data.fetchBoard?.title || '');
            setContents(data.fetchBoard?.contents || '');
            setPassword('');
        }
    }, [data]);

    const handleValidation = (): boolean => {
        if (!writer || !password || !title || !contents) {
            setErrorAlert('필수등록 사항 입니다');
            setIsActive(false);
            return false;
        }
        setErrorAlert('');
        setIsActive(true);
        return true;
    };

    const handleInputChange =
        (field: keyof AppState) =>
        (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
            const { value } = e.target;

            switch (field) {
                case 'writer':
                    setWriter(value);
                    break;
                case 'password':
                    setPassword(value);
                    break;
                case 'title':
                    setTitle(value);
                    break;
                case 'contents':
                    setContents(value);
                    break;
                default:
                    break;
            }

            handleValidation();
        };

    const handleSubmit = async (): Promise<void> => {
        if (!boardId) {
            console.error('Board ID is invalid:', boardId);
            return;
        }

        if (handleValidation()) {
            try {
                const result = await createBoard({
                    variables: {
                        createBoardInput: {
                            writer,
                            title,
                            password,
                            contents,
                            youtubeUrl: selectedVideoId
                                ? `https://www.youtube.com/watch?v=${selectedVideoId}`
                                : null,
                            boardAddress: boardAddress.zipcode
                                ? boardAddress
                                : null,
                        },
                    },
                });

                if (result.errors) {
                    console.error('GraphQL Errors:', result.errors);
                    return;
                }

                const newBoardId = result.data?.createBoard?._id;

                if (!newBoardId) {
                    console.error('Board ID is undefined');
                    return;
                }

                history.pushState(null, '', `/details/${newBoardId}`);
                dispatch({
                    type: 'SET_BOARD_ID',
                    payload: newBoardId,
                });

                // if (result.data?.createBoard) {
                //   router.push(`/boards/${result.data.createBoard._id}`);
                //     dispatch({
                //         type: 'SET_BOARD_ID',
                //         payload: result.data.createBoard._id,
                //     });
                // }
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleUpdate = async () => {
        if (!boardId) {
            console.error('Board ID is invalid for update:', boardId);
            return; // Prevent update if boardId is not valid
        }

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
                            title,
                            contents,
                        },
                        password: inputPassword,
                        boardId,
                    },
                });
                if (result.data?.updateBoard) {
                    console.log('업데이트성공', result.data.updateBoard);
                    router.push(`/boards/${boardId}`);
                }
            } catch (error) {
                setErrorAlert('오류가 발생했어요');
                console.error('업데이트오류', error);
            }
        }
    };

    const resetForm = (): void => {
        setWriter('');
        setTitle('');
        setContents('');
        setPassword('');
        setYoutubeUrl('');
        setBoardAddress({ zipcode: '', address: '', addressDetail: '' });
        setIsActive(false);
    };

    return {
        writer,
        password,
        title,
        contents,
        youtubeUrl,
        handleVideoSelect,
        setYoutubeUrl,
        setBoardAddress,
        handleInputChange,
        handleUpdate,
        handleSubmit,
        resetForm,
        errorAlert,
        isActive,
        loading,
    };
};
