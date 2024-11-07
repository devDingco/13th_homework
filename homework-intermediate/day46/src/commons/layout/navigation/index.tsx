'use client';

import { useAccessTokenStore } from '@/commons/stores/access-token-store';
import { CaretDownOutlined, RightOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import profile from '@/assets/profile.png';
import logo from '@/assets/logo.png';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const items = [
	{
		label: <Link href={'/boards'}>트립토크</Link>,
		key: '트립토크',
	},
	{
		label: <Link href={'/products'}>숙박권 구매</Link>,
		key: '숙박권구매',
	},
	{
		label: <Link href={'/mypage'}>마이페이지</Link>,
		key: '마이페이지',
	},
	{
		label: <Link href={'/openapis'}>오픈API 컨텐츠</Link>,
		key: '오픈API',
	},
	{
		label: <Link href={'/myapis'}>나만의API 컨텐츠</Link>,
		key: '나만의API',
	},
];

const DynamicMenu = dynamic(() => import('antd').then((mod) => mod.Menu), {
	ssr: false,
});

export default function Navigation() {
	const router = useRouter();
	const { accessToken } = useAccessTokenStore();

	const onClickLoginButton = () => router.push('/login');

	return (
		<div className="flex w-full max-w-7xl items-center justify-between bg-white p-4">
			<Image src={logo} alt="트립트립로고" width={52} height={32} />
			<DynamicMenu
				className="flex-1 border-none"
				mode="horizontal"
				defaultSelectedKeys={['1']}
				items={items}
				theme="light"
			/>
			{accessToken ? (
				<div className="flex items-center gap-2">
					<Image
						src={profile}
						alt="프로필이미지"
						className="h-8 w-8 rounded-full"
					/>
					<CaretDownOutlined />
				</div>
			) : (
				<button
					className="flex h-10 items-center justify-center gap-2 rounded-full bg-black px-4 py-2 text-white"
					onClick={onClickLoginButton}
				>
					로그인
					<RightOutlined />
				</button>
			)}
		</div>
	);
}
