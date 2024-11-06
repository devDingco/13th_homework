/** @format */

import { IProps } from '@/models/children.type';
import RootBanner from './RootBanner';
import RootHeader from './RootHeader';

export default function RootContainer({ children }: IProps) {
	return (
		<main className="flex flex-col items-center justify-center">
			{/* active link */}
			{/* <RootHeader />
			<RootBanner /> */}
			{children}
		</main>
	);
}
