/** @format */
'use client';

import CommonButton from './CommonButton';
import { EButtonTitle } from '@/models/button.type';
import { IModalCommon } from '@/models/children.type';
import ModalForm from '../[boardId]/edit/_components/ModalForm';
import useOnClickBack from '@/hooks/useOnClickBack';

export default function ModalContainer({ boardId, modal }: IModalCommon) {
	const onClickBack = useOnClickBack();

	return (
		<div
			className="absolute left-0 top-0 flex h-screen w-screen items-center justify-center bg-black bg-opacity-30"
			onClick={() => !modal && onClickBack()}
		>
			<div
				className={`flex h-1/3 w-1/3 flex-col items-center rounded-3xl bg-white py-12 shadow ${!modal && 'justify-between'}`}
				onClick={(event) => event.stopPropagation()}
			>
				{modal ? (
					<>
						<div className="prose-sb_18_24">{`게시글 ${boardId} 비밀번호를 입력해주세요`}</div>
						<ModalForm />
					</>
				) : (
					<>
						<div className="prose-sb_18_24">{`게시글 ${boardId}을 삭제하시겠습니까?`}</div>
						<div className="flex items-center justify-center gap-4">
							<CommonButton title={EButtonTitle.Back} />
							<CommonButton title={EButtonTitle.Delete} boardId={boardId} />
						</div>
					</>
				)}
			</div>
		</div>
	);
}
