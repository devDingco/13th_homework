'use client';

import Image from 'next/image';
import logo from '@/assets/logo.png';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useAccessTokenStore } from '@/commons/stores/access-token-store';
import { useRouter } from 'next/navigation';

const LOGIN_USER = gql`
	mutation loginUser($email: String!, $password: String!) {
		loginUser(email: $email, password: $password) {
			accessToken
		}
	}
`;

export default function Login() {
	const router = useRouter();
	const { setAccessToken } = useAccessTokenStore();
	const [errorMessage, setErrorMessage] = useState('');
	const [inputs, setInputs] = useState({
		email: '',
		password: '',
	});

	const onChangeInputs = (event: ChangeEvent<HTMLInputElement>) => {
		const { id, value } = event.currentTarget;
		setInputs((old) => ({ ...old, [id]: value }));
		setErrorMessage('');
	};

	const [loginUser] = useMutation(LOGIN_USER);
	const onClickLogin = async () => {
		const hasEmptyField = Object.values(inputs).some((value) => !value.trim());
		if (hasEmptyField) {
			return setErrorMessage('아이디 또는 비밀번호를 확인해 주세요.');
		}

		const result = await loginUser({ variables: { ...inputs } });
		const accessToken = result.data.loginUser.accessToken;
		if (!accessToken) {
			alert('로그인을 다시 시도해주세요.');
			return;
		}
		setAccessToken(accessToken);
		localStorage.setItem('accessToken', accessToken);

		router.back();
	};

	const onClickSignUp = () => {
		router.push('/signup');
	};

	const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
		if (event.key === 'Enter') {
			onClickLogin();
		}
	};

	return (
		<div
			className="flex min-w-[400px] flex-col gap-6 px-5 pb-10 pt-[244px]"
			onKeyDown={onKeyDown}
		>
			<div className="flex flex-col items-center gap-6">
				<Image src={logo} alt="트립트립로고" width={120} height={80} />
				<h1 className="text-center text-lg font-bold">
					트립트립에 오신걸 환영합니다.
				</h1>
			</div>
			<div className="text-center">트립트립에 로그인 하세요.</div>
			<div className="flex flex-col items-center gap-4">
				<input
					type="text"
					id="email"
					className={`w-full rounded-lg border px-4 py-2 ${errorMessage && 'border-red-500'}`}
					placeholder="이메일을 입력해 주세요."
					defaultValue={inputs.email}
					onChange={onChangeInputs}
				/>
				<input
					type="password"
					id="password"
					className={`w-full rounded-lg border px-4 py-2 ${errorMessage && 'border-red-500'}`}
					placeholder="비밀번호를 입력해 주세요."
					defaultValue={inputs.password}
					onChange={onChangeInputs}
				/>
				{errorMessage && <span className="text-red-500">{errorMessage}</span>}
			</div>
			<div className="flex flex-col gap-6">
				<button
					className="w-full rounded-lg bg-[#2974E5] px-4 py-3 text-white"
					onClick={onClickLogin}
				>
					로그인
				</button>
				<button onClick={onClickSignUp}>회원가입</button>
			</div>
		</div>
	);
}
