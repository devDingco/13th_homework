/** @format */

import { ENewTitleProps, ITitle } from '@/models/board.type';

import CommonTextarea from '../../_components/CommonTextarea';

export default function NewTextarea({ title, error }: ITitle) {
	return (
		<div className="flex flex-1 flex-col gap-2">
			<div className="flex gap-1">
				<div className="text-gray-800">{ENewTitleProps[title]}</div>
				<div className="text-red-400">*</div>
			</div>
			<CommonTextarea title={title} />
			<div className="prose-me_16_24 text-red-400">{error}</div>
		</div>
	);
}
