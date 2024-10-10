/** @format */
'use client';

import CommonButton from './CommonButton';
import { EButtonTitle } from '@/models/button.type';
import { IModalCommon } from '@/models/children.type';
import ModalForm from '../[boardId]/edit/_components/ModalForm';
import NewModalWrapper from '../new/_components/NewModalWrapper';
import useOnClickBack from '@/hooks/useOnClickBack';

export default function ModalContainer({ boardId, modal, address }: IModalCommon) {
	const onClickBack = useOnClickBack();
	// 오늘은 과제를 기한내로 제출하지 못할 거 같아서
	// 모달 같은 경우 추후 HOC를 공부한 이후에 적용할 예정
	// 오늘 일정이 너무 빡빡해서.. 구현만 먼저 하겠습니다.

	return (
		<div
			className="absolute left-0 top-0 flex h-screen w-screen items-center justify-center bg-black bg-opacity-30"
			onClick={() => !modal && onClickBack()}
		>
			<div
				className={`flex flex-col items-center gap-12 rounded-3xl bg-white p-12 shadow ${!modal && 'justify-between'}`}
				onClick={(event) => event.stopPropagation()}
			>
				{address ? (
					<NewModalWrapper />
				) : modal ? (
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
