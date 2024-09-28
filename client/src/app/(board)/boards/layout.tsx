/** @format */
import { IBoardListProps } from '@/models/children';

export default function Layout({ children, modal }: IBoardListProps) {
	return (
		<div className="py-10 gap-10 flex flex-col w-[75dvw]">
			{children}
			{modal}
		</div>
	);
}
