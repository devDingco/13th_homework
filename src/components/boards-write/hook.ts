'use client';

import { useMutation } from '@apollo/client';
import { useParams, useRouter } from 'next/navigation';

import { useState } from 'react';
import {
    CreateBoardDocument,
    UpdateBoardDocument,
} from '@/commons/graphql/graphql';

export const useBoardWrite = () => {
    const router = useRouter();
    const params = useParams();

    const [writer, setwriter] = useState('');
    const [password, setPassword] = useState('');
    const [title, setTitle] = useState();
    const [contents, setContents] = useState();

    const [writerError, setwriterError] = useState('');
    const [passwordError, setPassworError] = useState('');
    const [titleError, setTitleError] = useState('');
    const [contentsError, setcontentsError] = useState('');

    let [isActive, setIsActive] = useState(false);

    let onChangeWriter = (event: React.ChangeEvent<HTMLInputElement>) => {
        setwriter(event.target.value);
        if (event.target.value === '') {
            setwriterError('필수입력 사항 입니다');
        } else {
            setwriterError('');
        }

        if (
            writer !== '' &&
            password !== '' &&
            title !== '' &&
            contents !== ''
        ) {
            setIsActive(true);
        }
    };

    let onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
        if (event.target.value === '') {
            setPassworError('필수입력 사항 입니다');
        } else {
            setPassworError('');
        }

        if (
            writer !== '' &&
            password !== '' &&
            title !== '' &&
            contents !== ''
        ) {
            setIsActive(true);
        }
    };

    let onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);

        if (event.target.value === '') {
            setTitleError('필수입력 사항 입니다');
        } else {
            setTitleError('');
        }

        if (
            writer !== '' &&
            password !== '' &&
            title !== '' &&
            contents !== ''
        ) {
            setIsActive(true);
        }
    };

    let onChangecontens = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContents(event.target.value);
        if (event.target.value === '') {
            setcontentsError('필수입력 사항 입니다');
        } else {
            setcontentsError('');
        }
        if (
            writer !== '' &&
            password !== '' &&
            title !== '' &&
            contents !== event.target.value
        ) {
            setIsActive(true);
        }
    };

    const [나의함수] = useMutation(CreateBoardDocument);
    const [updateBoard] = useMutation(UpdateBoardDocument);

    let onClickSubmit = async () => {
        try {
            const result = await 나의함수({
                variables: {
                    createBoardInput: {
                        writer: writer,
                        password: password,
                        title: title,
                        contents: contents,
                        youtubeUrl: '',
                        boardAddress: {
                            zipcode: '',
                            address: '',
                            addressDetail: '',
                        },
                        images: [''],
                    },
                },
            });
            console.log(result);

            if (
                writer !== '' &&
                password !== '' &&
                title !== '' &&
                contents !== ''
            ) {
                alert('회원가입을 축하드려요');
                router.push(`/boards/${result.data.createBoard._id}`);
            } else {
                alert('필수항목을 입력해 주세요');
            }
        } catch (error) {
            alert(error);
        }
    };

    const onClickUpdate = async () => {
        const 입력받은비밀번호 = prompt('작성하셨던 비밀번호를 입력하세요');

        const myvariables = {
            boardId: String(params.boardId),
            password: 입력받은비밀번호,
            updateBoardInput: {},
        };
        if (title) myvariables.updateBoardInput.title = title;
        if (contents) myvariables.updateBoardInput.contents = contents;

        try {
            const result = await updateBoard({
                variables: myvariables,
            });
            console.log(result);
            if (result.errors) throw new Error('사용자 비밀번호 입력값 불일치');
            alert('수정이 완료 되었습니다');
            router.push('/boards');
        } catch (error) {
            alert('비밀번호가 틀렸어요 ㅜㅜ');
            console.log('error');
        }
    };

    const onClickBack = () => {
        router.back();
    };

    return {
        onChangeWriter,
        onChangePassword,
        onChangeTitle,
        onChangecontens,
        onClickSubmit,
        onClickUpdate,
        onClickBack,
        writerError,
        passwordError,
        titleError,
        contentsError,
        isActive,
    };
};
