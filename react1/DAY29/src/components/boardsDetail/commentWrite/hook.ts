import { useAppContext } from '@/contexts/AppContext';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import {
    CreateBoardCommentDocument,
    FetchBoardCommentsDocument,
} from '@/commons/graphql/graphql';
import { AppState } from '@/reducers/appReducer';

export default function useCommentWrite() {
    const {
        boardId,
        writer,
        setWriter,
        password,
        setPassword,
        contents,
        setContents,
    } = useAppContext();
    const router = useRouter();

    const [star, setStar] = useState(0);
    const [errorAlert, setErrorAlert] = useState('');
    const [isActive, setIsActive] = useState<boolean>(false);

    const [createBoardComment] = useMutation(CreateBoardCommentDocument);

    const handleValidation = (): boolean => {
        if (!writer || !password || !contents) {
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
                const result = await createBoardComment({
                    variables: {
                        createBoardCommentInput: {
                            writer,
                            password,
                            contents,
                            rating: star,
                        },
                        boardId,
                    },
                    refetchQueries: [
                        {
                            query: FetchBoardCommentsDocument,
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
                case 'contents':
                    setContents(value);
                    break;
                default:
                    break;
            }

            handleValidation();
        };

    const resetForm = (): void => {
        setWriter('');
        setContents('');
        setPassword('');
        setIsActive(false);
    };

    return {
        writer,
        password,
        contents,
        handleSubmit,
        handleInputChange,
        resetForm,
        setStar,
        errorAlert,
        isActive,
        setWriter,
        setPassword,
        setContents,
        setIsActive,
    };
}
