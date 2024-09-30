/** @format */
'use client';

import NewAddressInputContainer from './NewAddressInputContainer';
import NewInputContainer from './NewInputContainer';
import NewImageContainer from './NewImageContainer';
import NewTextarea from './NewTextarea';
import { ETitle } from '@/models/newTitle';
import { createBoardAction } from '@/actions/createBoardAction';
import { useFormState } from 'react-dom';
import { useEffect, useState } from 'react';
import { IInputValueParameter } from '@/models/inputValueParameter';
import { IFormState } from '@/models/formBoardError';
import CommonButton from '../../_components/CommonButton';
import { EButtonTitle } from '@/models/button.type';

export default function NewForm() {
	const [state, formAction] = useFormState(createBoardAction, {
		errors: {
			author: undefined,
			password: undefined,
			title: undefined,
			content: undefined,
		},
	});

	const [formValues, setFormValues] = useState<IFormState>({
		Author: '',
		Password: '',
		Title: '',
		Content: '',
	});

	const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

	useEffect(() => {
		const allFieldsFilled: boolean = Object.values(formValues).every(
			(value) => value.trim() !== '',
		);

		setIsButtonDisabled(!allFieldsFilled);
	}, [formValues]);

	const onChangeValue = ({ name, value }: IInputValueParameter): void => {
		setFormValues((prev: IFormState) => ({ ...prev, [name]: value }));
	};

	return (
		<form className="flex flex-col gap-10" action={formAction}>
			<div className="flex gap-10 border-b-[1px] border-gray-200 pb-10">
				<NewInputContainer
					title={ETitle.Author}
					error={state.errors?.author}
					onChangeValue={onChangeValue}
				/>
				<NewInputContainer
					title={ETitle.Password}
					error={state.errors?.password}
					onChangeValue={onChangeValue}
				/>
			</div>
			<NewInputContainer
				title={ETitle.Title}
				error={state.errors?.title}
				onChangeValue={onChangeValue}
			/>
			<NewTextarea
				title={ETitle.Content}
				error={state.errors?.content}
				onChangeValue={onChangeValue}
			/>
			<NewAddressInputContainer title={ETitle.Address} />
			<NewInputContainer title={ETitle.YoutubeUrl} />
			<NewImageContainer />
			<div className="flex w-full items-center justify-end gap-4">
				<CommonButton title={EButtonTitle.cancel} />
				<CommonButton title={EButtonTitle.sumbit} isButtonDisabled={isButtonDisabled} />
			</div>
		</form>
	);
}
