'use client';

import { useMutation } from '@apollo/client';
import { useParams, useRouter } from 'next/navigation';

import { ChangeEvent, useState } from 'react';
import {
    CreateBoardDocument,
    UpdateBoardDocument,
} from '@/commons/graphql/graphql';

export const useBoardWrite = () => {
    const router = useRouter();
    const params = useParams();

    // const [writer, setwriter] = useState('');
    // const [password, setPassword] = useState('');
    // const [title, setTitle] = useState('');
    // const [contents, setContents] = useState('');
    const [youtube, setYoutube] = useState('');

    const [writerError, setwriterError] = useState('');
    const [passwordError, setPassworError] = useState('');
    const [titleError, setTitleError] = useState('');
    const [contentsError, setcontentsError] = useState('');

    const [isActive, setIsActive] = useState(false);
    const [address, setAddress] = useState('');
    const [zonecode, setZoncode] = useState('');
    const [detailAddress, setDetailAddress] = useState('');

    const [isOpen, setIsOpen] = useState(false);

    const [게시글생성함수] = useMutation(CreateBoardDocument);
    const [게시글수정함수] = useMutation(UpdateBoardDocument);

    const [inputs, setInputs] = useState({
        writer: '',
        title: '',
        password: '',
        contents: '',
        youtubeUrl: '',
    });

    const [inputError, setInputError] = useState({
        writerError: '',
        passwordError: '',
        titleError: '',
        contentsError: '',
    });

    const { writer, title, password, contents, youtubeUrl } = inputs;

    const onChangeInputs = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputs((prev) => ({
            ...prev, //...inputs
            [event.target.id]: event.target.value, // event.target.id자체로는 key값이 될 수 없음. 키에 []가들어가면 얘는 변수로 인식함.
        }));
        if (event.target.id === 'writer' && event.target.value.trim() === '') {
            setInputError((prev) => ({
                ...prev,
                writerError: '필수 입력사항입니다',
            }));
        } else {
            setInputError((prev) => ({
                ...prev,
                writerError: '',
            }));
            setIsActive(true);
        }

        if (event.target.id === 'title' && event.target.value.trim() === '') {
            setInputError((prev) => ({
                ...prev,
                titleErrorError: '필수 입력사항입니다',
            }));
        } else {
            setInputError((prev) => ({
                ...prev,
                titleErrorError: '',
            }));
            setIsActive(true);
        }

        if (
            event.target.id === 'contents' &&
            event.target.value.trim() === ''
        ) {
            setInputError((prev) => ({
                ...prev,
                contentsError: '필수 입력사항입니다',
            }));
        } else {
            setInputError((prev) => ({
                ...prev,
                contentsError: '',
            }));
            setIsActive(true);
        }
        if (
            event.target.id === 'password' &&
            event.target.value.trim() === ''
        ) {
            setInputError((prev) => ({
                ...prev,
                passwordError: '필수 입력사항입니다',
            }));
        } else {
            setInputError((prev) => ({
                ...prev,
                passwordError: '',
            }));
            setIsActive(true);
        }
    };

    const onChangeYouTubeUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
        setYoutube(event.target.value);
    };

    const onChangeDetailAddress = (event: ChangeEvent<HTMLInputElement>) => {
        setDetailAddress(event.target.value);
        console.log(detailAddress);
    };

    const onClickSubmit = async () => {
        try {
            const result = await 게시글생성함수({
                variables: {
                    createBoardInput: {
                        ...inputs,
                        boardAddress: {
                            zipcode: zonecode,
                            address: address,
                            addressDetail: detailAddress,
                        },
                        images: [''],
                    },
                },
            });
            console.log(result);

            if (writer && title && password && contents !== '') {
                alert('회원가입을 축하드려요');
                router.push(`/boards/${result?.data.createBoard._id}`);
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
            // 빈객체로 받고 if문으로 수정된 값 넣기
            updateBoardInput: {},
        };
        if (title) myvariables.updateBoardInput.title = title;
        if (contents) myvariables.updateBoardInput.contents = contents;
        if (youtubeUrl) myvariables.updateBoardInput.youtubeUrl = youtubeUrl;

        try {
            const result = await 게시글수정함수({
                variables: myvariables,
            });
            console.log('게시글수정함수 ::', result);
            if (result.errors) throw new Error('사용자 비밀번호 입력값 불일치');
            alert('수정이 완료 되었습니다');
            router.push('/boards');
        } catch (error) {
            alert('기존 비밀번호와 맞지않아요 ㅜㅜ');
            console.log('error');
        }
    };

    const onClickBack = () => {
        router.back();
    };

    const showModal = () => {
        setIsOpen(true);
    };

    const handleOk = () => {
        setIsOpen(false);
    };

    const handleCancel = () => {
        setIsOpen(false);
    };

    const handleComplete = (data: any) => {
        console.log(data);
        setAddress(data.address);
        setZoncode(data.zonecode);
        console.log(address);
        // console.log(data.address);
        // console.log(data.zonecode);
        setIsOpen(false); // 모달종료
    };

    return {
        youtube,
        setYoutube,
        detailAddress,
        setDetailAddress,
        zonecode,
        setZoncode,
        address,
        setAddress,
        isOpen,
        writerError,
        passwordError,
        titleError,
        contentsError,
        isActive,
        showModal,
        handleOk,
        handleCancel,
        handleComplete,
        onChangeInputs,
        onChangeYouTubeUrl,
        onChangeDetailAddress,
        onClickSubmit,
        onClickUpdate,
        onClickBack,
        setIsOpen,
    };
};
