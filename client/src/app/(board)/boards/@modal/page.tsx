/** @format */
'use client';
import { IModalProps } from '@/models/children';
import { useRouter } from 'next/navigation';

export default function ModalPage({ searchParams }: IModalProps) {
	const router = useRouter();
	const onClickBack = () => {
		router.back();
	};
	return (
		<>
			{searchParams.modal && (
				<div
					className="absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-30 flex justify-center items-center"
					onClick={onClickBack}
				>
					<div
						className="w-1/2 h-1/2 bg-white rounded-3xl shadow"
						onClick={(event) => event.stopPropagation()}
					></div>
				</div>
			)}
		</>
	);
}
