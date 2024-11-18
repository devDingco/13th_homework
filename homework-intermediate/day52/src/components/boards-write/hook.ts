import { useMutation } from '@apollo/client';
import { useParams, useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import {
	CreateBoardDocument,
	FetchBoardsDocument,
	UpdateBoardDocument,
	UpdateBoardMutationVariables,
	UploadFileDocument,
} from '@/commons/graphql/graphql';
import { Modal } from 'antd';
import { Address } from 'react-daum-postcode';
import { IBoardWriteProps } from '.';

const validateFeild = (
	field: string,
	setErrorMessage: (message: string) => void,
	message: string,
) => {
	if (field.trim() === '') {
		setErrorMessage(message);
		return false;
	} else {
		setErrorMessage('');
		return true;
	}
};

export default function useBoardWrite(props: IBoardWriteProps) {
	// 사용자 입력값을 위한 state
	const [inputs, setInputs] = useState({
		writer: props.data?.fetchBoard.writer || '',
		title: props.data?.fetchBoard.title || '',
		contents: props.data?.fetchBoard.contents || '',
	});
	const [password, setPassword] = useState('');
	const [isButtonDisabled, setIsButtonDisabled] = useState(
		!inputs.writer || !inputs.title || !inputs.contents || !password,
	);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [zipcode, setZipCode] = useState(
		props.data?.fetchBoard.boardAddress?.zipcode || '',
	);
	const [address, setAddress] = useState(
		props.data?.fetchBoard.boardAddress?.address || '',
	);
	const [detailedAddress, setDetailedAddress] = useState(
		props.data?.fetchBoard.boardAddress?.addressDetail || '',
	);
	const [youtubeUrl, setYoutubeUrl] = useState(
		props.data?.fetchBoard.youtubeUrl || '',
	);
	const [imageUrls, setImageUrls] = useState(
		props.data?.fetchBoard.images || ['', '', ''],
	);
	const [imageFiles, setImageFiles] = useState<File[]>([]);

	// 필수 입력값 검증을 위한 state
	const [nameError, setNameError] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [titleError, setTitleError] = useState('');
	const [contentError, setContentError] = useState('');

	const [createBoard] = useMutation(CreateBoardDocument);
	const [updateBoard] = useMutation(UpdateBoardDocument);
	const [uploadFile] = useMutation(UploadFileDocument);
	const router = useRouter();
	const params = useParams();

	// 사용자 입력값 탐지
	const onChangeInputs = (
		event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
	) => {
		const { id, value } = event.currentTarget;
		setInputs((_prev) => ({
			..._prev,
			[id]: value,
		}));
		setIsButtonDisabled(
			!inputs.writer || !inputs.title || !inputs.contents || !password,
		);
	};

	const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
		setPassword(event.currentTarget.value);
		setIsButtonDisabled(
			!inputs.writer || !inputs.title || !inputs.contents || !password,
		);
	};

	const onChangeYoutubeUrl = (event: ChangeEvent<HTMLInputElement>) => {
		setYoutubeUrl(event.currentTarget.value);
	};

	const onChangeDetailedAddress = (event: ChangeEvent<HTMLInputElement>) => {
		setDetailedAddress(event.currentTarget.value);
	};

	const onClickContent = () => {
		if (password) {
			setIsButtonDisabled(false);
			return;
		}
		const inputPassword = prompt('작성했을 때의 비밀번호를 입력해 주세요.');
		if (inputPassword) {
			setPassword(inputPassword); // 비동기.. password.. 값이 바로 다음 라인에 반영이 안된 것 같은데..
			setIsButtonDisabled(false);
		} else {
			Modal.error({
				content: `비밀번호를 반드시 입력해 주십쇼.`,
			});
		}
	};

	const onClickSubmit = async () => {
		const validName = validateFeild(
			inputs.writer,
			setNameError,
			'필수입력 사항입니다.',
		);
		const validPassword = validateFeild(
			password,
			setPasswordError,
			'필수입력 사항입니다.',
		);
		const validTittle = validateFeild(
			inputs.title,
			setTitleError,
			'필수입력 사항입니다.',
		);
		const valiContent = validateFeild(
			inputs.contents,
			setContentError,
			'필수입력 사항입니다.',
		);

		const hasError =
			!validName || !validPassword || !validTittle || !valiContent;

		const result = await Promise.all(
			imageFiles.map((file) => uploadFile({ variables: { file } })),
		);
		console.log('🚀 ~ onClickSubmit ~ result:', result);
		const resultUrls = result.map((res) => res.data?.uploadFile.url);
		console.log('🚀 ~ onClickSubmit ~ resultUrls:', resultUrls);

		if (!hasError) {
			const { data } = await createBoard({
				variables: {
					createBoardInput: {
						...inputs,
						password: password,
						youtubeUrl: youtubeUrl,
						boardAddress: {
							zipcode: zipcode,
							address: address,
							addressDetail: detailedAddress,
						},
						images: [
							...resultUrls,
							...new Array(3 - resultUrls.length).fill(''),
						],
					},
				},
				refetchQueries: [FetchBoardsDocument],
			});
			Modal.success({
				content: `게시글이 등록 되었습니다!`,
				onOk: () => router.push('/login'),
			});
			console.log('🚀 ~ onClickSubmit ~ data:', data);
			router.push(`/boards/${data?.createBoard._id}`);
		}
	};

	const onClickUpdate = async () => {
		const updateBoardVariables: UpdateBoardMutationVariables = {
			boardId: String(params.boardId),
			password: password,
			updateBoardInput: {},
		};
		if (inputs.title)
			updateBoardVariables.updateBoardInput.title = inputs.title;
		if (inputs.contents)
			updateBoardVariables.updateBoardInput.contents = inputs.contents;
		if (youtubeUrl)
			updateBoardVariables.updateBoardInput.youtubeUrl = youtubeUrl;
		if (imageUrls) updateBoardVariables.updateBoardInput.images = imageUrls;

		try {
			const result = await updateBoard({
				variables: updateBoardVariables,
			});
			if (result.errors) throw new Error('사용자 비밀번호 입력값 불일치');

			Modal.success({
				content: '수정이 완료되었습니다.',
			});
			router.push(`/boards/${props.data?.fetchBoard._id}`);
		} catch (error) {
			Modal.error({
				content: '비밀번호가 틀렸습니다.',
			});
		}
	};

	const onToggleZipcodeModal = () => {
		setIsModalOpen((_isModalOpen) => !_isModalOpen);
	};

	const onZipcodeModalComplete = (data: Address) => {
		setZipCode(data.zonecode);
		setAddress(data.address);
		onToggleZipcodeModal();
	};

	return {
		inputs,
		password,
		isButtonDisabled,
		zipcode,
		address,
		detailedAddress,
		youtubeUrl,
		imageUrls,
		isModalOpen,
		nameError,
		passwordError,
		titleError,
		contentError,
		setImageUrls,
		onChangeInputs,
		onChangePassword,
		onChangeYoutubeUrl,
		onChangeDetailedAddress,
		onClickContent,
		onClickSubmit,
		onClickUpdate,
		onToggleZipcodeModal,
		onZipcodeModalComplete,
		setImageFiles,
	};
}
