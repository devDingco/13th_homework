'use client';
import profile from '@/assets/profile.png';
import { CaretDownOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
const { Header } = Layout;

const items = [
	{
		label: <Link href={'/boards'}>트립토크</Link>,
		key: '트립토크',
	},
	{
		label: '숙박권 구매',
		key: '숙박권구매',
	},
	{
		label: '마이 페이지',
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
	return (
		<Header className="sticky top-0 z-10 flex w-full max-w-[1280px] items-center justify-between bg-white px-6">
			<div className="demo-logo">트립토크로고</div>
			<Menu
				className="flex-1 overflow-hidden border-none"
				theme="light"
				mode="horizontal"
				defaultSelectedKeys={['1']}
				items={items}
			/>
			<div className="flex items-center gap-2">
				<div>
					<Image src={profile} alt="프로필이미지" />
				</div>
				<div>
					<CaretDownOutlined />
				</div>
			</div>
		</Header>
	);
}
