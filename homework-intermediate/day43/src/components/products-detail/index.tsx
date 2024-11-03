'use client';

import Image from 'next/image';
import { CiBookmark } from 'react-icons/ci';
import {
	DeleteOutlined,
	EnvironmentOutlined,
	LinkOutlined,
} from '@ant-design/icons';
import h from '@/assets/h.png';
import { Divider, Modal } from 'antd';
import { useParams } from 'next/navigation';
import { useMutation, useQuery } from '@apollo/client';
import {
	CreatePointTransactionOfBuyingAndSellingDocument,
	FetchTravelproductDocument,
	ToggleTravelproductPickDocument,
} from '@/commons/graphql/graphql';
import { useState } from 'react';
import ProductQuestion from './product-question';
import ProductQuestionList from './product-question-list';

export default function ProductDetail(props) {
	const params = useParams();
	const { data } = useQuery(FetchTravelproductDocument, {
		variables: { travelproductId: String(params.travelproductId) },
	});
	const [pickedCount, setPickedCount] = useState(
		data?.fetchTravelproduct.pickedCount || 0,
	);
	const [toggleTravelproductPick] = useMutation(
		ToggleTravelproductPickDocument,
		{
			variables: { travelproductId: String(params.travelproductId) },
		},
	);
	const [createPointTransactionOfBuyingAndSelling] = useMutation(
		CreatePointTransactionOfBuyingAndSellingDocument,
	);

	const onClickBookmark = async () => {
		if (!localStorage.getItem('accessToken')) {
			Modal.info({ content: '로그인 이후에 사용해 주세요.' });
			return;
		}
		const result = await toggleTravelproductPick({
			variables: { travelproductId: String(params.travelproductId) },
		});
		setPickedCount(result.data?.toggleTravelproductPick!);
	};

	const onClickPurchase = async () => {
		const result = await createPointTransactionOfBuyingAndSelling({
			variables: { useritemId: String(params.travelproductId) },
		});
	};

	return (
		<div className="flex max-w-7xl flex-col gap-10">
			<header className="flex h-24 w-full flex-col gap-2">
				<div className="flex justify-between">
					<h1 className="text-[28px] font-bold">
						{data?.fetchTravelproduct.name}
					</h1>
					<div className="flex items-center justify-center gap-4">
						<DeleteOutlined />
						<LinkOutlined />
						<EnvironmentOutlined />
						<button
							className="flex h-[32px] w-[53px] items-center justify-center gap-1 rounded-lg bg-black bg-opacity-40 text-white shadow-md shadow-black/25"
							onClick={onClickBookmark}
						>
							<CiBookmark className="text-[24px]" />
							{pickedCount}
						</button>
					</div>
				</div>
				<span className="font-medium text-[#777777]">
					{data?.fetchTravelproduct.remarks}
				</span>
				<div>
					<span className="font-medium text-[#2974E5]">#해시태그</span>
					<span className="font-medium text-[#2974E5]">#해시태그</span>
					<span className="font-medium text-[#2974E5]">#해시태그</span>
				</div>
			</header>
			<main className="flex gap-6">
				{/* 상품 관련 좌측 섹션 */}
				<section className="flex flex-col gap-10">
					<div className="flex h-[480px] w-full gap-6">
						<Image
							src={'https://placehold.co/640x480'}
							alt="640x480"
							width={640}
							height={480}
						/>
						<Image
							src={'https://placehold.co/180x480'}
							alt="180x480"
							width={180}
							height={480}
						/>
					</div>
					<Divider className="h-[1px] bg-[#D4D3D3]" />
					<div className="flex flex-col gap-4">
						<h2 className="text-xl font-bold text-black">상세 설명</h2>
						<article>{data?.fetchTravelproduct.contents}</article>
					</div>
					<Divider className="h-[1px] bg-[#D4D3D3]" />
					<div className="flex flex-col gap-4">
						<h2 className="text-xl font-bold text-black">상세 위치</h2>
						<Image
							src={'https://placehold.co/844x280'}
							alt="지도"
							width={844}
							height={280}
						/>
					</div>
				</section>
				{/* 판매자 관련 우측 섹션 */}
				<section className="flex flex-col gap-6">
					<div className="flex w-[412px] flex-col gap-5 rounded-lg border p-6">
						<div className="flex flex-col gap-2">
							<h1 className="text-2xl font-bold text-black">
								{data?.fetchTravelproduct.price?.toLocaleString()} 원
							</h1>
							<ul className="list-disc pl-5 text-sm text-[#5F5F5F]">
								<li>
									숙박권은 트립트립에서 포인트 충전 후 구매하실 수 있습니다.
								</li>
								<li>상세 설명에 숙박권 사용기한을 꼭 확인해 주세요.</li>
							</ul>
						</div>
						<button
							className="h-[52px] rounded-lg bg-[#2974E5] text-xl font-semibold text-white"
							onClick={onClickPurchase}
						>
							구매하기
						</button>
					</div>
					<div className="flex flex-col gap-3 rounded-lg bg-[#F2F2F2] p-6">
						<div className="font-bold text-black">판매자</div>
						<div className="flex items-center gap-2">
							<Image src={h} alt="판매자프로필" width={40} height={40} />
							<div>판매자 이름</div>
						</div>
					</div>
				</section>
			</main>
			<footer className="mb-10 flex flex-col gap-10">
				{/* 문의하기 영역 */}
				<ProductQuestion />
				{/* 문의 내역 디스플레이 영역 */}
				<ProductQuestionList />
			</footer>
		</div>
	);
}
