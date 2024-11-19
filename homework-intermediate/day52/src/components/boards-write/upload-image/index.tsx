'use client';

import { isValidFile } from '@/commons/libraries/isValidFile';
import { gql } from '@apollo/client';
import Image from 'next/image';
import { ChangeEvent, MouseEvent, useRef } from 'react';
import ADD_IMG from '@/assets/add_image.png';
import { DeleteOutlined } from '@ant-design/icons';

export const UPLOAD_FILE = gql`
	mutation uploadFile($file: Upload!) {
		uploadFile(file: $file) {
			url
		}
	}
`;

type UploadImageProps = {
	idx: number;
	imageUrl: string;
	setImageUrls: Function;
	setImageFiles: Function;
};

export default function UploadImage(props: UploadImageProps) {
	const { idx, imageUrl, setImageUrls, setImageFiles } = props;
	const fileRef = useRef<HTMLInputElement>(null);

	const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.currentTarget.files?.[0];
		if (!file) return;
		if (!isValidFile(file)) return;

		// FileReader를 사용하여 미리보기 생성
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = (event) => {
			if (typeof event.target?.result === 'string') {
				// 미리보기 URL 설정
				setImageUrls((prev: string[]) => {
					const newUrls = [...prev];
					newUrls[idx] = event.target?.result as string;
					return newUrls;
				});

				// 실제 File 객체 저장
				setImageFiles((prev: (File | null)[]) => {
					const newFiles = [...prev];
					newFiles[idx] = file;
					return newFiles;
				});
			}
		};
	};

	const onClickImage = () => {
		fileRef.current?.click();
	};

	const onClickDeleteImage = () => {
		// 미리보기 URL 제거
		setImageUrls((prev: string[]) => {
			const newUrls = [...prev];
			newUrls[idx] = '';
			return newUrls;
		});

		// File 객체 제거
		setImageFiles((prev: (File | null)[]) => {
			const newFiles = [...prev];
			newFiles[idx] = null;
			return newFiles;
		});

		// input 초기화
		if (fileRef.current) fileRef.current.value = '';
	};

	return (
		<div className="relative inline-block">
			{imageUrl ? (
				<div className="group relative">
					<img
						src={
							imageUrl.includes('storage.googleapis.com')
								? `https://storage.googleapis.com/${imageUrl}`
								: imageUrl
						}
						alt="등록된이미지"
						className="h-40 w-40 cursor-pointer rounded-lg object-cover"
						onClick={onClickImage}
					/>
					<button
						className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 p-1 text-black opacity-0 shadow-lg transition-opacity group-hover:opacity-100 hover:bg-red-500 hover:text-white"
						onClick={onClickDeleteImage}
					>
						<DeleteOutlined className="text-base" />
					</button>
				</div>
			) : (
				<div
					onClick={onClickImage}
					className="flex h-40 w-40 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400"
				>
					<Image src={ADD_IMG} alt="이미지추가" />
				</div>
			)}
			<input
				type="file"
				ref={fileRef}
				onChange={onChangeFile}
				className="hidden"
				accept="image/jpeg, image/png"
			/>
		</div>
	);
}
