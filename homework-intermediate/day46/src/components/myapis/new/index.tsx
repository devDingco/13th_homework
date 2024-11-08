'use client';

import Image from 'next/image';
import dogRobberMeme from '@/assets/dog_robber_meme.jpg';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { ChangeEvent, useState } from 'react';
import { storage } from '@/commons/libraries/firebase';
import { isValidFile } from '@/commons/libraries/isValidFile';

export default function MyApisNew(props) {
	console.log('MyApisNew 실행');

	const [file, setFile] = useState<File | null>(null); // 선택된 파일 상태
	const [error, setError] = useState<string>(''); // 에러 메시지 상태
	const [imageUrl, setImageUrl] = useState<string>(''); // 업로드 후 이미지 URL 상태

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		const selectedFile = e.target.files?.[0]; // 선택된 첫 번째 파일
		if (!selectedFile) {
			setError('파일을 선택해 주세요.');
			setFile(null); // 상태 초기화
			return;
		}
		if (!isValidFile(selectedFile)) {
			setFile(null); // 상태 초기화
			return;
		}

		setFile(selectedFile);
		setError(''); // 에러 초기화
	};

	const handleFileUpload = async () => {
		if (!file) return;

		const storageRef = ref(storage, `images/${file.name}`);
		try {
			await uploadBytes(storageRef, file); // 파일 업로드
			const url = await getDownloadURL(storageRef); // 업로드된 파일의 다운로드 URL 가져오기
			setImageUrl(url); // URL 상태 업데이트
		} catch (uploadError) {
			setError('파일 업로드 중 오류가 발생했습니다.'); // 에러 메시지 설정
		}
	};

	return (
		<div className="flex flex-col items-center gap-8 p-16">
			<Image
				className="max-w-lg rounded-lg object-cover"
				src={dogRobberMeme}
				alt="강아지강도짤"
			/>
			<input
				type="file"
				accept="image/png, image/jpeg, image/jpg"
				onChange={handleFileChange}
			/>
			<button
				className="border-1 w-16 rounded bg-blue-600 text-white"
				onClick={handleFileUpload}
			>
				업로드
			</button>
			{error && <p className="text-red-500">{error}</p>}
			{imageUrl && (
				<div>
					<h3>업로드된 이미지:</h3>
					<img
						src={imageUrl}
						alt="업로드된 이미지"
						style={{ maxWidth: '300px', maxHeight: '300px' }}
					/>
				</div>
			)}
		</div>
	);
}
