/** @format */

import { RNewInputPlaceHolder, ITitle } from '@/models/newTitle';

export default function NewInput({ title, onChangeValue }: ITitle) {
	return (
		<input
			id={title}
			name={title}
			type={title === 'Password' ? 'password' : 'text'}
			className="flex w-full rounded-lg border-[1px] border-gray-200 px-3 py-4 outline-none placeholder:prose-r_16_24 placeholder:text-gray-400"
			placeholder={RNewInputPlaceHolder[title]}
			onChange={(event) => onChangeValue?.({ name: title, value: event.target.value })}
		/>
	);
}
