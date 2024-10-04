/** @format */

import { IBoardListProps } from '@/models/children.type';

export default function layout({ children, modal }: IBoardListProps) {
	return (
		<>
			{children}
			{modal}
		</>
	);
}
