/** @format */

import { EInputPlaceholder, EInputTitle } from '@/types/input.type';

import AddressWrapper from './_components/AddressWrapper';
import Button from '@/components/Button';
import ImageContainer from './_components/ImageContainer';
import InputWrapper from '@/components/InputWrapper';

export default function NewPage() {
	return (
		<div className="flex flex-col px-5 gap-4 mt-20">
			<ImageContainer />
			<InputWrapper name={EInputTitle.NEW} placeholder={EInputPlaceholder.NEW} />
			<AddressWrapper />
			<InputWrapper
				name={EInputTitle.CONTENT}
				placeholder={EInputPlaceholder.CONTENT}
				textarea={true}
			/>
			<Button />
		</div>
	);
}
