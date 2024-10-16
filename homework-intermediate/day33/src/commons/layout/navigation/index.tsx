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
    label: <Link href={'/openapis'}>나만의 컨텐츠</Link>,
    key: '나만의컨텐츠',
  },
];

export default function Navigation() {
  return (
    <Header className="w-full max-w-[1280px] flex justify-between bg-white sticky top-0 px-6 z-10">
      <div className="demo-logo">트립토크로고</div>
      <Menu
        className="flex-1"
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
