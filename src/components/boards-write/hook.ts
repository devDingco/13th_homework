'use client';

import { useMutation } from '@apollo/client';
import { useParams, useRouter } from 'next/navigation';

import { ChangeEvent, useRef, useState } from 'react';
import {
    CreateBoardDocument,
    UpdateBoardDocument,
} from '@/commons/graphql/graphql';
import { checkValidtionFile } from '@/commons/libraries/image-upload-validation';
import { UPLOAD_FILE } from './queries';

export const useBoardWrite = () => {
    const router = useRouter();
    const params = useParams();

    const [writerError, setwriterError] = useState('');
    const [passwordError, setPassworError] = useState('');
    const [titleError, setTitleError] = useState('');
    const [contentsError, setcontentsError] = useState('');

    const [isActive, setIsActive] = useState(false);
    const [address, setAddress] = useState('');
    const [zonecode, setZoncode] = useState('');
    const [detailAddress, setDetailAddress] = useState('');

    const [isOpen, setIsOpen] = useState(false);

    const [imageUrl, setImageUrl] = useState('');
    const fileRef = useRef();
    const [isHovered, setIsHovered] = useState(false); // 호버 상태 관리

    const [게시글생성함수] = useMutation(CreateBoardDocument);
    const [게시글수정함수] = useMutation(UpdateBoardDocument);
    const [uploadFile] = useMutation(UPLOAD_FILE);

    const [inputs, setInputs] = useState({
        writer: '',
        title: '',
        password: '',
        contents: '',
        youtubeUrl: '',
        images: [''],
    });

    const { writer, title, password, contents, youtubeUrl, images } = inputs;

    const onChangeFile = async (event) => {
        const file = event.target.files[0];
        console.log(file);

        const isValid = checkValidtionFile(file);
        if (!isValid) return; // onChangeFile을 종료함

        const result = await uploadFile({
            variables: {
                // myfile: file,
                file, //shorhandproperties
            },
        });

        console.log(result.data?.uploadFile.url);
        setImageUrl(result.data?.uploadFile.url ?? '');
    };

    const onClickImage = () => {
        fileRef.current.click();
    };

    const onClickDeleteImage = () => {
        setImageUrl(''); // 이미지 URL 초기화
    };

    const onChangeWriter = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputs({
            ...inputs,
            [event.target.id]: event.target.value,
        });
        if (event.target.value === '') {
            setwriterError('필수입력 사항 입니다');
        } else {
            setwriterError('');
        }

        if (writer !== '' && password !== '' && contents !== '') {
            setIsActive(true);
        }
    };

    const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputs({
            ...inputs,
            [event.target.id]: event.target.value,
        });
        if (event.target.value === '') {
            setTitleError('필수입력 사항 입니다');
        } else {
            setTitleError('');
        }

        if (writer !== '' && password !== '' && contents !== '') {
            setIsActive(true);
        }
    };

    const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputs({
            ...inputs,
            [event.target.id]: event.target.value,
        });
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
        setInputs({
            ...inputs,
            [event.target.id]: event.target.value,
        });
        if (event.target.value === '') {
            setcontentsError('필수입력 사항 입니다');
        } else {
            setcontentsError('');
        }

        if (writer !== '' && password !== '' && contents !== '') {
            setIsActive(true);
        }
    };

    const onChangeYouTubeUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputs({
            ...inputs,
            [event.target.id]: event.target.value,
        });
    };

    const onChangeDetailAddress = (event: ChangeEvent<HTMLInputElement>) => {
        setDetailAddress(event.target.value);
        // console.log(detailAddress);
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
                        images: [imageUrl],
                    },
                },
            });

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
        if (images) myvariables.updateBoardInput.images = [imageUrl];
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
        imageUrl,
        setImageUrl,
        fileRef,
        onChangeFile,
        onClickImage,
        onClickDeleteImage,
        isHovered,
        setIsHovered,
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
        onChangeWriter,
        onChangeTitle,
        onChangePassword,
        onChangeContents,
        onChangeYouTubeUrl,
        onChangeDetailAddress,
        onClickSubmit,
        onClickUpdate,
        onClickBack,
        setIsOpen,
    };
};
