'use client';

import Image from 'next/image';
import profile from '@/assets/profile.png';
import POINT from '@/assets/point.png';
import { RightOutlined, SearchOutlined } from '@ant-design/icons';
import { withLoginCheck } from '@/commons/hocs/with-login-check';
import { useQuery } from '@apollo/client';
import { FetchUserLoggedInDocument } from '@/commons/graphql/graphql';
import { useEffect, useState } from 'react';

function BoardsMypagePage() {
	const { data: userLoggedIn } = useQuery(FetchUserLoggedInDocument);
	const [point, setPoint] = useState(0);

	useEffect(() => {
		if (userLoggedIn?.fetchUserLoggedIn.userPoint?.amount)
			setPoint(userLoggedIn?.fetchUserLoggedIn.userPoint?.amount);
	}, [userLoggedIn?.fetchUserLoggedIn.userPoint?.amount]);

	return (
		<div className="flex w-full max-w-7xl flex-col gap-10">
			<h1 className="w-full text-[28px] font-bold">마이 페이지</h1>
			{/* user_info */}
			<div className="flex w-full flex-col gap-6 rounded-lg border p-6">
				{/* 타이틀 영역 */}
				<h1>내 정보</h1>
				{/* 프로필 영역 */}
				<div className="flex gap-1">
					<Image src={profile} alt="프로필" />
					<span>내 이름</span>
				</div>
				{/* 포인트 영역 */}
				<hr className="h-[1px] border-0 bg-[#E4E4E4]" />
				<div className="flex">
					<Image src={POINT} alt="포인트" />
					<span>{point.toLocaleString()}P</span>
				</div>
				<hr className="h-[1px] border-0 bg-[#E4E4E4]" />
				{/* 버튼 영역 */}
				<div className="flex flex-col gap-2">
					<button className="flex w-full items-center justify-between px-3 py-2">
						<div>거래내역&북마크</div>
						<RightOutlined />
					</button>
					<button className="flex w-full items-center justify-between px-3 py-2">
						<div>포인트 사용 내역</div>
						<RightOutlined />
					</button>
					<button className="flex w-full items-center justify-between px-3 py-2">
						<div>비밀번호 변경</div>
						<RightOutlined />
					</button>
				</div>
			</div>

			{/* 버튼 영역 상세 */}
			<div className="flex flex-col gap-6">
				{/* 상세 네비게이션 버튼 */}
				<div className="flex items-center gap-4">
					<button className="rounded-lg bg-black px-4 py-2 text-white">
						나의 상품
					</button>
					<button>북마크</button>
				</div>
				{/* 상세 내역 검색 */}
				<div className="flex justify-end gap-4">
					<div className="relative w-full max-w-lg">
						<SearchOutlined className="absolute left-3 top-1/2 -translate-y-1/2 transform" />
						<input
							className="h-10 w-full rounded-lg border bg-[#F2F2F2] pl-10 pr-4"
							type="text"
							name="search_myproduct"
							id="search_myproduct"
							placeholder="필요한 내용을 검색하세요."
						/>
					</div>
					<button className="rounded-lg bg-black px-4 py-2 text-white">
						나의 상품
					</button>
				</div>
				{/* 상세 내역 목록 */}
				<div className="flex w-full flex-col gap-2 rounded-2xl border px-12 py-6">
					{/* 상세 내역 목록 헤더 */}
					<div className="flex h-[52px] w-full max-w-[1184px] gap-2 px-6 py-4">
						<span className="w-[64px] text-center">번호</span>
						<span className="w-[848px]">상품명</span>
						<span className="w-[100px] text-center">판매가격</span>
						<span className="w-[100px] text-center">날짜</span>
					</div>
					{/* 상세 내역 목록 컨텐츠*/}
					<div className="flex h-[548px] w-full max-w-[1184px] flex-col"></div>
				</div>
			</div>
		</div>
	);
}

export default withLoginCheck(BoardsMypagePage);
