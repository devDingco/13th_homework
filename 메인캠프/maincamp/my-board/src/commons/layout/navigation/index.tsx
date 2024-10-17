'use client';
import { useState } from 'react';
import {
  CaretDownOutlined,
  CaretUpOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Tabs, TabsProps } from 'antd';
import Image from 'next/image';

export default function MainNavigation() {
  const [isCaretUp, setIsCaretUp] = useState(false);

  const onChange = (key: string) => {
    console.log(key);
    // 나중에 여기서 그에 맞는 컴포넌트를 보여주면 되지 않을까??
  };

  // Caret 아이콘 토글 함수
  const toggleCaret = () => {
    setIsCaretUp((prev) => !prev);
  };

  // 나중에 해당 탭을 눌렀을때 알맹이 뿐만 아니라 주소까지 바뀌어야 하니까 그것도 고려해야함
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '트립 토크',
      // children: 'Content of Tab Pane 1',
    },
    {
      key: '2',
      label: '숙박권 구매',
      // children: 'Content of Tab Pane 2',
    },
    {
      key: '3',
      label: '마이 페이지',
      // children: 'Content of Tab Pane 3',
    },
  ];

  return (
    <div className="flex justify-between bg-slate-100 h-20 mx-auto layout">
      <div className="flex items-center gap-6">
        <Image src="/images/logo area.png" width={46} height={32} alt="로고" />
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </div>
      <div className="flex gap-4 items-center">
        <Avatar icon={<UserOutlined />} />
        {/* 클릭 시 아이콘이 변경되도록 토글 */}
        <span onClick={toggleCaret} className="cursor-pointer">
          {isCaretUp ? <CaretUpOutlined /> : <CaretDownOutlined />}
        </span>
      </div>
    </div>
  );
}
