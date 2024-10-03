/** @format */

import { ENewTitleProps, ITitle } from '@/models/board.type';

import NewInput from './NewInput';

export default function NewInputContainer({ title, error }: ITitle) {
	return (
		<div className="prose-me_16_24 flex flex-1 flex-col gap-2">
			<div className="flex gap-1">
				<div className="text-gray-800">{ENewTitleProps[title]}</div>
				{title !== 'YoutubeUrl' && <div className="text-red-500">*</div>}
			</div>
			<NewInput title={title} />

			<div className="text-red-500">{error}</div>

			{title !== 'Author' && title !== 'Password' && (
				<div className="mt-10 border-b-[1px] border-gray-200"></div>
			)}
		</div>
	);
}
