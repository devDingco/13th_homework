/** @format */

import { ETitle, ITitleTextArea, RNewInputPlaceHolder } from '@/models/board.type';

import { useParams } from 'next/navigation';
import useSWR from 'swr';

export default function CommonTextarea({ title, setLength }: ITitleTextArea) {
	const param = useParams();
	const { data } = useSWR(`/board/${param.boardId}`, null, {
		revalidateOnFocus: false,
	});

	return (
		<textarea
			id={title}
			name={title}
			className={`${title === ETitle.Content ? 'h-[336px]' : 'h-36'} w-full resize-none rounded-lg border-[1px] border-gray-200 px-3 py-4 outline-none placeholder:prose-r_16_24 placeholder:text-gray-400`}
			placeholder={RNewInputPlaceHolder[title]}
			defaultValue={data?.title}
			onInput={setLength ? (event) => setLength(event.currentTarget.value.length) : undefined}
			maxLength={100}
		></textarea>
	);
}
