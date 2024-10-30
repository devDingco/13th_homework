'use client';
import profile from '@/assets/profile.png';
import { useAccessTokenStore } from '@/commons/stores/access-token-store';
import { CaretDownOutlined, RightOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assets/logo.png';
const { Header } = Layout;

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

export default function Navigation() {
	const { accessToken } = useAccessTokenStore();
	return (
		<Header className="sticky top-0 z-10 mb-10 flex w-full max-w-7xl items-center justify-between border-b-2 bg-white p-4 shadow-md">
			<Image src={logo} alt="트립트립로고" width={52} height={32} />
			<Menu
				className="flex-1"
				mode="horizontal"
				defaultSelectedKeys={['1']}
				items={items}
				theme="light"
				style={{ lineHeight: '64px' }} // 메뉴 아이템 높이를 맞추기 위해
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
				<button className="flex h-10 items-center justify-center gap-2 rounded-full bg-black px-4 py-2 text-white">
					로그인
					<RightOutlined />
				</button>
			)}
		</Header>
	);
}
