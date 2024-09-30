/** @format */
'use client';
import { IModalProps } from '@/models/children';
import { useOnClickBack } from '@/utils/useOnClickBack';

export default function ModalPage({ searchParams }: IModalProps) {
	const onClickBack = useOnClickBack();
	return (
		<>
			{searchParams.modal && (
				<div
					className="absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-30 flex justify-center items-center"
					onClick={onClickBack}
				>
					<div
						className="w-1/3 h-1/3 bg-white rounded-3xl shadow flex flex-col p-8 justify-between"
						onClick={(event) => event.stopPropagation()}
					>
						<div className="prose-sb_18_24">{`게시글 ${searchParams.modal}을 삭제하시겠습니까?`}</div>
						<div className="flex items-center justify-center gap-4"></div>
					</div>
				</div>
			)}
		</>
	);
}
