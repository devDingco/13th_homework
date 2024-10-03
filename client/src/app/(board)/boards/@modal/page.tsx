/** @format */
'use client';

import CommonButton from '../_components/CommonButton';
import { EButtonTitle } from '@/models/button.type';
import { IModalProps } from '@/models/children.type';
import useOnClickBack from '@/hooks/useOnClickBack';

export default function ModalPage(props) {
	const onClickBack = useOnClickBack();

	return (
		<>
			{props.searchParams.modal && (
				<div
					className="absolute left-0 top-0 flex h-screen w-screen items-center justify-center bg-black bg-opacity-30"
					onClick={onClickBack}
				>
					<div
						className="flex h-1/3 w-1/3 flex-col items-center justify-between rounded-3xl bg-white py-12 shadow"
						onClick={(event) => event.stopPropagation()}
					>
						<div className="prose-sb_18_24">{`게시글 ${props.searchParams.modal}을 삭제하시겠습니까?`}</div>
						<div className="flex items-center justify-center gap-4">
							<CommonButton title={EButtonTitle.back} />
							<CommonButton
								title={EButtonTitle.delete}
								boardId={props.searchParams.modal}
							/>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
