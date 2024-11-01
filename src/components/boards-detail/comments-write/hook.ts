'use client';

import { useState } from 'react';
import {
    FETCH_BOARD_COMMENTS,
    FETCH_BOARD_CREATE_COMMENT,
    UPDATE_BOARD_COMMENTS,
} from './quries';
import { useParams, useRouter } from 'next/navigation';
import { useMutation } from '@apollo/client';

export default function usehookCommentsWrite(props) {
    const { isEdit, commentData, finishEdit } = props;

    const [writer, setWriter] = useState('');
    const [password, setPassword] = useState('');
    const [contents, setContents] = useState('');
    const [writerError, setwriterError] = useState('');
    const [passwordError, setPassworError] = useState('');
    const [contentsError, setcontentsError] = useState('');
    const [isActive, setIsActive] = useState(false);
    const [value, setValue] = useState(3);
    const [댓글생성함수] = useMutation(FETCH_BOARD_CREATE_COMMENT);
    const [댓글수정함수] = useMutation(UPDATE_BOARD_COMMENTS);

    const router = useRouter();
    const params = useParams();

    const onClickCancle = () => {
        router.refresh();
    };

    const onClickUpdateComment = async () => {
        const 입력받은비밀번호 = prompt('작성하셨던 비밀번호를 입력하세요');
        const myvariables = {
            password: 입력받은비밀번호,
            boardCommentId: String(commentData._id),

            updateBoardCommentInput: {},
        };
        if (contents) myvariables.updateBoardCommentInput.contents = contents;

        try {
            const result = await 댓글수정함수({
                variables: myvariables,
                refetchQueries: [
                    {
                        query: FETCH_BOARD_COMMENTS,
                        variables: { boardId: String(params.boardId) },
                    },
                ],
            });
            console.log('댓글수정함수 ::', result);
            if (result.errors) throw new Error('사용자 비밀번호 입력값 불일치');
            alert('수정이 완료 되었습니다');
            if (finishEdit) {
                finishEdit(); // 수정 모드 종료
            }
        } catch (error) {
            alert('기존 비밀번호와 맞지않아요 ㅜㅜ');
            console.log('error');
        }
    };

    const onChangeWriter = (event: React.ChangeEvent<HTMLInputElement>) => {
        setWriter(event.target.value);
        if (event.target.value === '') {
            setwriterError('필수입력 사항 입니다');
        } else {
            setwriterError('');
        }

        if (writer !== '' && password !== '' && contents !== '') {
            setIsActive(true);
        }
    };

    const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
        if (event.target.value === '') {
            setPassworError('필수입력 사항 입니다');
        } else {
            setPassworError('');
        }

        if (writer !== '' && password !== '' && contents !== '') {
            setIsActive(true);
        }
    };

    const onChangeContents = (event: React.ChangeEvent<HTMLInputElement>) => {
        setContents(event.target.value);
        if (event.target.value === '') {
            setcontentsError('필수입력 사항 입니다');
        } else {
            setcontentsError('');
        }

        if (writer !== '' && password !== '' && contents !== '') {
            setIsActive(true);
        }
    };

    const onClickCommentButton = async (event: any) => {
        try {
            const result = await 댓글생성함수({
                variables: {
                    boardId: String(params.boardId),
                    createBoardCommentInput: {
                        writer: writer,
                        password: password,
                        contents: contents,
                        rating: 0,
                    },
                },
            });
            console.log('댓글생성함수 ::', result);
            if (result?.data.createBoardComment._id) {
                setWriter(''); // 작성자 초기화
                setPassword(''); // 비밀번호 초기화
                setContents(''); // 내용 초기화
                setValue(1);
                setIsActive(false); // 버튼 비활성화
                alert('댓글 등록이 완료 되었습니다!');
                router.refresh(); // 페이지 새로고침
            } else {
                alert('댓글 등록이 실패했는데요?!');
            }
        } catch (error) {
            console.log(error);
        }
    };
    return {
        writer,
        setWriter,
        password,
        setPassword,
        contents,
        setContents,
        writerError,
        setwriterError,
        passwordError,
        setPassworError,
        contentsError,
        setcontentsError,
        isActive,
        setIsActive,
        value,
        setValue,
        onClickCancle,
        onClickUpdateComment,
        onChangeWriter,
        onChangePassword,
        onChangeContents,
        onClickCommentButton,
    };
}
