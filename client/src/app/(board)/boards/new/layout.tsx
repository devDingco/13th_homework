/** @format */
import { IBoardListProps } from '@/models/children.type';

export default function Layout({ children, modal }: IBoardListProps) {
	return (
		<div className="flex w-[75dvw] flex-col gap-10 py-10">
			{children}
			{modal}
		</div>
	);
}
