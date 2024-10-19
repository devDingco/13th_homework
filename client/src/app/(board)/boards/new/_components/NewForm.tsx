/** @format */
'use client';
// NOTE useFormState & useFormStatus

import CommonButton from '../../_components/CommonButton';
import { EButtonTitle } from '@/models/button.type';
import { ETitle } from '@/models/board.type';
import { IFormStateError } from '@/models/formBoardError';
import NewAddressInputContainer from './NewAddressInputContainer';
import NewImageContainer from './NewImageContainer';
import NewInputContainer from './NewInputContainer';
import NewTextarea from './NewTextarea';
import { boardsUrlEndPoint } from '~/config/axiosConfig';
import { createBoardAction } from '@/actions/createBoardAction';
import { useFormState } from 'react-dom';
import useOnClickPush from '@/hooks/useOnClickPush';
import { usePathname } from 'next/navigation';

const initialState: IFormStateError = {
	data: null,
	errors: {
		author: '',
		password: '',
		title: '',
		content: '',
		general: '',
	},
};

export default function NewForm() {
	const onClickPush = useOnClickPush();
	const path: string = usePathname();

	const [state, formAction] = useFormState(createBoardAction, initialState);

	if (state.data) {
		onClickPush(`${boardsUrlEndPoint}/${state.data.boardId}`);
	}

	return (
		<form className="flex flex-col gap-10" action={formAction}>
			<div className="flex gap-10 border-b-[1px] border-gray-200 pb-10">
				<NewInputContainer title={ETitle.Author} error={state.errors.author} />
				<NewInputContainer title={ETitle.Password} error={state.errors.password} />
			</div>
			<NewInputContainer title={ETitle.Title} error={state.errors.title} />
			<NewTextarea title={ETitle.Content} error={state.errors.content} />
			<NewAddressInputContainer title={ETitle.Address} />
			<NewInputContainer title={ETitle.YoutubeUrl} />
			<NewImageContainer />
			<div className="flex w-full items-center justify-end gap-4">
				<CommonButton title={EButtonTitle.Cancel} />
				<CommonButton
					title={path.includes('edit') ? EButtonTitle.Update : EButtonTitle.Sumbit}
				/>
			</div>
		</form>
	);
}
