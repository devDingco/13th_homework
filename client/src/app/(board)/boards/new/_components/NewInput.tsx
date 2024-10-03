/** @format */

import { ETitle, ITitle, RNewInputPlaceHolder } from '@/models/board.type';

export default function NewInput({ title, edit }: ITitle) {
	console.log(title);
	console.log(edit);
	return (
		<input
			id={title}
			name={title}
			type={title === ETitle.Password ? 'password' : 'text'}
			className="flex w-full rounded-lg border-[1px] border-gray-200 px-3 py-4 outline-none placeholder:prose-r_16_24 placeholder:text-gray-400"
			placeholder={RNewInputPlaceHolder[title]}
		/>
	);
}
