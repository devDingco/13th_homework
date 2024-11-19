'use client';

import { Divider, Modal } from 'antd';
import DaumPostcodeEmbed, { Address } from 'react-daum-postcode';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@apollo/client';
import {
	CreateTravelproductInput,
	UpdateTravelproductInput,
} from '@/commons/graphql/graphql';
import {
	CREATE_TRAVEL_PRODUCT,
	UPDATE_TRAVEL_PRODUCT,
} from '@/components/products-write/queries';

import Image from 'next/image';
import add_img from '@/assets/add_image.png';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(async () => await import('react-quill'), {
	ssr: false,
});

declare const window: Window & { kakao: any };

const travelProductSchema: z.ZodType<CreateTravelproductInput> = z.object({
	name: z.string().min(1, { message: '상품명을 입력해 주세요.' }),
	remarks: z.string().min(1, { message: '한줄 요약을 입력해 주세요' }),
	contents: z.string().min(1, { message: '상품 설명을 입력해 주세요' }),
	price: z.coerce.number().min(0, { message: '가격을 입력해 주세요' }),
	images: z.array(z.string()).optional(),
	tags: z.array(z.string()).optional(),
	travelproductAddress: z
		.object({
			address: z.string().optional(),
			addressDetail: z.string().optional(),
			lat: z.number().optional(),
			lng: z.number().optional(),
			zipcode: z.string().optional(),
		})
		.optional(),
});

export default function ProductWrite(props) {
	const router = useRouter();
	const params = useParams();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { register, handleSubmit, formState, reset, setValue, watch, trigger } =
		useForm<CreateTravelproductInput>({
			mode: 'onChange',
			resolver: zodResolver(travelProductSchema),
		});

	const address = watch('travelproductAddress.address');
	console.log('🚀 ~ ProductWrite ~ address:', address);

	// Modal 토글
	const onToggleZipcodeModal = () => setIsModalOpen((prev) => !prev);

	// Modal 완료 버튼 로직
	const onZipcodeModalComplete = (data: Address) => {
		console.log('🚀 ~ onZipcodeModalComplete ~ data:', data);
		setValue('travelproductAddress.zipcode', data.zonecode);
		setValue('travelproductAddress.address', data.address);
		onToggleZipcodeModal();
	};

	const onChangeContents = (value) => {
		console.log('🚀 ~ onChangeContents ~ value:', value);
		const sanitizedValue = value === '<p><br></p>' ? '' : value;
		setValue('contents', sanitizedValue);
		trigger('contents'); // 유효성 검사 실행
	};

	// Create
	const [createTravelproduct] = useMutation(CREATE_TRAVEL_PRODUCT);
	const onClickSubmit = async (data: CreateTravelproductInput) => {
		const result = await createTravelproduct({
			variables: {
				createTravelproductInput: {
					...data,
				},
			},
		});
		console.log('🚀 ~ onClickSubmit ~ result:', result);
	};

	// Update
	const [updateTravelproduct] = useMutation(UPDATE_TRAVEL_PRODUCT);
	const onClickUpdate = async (data: UpdateTravelproductInput) => {
		const result = await updateTravelproduct({
			variables: {
				updateTravelproductInput: {
					...data,
				},
				travelproductId: params.travelproductId,
			},
		});
		console.log('🚀 ~ onClickUpdate ~ result:', result);
		router.push(`/products/${params.travelproductId}`);
	};

	// 수정 시에 기존 데이터 불러오기
	useEffect(() => {
		if (props.data?.fetchTravelproduct) {
			reset(props.data?.fetchTravelproduct);
		}
	}, [props.data, reset]);

	// 카카오지도 API
	useEffect(() => {
		const script = document.createElement('script');
		script.src =
			'//dapi.kakao.com/v2/maps/sdk.js?appkey=eabb3c1ebe27ec04b62de93c0991906a&libraries=services&autoload=false';
		document.head.appendChild(script);

		script.onload = () => {
			window.kakao.maps.load(function () {
				if (address) {
					const container = document.getElementById('map');
					const options = {
						center: new window.kakao.maps.LatLng(33.450701, 126.570667),
						level: 3,
					};
					const map = new window.kakao.maps.Map(container, options);
					// 주소-좌표 변환 객체 생성
					const geocoder = new window.kakao.maps.services.Geocoder();

					geocoder.addressSearch(address, (result, status) => {
						if (status === window.kakao.maps.services.Status.OK) {
							const coords = new window.kakao.maps.LatLng(
								result[0].y,
								result[0].x,
							);

							// 결과값으로 받은 위치를 마커로 표시
							const marker = new window.kakao.maps.Marker({
								map: map,
								position: coords,
							});

							// 위도, 경도 값 설정
							setValue('travelproductAddress.lat', Number(result[0].y));
							setValue('travelproductAddress.lng', Number(result[0].x));

							// 지도 중심을 결과값으로 받은 위치로 이동
							map.setCenter(coords);
						}
					});
				}
			});
		};
	}, [address]); // address가 변경될 때마다 실행

	return (
		<div className="flex w-full max-w-7xl flex-col gap-10">
			<h1 className="text-xl font-bold text-black">숙박권 판매하기</h1>
			<form
				className="flex flex-col gap-10"
				onSubmit={handleSubmit(props.isEdit ? onClickUpdate : onClickSubmit)}
			>
				{/* 상품명 등록 */}
				<div className="flex flex-col gap-2">
					<label
						htmlFor="product_name"
						className="after:ml-1 after:text-red-500 after:content-['*']"
					>
						상품명
					</label>
					<input
						id="product_name"
						type="text"
						{...register('name')}
						className="rounded-lg border px-4 py-3"
						placeholder="상품명을 입력해 주세요."
					/>
					<div className="text-red-500">{formState.errors.name?.message}</div>
				</div>
				<Divider className="h-[.0625rem] bg-[#E4E4E4]" />

				{/* 한줄 요약 */}
				<div className="flex flex-col gap-2">
					<label
						htmlFor="product_summary"
						className="after:ml-1 after:text-red-500 after:content-['*']"
					>
						한줄 요약
					</label>
					<input
						id="product_summary"
						type="text"
						{...register('remarks')}
						className="rounded-lg border px-4 py-3"
						placeholder="상품을 한줄로 요약해 주세요."
					/>
					<div className="text-red-500">
						{formState.errors.remarks?.message}
					</div>
				</div>
				<Divider className="h-[.0625rem] bg-[#E4E4E4]" />

				{/* 상품 설명 */}
				<div className="flex flex-col gap-2">
					<label
						htmlFor="product_desc"
						className="after:ml-1 after:text-red-500 after:content-['*']"
					>
						상품 설명
					</label>
					<ReactQuill onChange={onChangeContents} className="h-96 rounded-lg" />
					<div className="text-red-500">
						{formState.errors.contents?.message}
					</div>
				</div>
				<Divider className="h-[.0625rem] bg-[#E4E4E4]" />

				{/* 판매 가격 */}
				<div className="flex flex-col gap-2">
					<label
						htmlFor="product_price"
						className="after:ml-1 after:text-red-500 after:content-['*']"
					>
						판매 가격
					</label>
					<input
						id="product_price"
						type="number"
						{...register('price')}
						className="rounded-lg border px-4 py-3"
						placeholder="판매 가격을 입력해 주세요. (원 단위)"
						onWheel={(event) => event.currentTarget.blur()}
					/>
					<div className="text-red-500">{formState.errors.price?.message}</div>
				</div>
				<Divider className="h-[.0625rem] bg-[#E4E4E4]" />

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
				<Divider className="h-[.0625rem] bg-[#E4E4E4]" />

				{/* 주소 입력 */}
				<div className="flex gap-10">
					<div className="flex w-[24.75rem] flex-col gap-10">
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
									{...register('travelproductAddress.zipcode')}
									readOnly
								/>
								<button
									type="button"
									className="rounded-lg border border-black px-4 py-3"
									onClick={onToggleZipcodeModal}
								>
									우편번호 검색
								</button>
								{isModalOpen && (
									<Modal
										open={isModalOpen}
										onOk={onToggleZipcodeModal}
										onCancel={onToggleZipcodeModal}
										okText="완료"
										cancelText="취소"
									>
										<DaumPostcodeEmbed onComplete={onZipcodeModalComplete} />
									</Modal>
								)}
							</div>
							<input
								type="text"
								className="w-full rounded-lg border px-4 py-3"
								placeholder="주소를 입력해 주세요."
								{...register('travelproductAddress.address')}
								readOnly
							/>
							<input
								type="text"
								className="w-full rounded-lg border px-4 py-3"
								placeholder="상세주소를 입력해 주세요"
								{...register('travelproductAddress.addressDetail')}
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
								{...register('travelproductAddress.lat')}
								readOnly
							/>
							<label htmlFor="product_LNG">경도(LNG)</label>
							<input
								type="text"
								disabled
								id="product_LNG"
								className="rounded-lg border px-4 py-3"
								placeholder="주소를 먼저 입력해 주세요."
								{...register('travelproductAddress.lng')}
								readOnly
							/>
						</div>
					</div>

					{/* 상세 위치 지도 */}
					<div className="flex flex-col gap-4">
						<div>상세 위치</div>
						<div id="map" className="h-[312px] w-[844px]">
							<Image
								src={'https://placehold.co/844x312'}
								alt="지도"
								width={844}
								height={312}
							/>
						</div>
					</div>
				</div>
				<Divider className="h-[.0625rem] bg-[#E4E4E4]" />

				{/* 사진 입력 */}
				<div className="flex flex-col gap-2">
					<div>사진 첨부</div>
					<Image src={add_img} alt="이미지추가" />
				</div>

				{/* 버튼부 */}
				<div className="flex justify-end gap-5">
					<button
						type="button"
						className="rounded-lg border border-black px-4 py-3"
						onClick={() => router.push('/products')}
					>
						취소
					</button>
					<button
						type="submit"
						className={`rounded-lg border px-4 py-3 ${props.isEdit ? 'bg-[#2974E5] text-white' : 'border-black'}`}
					>
						{props.isEdit ? '수정하기' : '등록하기'}
					</button>
				</div>
			</form>
		</div>
	);
}
