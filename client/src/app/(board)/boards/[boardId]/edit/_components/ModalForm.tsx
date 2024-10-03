/** @format */

import isValidationPasswordBoard from '@/actions/isValidationPasswordBoard';
import { useFormState } from 'react-dom';
import { useParams } from 'next/navigation';

export default function ModalForm() {
	const { boardId } = useParams();

	const [state, formAction] = useFormState(isValidationPasswordBoard, {
		boardId,
		error: null,
	});
	return (
		<>
			<form
				className="mt-4 flex w-2/3 items-center justify-evenly rounded-2xl border-2 border-[#c1c1c1]"
				action={formAction}
			>
				<input
					name="password"
					type="text"
					className="ml-4 flex h-10 w-[80%] items-center rounded-xl border-none outline-0"
				/>
				<svg
					width="32"
					height="32"
					viewBox="0 0 80 80"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className="mr-1 cursor-pointer"
				>
					<path
						d="M80 40C80 17.92 62.08 0 40 0C17.92 0 0 17.92 0 40C0 62.08 17.92 80 40 80C62.08 80 80 62.08 80 40ZM40 51.16V44H28C25.8 44 24 42.2 24 40C24 37.8 25.8 36 28 36H40V28.84C40 27.04 42.16 26.16 43.4 27.44L54.56 38.6C55.36 39.4 55.36 40.64 54.56 41.44L43.4 52.6C42.16 53.84 40 52.96 40 51.16Z"
						fill="black"
					/>
				</svg>
			</form>
			<div className="prose-me_16_24 mt-2 text-sm text-red-500">
				비밀번호가 일치하지 않습니다.
			</div>
		</>
	);
}
