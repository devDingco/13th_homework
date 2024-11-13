'use client';

import Image from 'next/image';
import login_bg from '@/assets/login_background.png';
import Login from '@/components/login';

export default function LoginPage() {
	return (
		<div className="flex h-[1080px] w-full max-w-[1920px] border">
			<Login />
			<Image
				src={login_bg}
				alt="로그인배경이미지"
				className="w-full object-cover"
			/>
		</div>
	);
}
