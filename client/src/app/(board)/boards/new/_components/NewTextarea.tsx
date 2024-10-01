/** @format */

import { ENewTitleProps, ITitle, RNewInputPlaceHolder } from '@/models/board.type';

export default function NewTextarea({ title, error, onChangeValue }: ITitle) {
	return (
		<div className="flex flex-1 flex-col gap-2">
			<div className="flex gap-1">
				<div className="text-gray-800">{ENewTitleProps[title]}</div>
				<div className="text-red-400">*</div>
			</div>
			<textarea
				id={title}
				name={title}
				className="h-[336px] w-full rounded-lg border-[1px] border-gray-200 px-3 py-4 outline-none placeholder:prose-r_16_24 placeholder:text-gray-400"
				placeholder={RNewInputPlaceHolder[title]}
				onChange={(event) => onChangeValue?.({ name: title, value: event.target.value })}
			></textarea>
			<div className="prose-me_16_24 text-red-400">{error}</div>
		</div>
	);
}
