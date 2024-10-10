import { CREATE_BOARD_COMMENT } from '@/commons/queries/createBoardComment';
import { FETCH_BOARD_COMMENTS } from '@/commons/queries/fetchBoardComments';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';

export default function useCommentWrite(boardId: string) {
    const router = useRouter();
    const [writer, setWriter] = useState('');
    const [password, setPassword] = useState('');
    const [content, setContent] = useState('');
    const [star, setStar] = useState(0);
    const [errorAlert, setErrorAlert] = useState('');
    const [isActive, setIsActive] = useState<boolean>(false);

    const [createBoardComment] = useMutation(CREATE_BOARD_COMMENT);

    const handleValidation = (): boolean => {
        if (!writer || !password || !content) {
            setErrorAlert('필수등록 사항 입니다');
            setIsActive(false);
            return false;
        }
        setErrorAlert('');
        setIsActive(true);
        return true;
    };
    const handleName = (e: ChangeEvent<HTMLInputElement>): void => {
        setWriter(e.target.value);
        handleValidation();
    };

    const handlePassword = (e: ChangeEvent<HTMLInputElement>): void => {
        setPassword(e.target.value);
        handleValidation();
    };

    const handleContent = (e: ChangeEvent<HTMLTextAreaElement>): void => {
        setContent(e.target.value);
        handleValidation();
    };

    const handleSubmit = async (): Promise<void> => {
        if (handleValidation()) {
            try {
                const result = await createBoardComment({
                    variables: {
                        createBoardCommentInput: {
                            writer,
                            password,
                            contents: content,
                            rating: star,
                        },
                        boardId,
                    },
                    refetchQueries: [
                        {
                            query: FETCH_BOARD_COMMENTS,
                            variables: {
                                boardId,
                            },
                        },
                    ],
                });
                console.log(result);
                router.push(`/boards/${boardId}`);
            } catch (error) {
                console.error(error);
            }
        }
    };

    return {
        handleName,
        handlePassword,
        handleContent,
        handleSubmit,
        writer,
        password,
        content,
        setStar,
        errorAlert,
        isActive,
    };
}
