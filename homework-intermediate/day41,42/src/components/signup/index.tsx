'use client';

import Image from 'next/image';
import logo from '@/assets/logo.png';
import { ChangeEvent, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { Modal } from 'antd';

const CREATE_USER = gql`
	mutation createUser($createUserInput: CreateUserInput!) {
		createUser(createUserInput: $createUserInput) {
			_id
			createdAt
			updatedAt
		}
	}
`;

export default function SignUp() {
	const router = useRouter();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [errorMessage, setErrorMessage] = useState({
		emailError: '',
		nameError: '',
		passwordError: '',
		confirmPasswordError: '',
	});
	const [confirmPassword, setConfirmPassword] = useState('');
	const [inputs, setInputs] = useState({
		name: '',
		email: '',
		password: '',
	});

	const onChangeConfirmPassword = (event: ChangeEvent<HTMLInputElement>) => {
		setConfirmPassword(event.currentTarget.value);
	};

	const onChangeInputs = (event: ChangeEvent<HTMLInputElement>) => {
		const { id, value } = event.currentTarget;
		setInputs((old) => ({ ...old, [id]: value }));
	};

	const [createUser] = useMutation(CREATE_USER);
	const onClickSignUp = async () => {
		// 각 입력창들이 비어있으면 실패
		Object.entries(inputs).forEach(([key, value]) => {
			if (!value.trim()) {
				setErrorMessage((prev) => ({
					...prev,
					[key + 'Error']: `${key}를 입력해 주세요.`,
				}));
			}
		});
		if (!confirmPassword.trim()) {
			setErrorMessage((prev) => ({
				...prev,
				confirmPasswordError: '비밀번호를 입력해 주세요.',
			}));
			return;
		}

		// confirom 비밀번호와 비교 확인
		if (confirmPassword !== inputs.password) {
			alert('비밀번호가 일치하지 않습니다.');
			return;
		}

		// 모든 검증이 끝낫을 때, 정상적으로 회원가입 API 요청
		const result = await createUser({
			variables: {
				createUserInput: {
					...inputs,
				},
			},
		});
		console.log('🚀 ~ onClickSignUp ~ result:', result);
		setIsModalOpen(true);
		// router.push('/login');
	};

	const handleOk = () => {
		setIsModalOpen(false);
	};

	return (
		<div className="flex min-w-[400px] flex-col gap-6 px-5 pb-10 pt-[244px]">
			<div className="flex flex-col items-center gap-6">
				<h1 className="text-center text-lg font-bold">회원가입</h1>
				<div className="text-center">
					회원가입을 위해 아래 빈칸을 모두 채워주세요.
				</div>
			</div>
			<div className="flex flex-col gap-3">
				{/* 이메일 입력 영역 */}
				<div className="flex flex-col gap-2">
					<label
						htmlFor="email"
						className="after:ml-1 after:text-red-500 after:content-['*']"
					>
						이메일
					</label>
					<input
						type="text"
						id="email"
						className={`w-full rounded-lg border px-4 py-2 ${errorMessage.emailError && 'border-red-500'}`}
						placeholder="이메일을 입력해 주세요."
						defaultValue={inputs.email}
						onChange={onChangeInputs}
					/>
					{errorMessage.emailError && (
						<span className="text-red-500">{errorMessage.emailError}</span>
					)}
				</div>

				{/* 이름 입력 영역 */}
				<div className="flex flex-col gap-2">
					<label
						htmlFor="name"
						className="after:ml-1 after:text-red-500 after:content-['*']"
					>
						이름
					</label>
					<input
						type="text"
						id="name"
						className={`w-full rounded-lg border px-4 py-2 ${errorMessage.nameError && 'border-red-500'}`}
						placeholder="이름을 입력해 주세요."
						defaultValue={inputs.name}
						onChange={onChangeInputs}
					/>
					{errorMessage.nameError && (
						<span className="text-red-500">{errorMessage.nameError}</span>
					)}
				</div>

				{/* 비밀번호 입력 영역 */}
				<div className="flex flex-col gap-2">
					<label
						htmlFor="password"
						className="after:ml-1 after:text-red-500 after:content-['*']"
					>
						비밀번호
					</label>
					<input
						type="password"
						id="password"
						className={`w-full rounded-lg border px-4 py-2 ${errorMessage.passwordError && 'border-red-500'}`}
						placeholder="비밀번호를 입력해 주세요."
						defaultValue={inputs.password}
						onChange={onChangeInputs}
					/>
					{errorMessage.passwordError && (
						<span className="text-red-500">{errorMessage.passwordError}</span>
					)}
				</div>

				{/* 비밀번호 재확인 입력 영역 */}
				<div className="flex flex-col gap-2">
					<label
						htmlFor="confirm_password"
						className="after:ml-1 after:text-red-500 after:content-['*']"
					>
						비밀번호 확인
					</label>
					<input
						type="password"
						id="confirm_password"
						className={`w-full rounded-lg border px-4 py-2 ${errorMessage.confirmPasswordError && 'border-red-500'}`}
						placeholder="비밀번호를 한번 더 입력해 주세요."
						defaultValue={confirmPassword}
						onChange={onChangeConfirmPassword}
					/>
					{errorMessage.confirmPasswordError && (
						<span className="text-red-500">
							{errorMessage.confirmPasswordError}
						</span>
					)}
				</div>
			</div>
			<button
				className="w-full rounded-lg bg-[#2974E5] px-4 py-3 text-white"
				onClick={onClickSignUp}
			>
				회원가입
			</button>
			<Modal
				title="회원가입을 축하합니다."
				open={isModalOpen}
				onOk={handleOk}
				centered
			/>
		</div>
	);
}
