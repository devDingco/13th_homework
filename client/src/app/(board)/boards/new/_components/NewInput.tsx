/** @format */

import { ETitle, ITitle, RNewInputPlaceHolder } from '@/models/board.type';

import { usePathname } from 'next/navigation';

export default function NewInput({ title, edit }: ITitle) {
	const path: string = usePathname();
	return (
		<input
			id={title}
			disabled={
				(edit && title === ETitle.Author) ||
				(path.includes('edit') && title === ETitle.Password)
			}
			name={title}
			type={title === ETitle.Password ? 'password' : 'text'}
			className="flex w-full rounded-lg border-[1px] border-gray-200 px-3 py-4 outline-none placeholder:prose-r_16_24 placeholder:text-gray-400"
			placeholder={RNewInputPlaceHolder[title]}
			defaultValue={
				(edit as string) ||
				(path.includes('edit') && title === ETitle.Password ? '123' : undefined)
			}
		/>
	);
}
