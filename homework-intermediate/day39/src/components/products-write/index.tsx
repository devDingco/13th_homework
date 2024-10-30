'use client';

import { Divider } from 'antd';
import Image from 'next/image';
import add_img from '@/assets/add_image.png';

export default function ProductWrite(props) {
	return (
		<div className="flex w-full max-w-7xl flex-col gap-10">
			<h1 className="text-xl font-bold text-black">숙박권 판매하기</h1>
			<div className="flex flex-col gap-10">
				{/* 상품명 등록 */}
				<div className="flex flex-col gap-2">
					<label
						htmlFor="product_name"
						className="after:ml-1 after:text-red-500 after:content-['*']"
					>
						상품명
					</label>
					<input
						type="text"
						id="product_name"
						className="rounded-lg border px-4 py-3"
						placeholder="상품명을 입력해 주세요."
					/>
				</div>
				<Divider className="h-[1px] bg-[#E4E4E4]" />

				{/* 한줄 요약 */}
				<div className="flex flex-col gap-2">
					<label
						htmlFor="product_summary"
						className="after:ml-1 after:text-red-500 after:content-['*']"
					>
						한줄 요약
					</label>
					<input
						type="text"
						id="product_summary"
						className="rounded-lg border px-4 py-3"
						placeholder="상품을 한줄로 요약해 주세요."
					/>
				</div>
				<Divider className="h-[1px] bg-[#E4E4E4]" />

				{/* 상품 설명 */}
				<div className="flex flex-col gap-2">
					<label
						htmlFor="product_desc"
						className="after:ml-1 after:text-red-500 after:content-['*']"
					>
						상품 설명
					</label>
					<textarea
						id="product_desc"
						className="h-[477px] rounded-lg border px-4 py-3"
						placeholder="내용을 입력해 주세요."
					/>
				</div>
				<Divider className="h-[1px] bg-[#E4E4E4]" />

				{/* 판매 가격 */}
				<div className="flex flex-col gap-2">
					<label
						htmlFor="product_price"
						className="after:ml-1 after:text-red-500 after:content-['*']"
					>
						판매 가격
					</label>
					<input
						type="number"
						id="product_price"
						className="rounded-lg border px-4 py-3"
						placeholder="판매 가격을 입력해 주세요. (원 단위)"
					/>
				</div>
				<Divider className="h-[1px] bg-[#E4E4E4]" />

				{/* 태그 입력 */}
				<div className="flex flex-col gap-2">
					<label htmlFor="product_hashtag">태그 입력</label>
					<input
						type="text"
						id="product_hashtag"
						className="rounded-lg border px-4 py-3"
						placeholder="태그를 입력해 주세요."
					/>
				</div>
				<Divider className="h-[1px] bg-[#E4E4E4]" />

				{/* 주소 입력 */}
				<div className="flex gap-10">
					<div className="flex w-[396px] flex-col gap-10">
						{/* 우편번호 검색 */}
						<div className="flex flex-col gap-2">
							<label className="after:ml-1 after:text-red-500 after:content-['*']">
								주소
							</label>
							<div className="flex gap-4">
								<input
									type="text"
									className="rounded-lg border px-4 py-3"
									placeholder="01234"
									readOnly
								/>
								<button className="rounded-lg border border-black px-4 py-3">
									우편번호 검색
								</button>
							</div>
							<input
								type="text"
								className="w-full rounded-lg border px-4 py-3"
								placeholder="상세주소를 입력해 주세요"
							/>
						</div>
						{/* 위도 및 경도 */}
						<div className="flex flex-col gap-2">
							<label htmlFor="product_LAT">위도(LAT)</label>
							<input
								type="text"
								disabled
								id="product_LAT"
								className="rounded-lg border px-4 py-3"
								placeholder="주소를 먼저 입력해 주세요."
							/>
							<label htmlFor="product_LNG">경도(LNG)</label>
							<input
								type="text"
								disabled
								id="product_LNG"
								className="rounded-lg border px-4 py-3"
								placeholder="주소를 먼저 입력해 주세요."
							/>
						</div>
					</div>
					{/* 상세 위치 지도 */}
					<div className="flex flex-col gap-4">
						<div>상세 위치</div>
						<Image
							src={'https://placehold.co/844x312'}
							alt="지도"
							width={844}
							height={312}
						/>
					</div>
				</div>
				<Divider className="h-[1px] bg-[#E4E4E4]" />

				{/* 사진 입력 */}
				<div className="flex flex-col gap-2">
					<div>사진 첨부</div>
					<Image src={add_img} alt="이미지추가" />
				</div>

				{/* 버튼부 */}
				<div className="flex justify-end gap-5">
					<button className="rounded-lg border border-black px-4 py-3">
						취소
					</button>
					<button className="rounded-lg border border-black px-4 py-3">
						등록하기
					</button>
				</div>
			</div>
		</div>
	);
}
