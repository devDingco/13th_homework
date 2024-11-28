/** @format */

import { IDetailHeaderProps } from '@/types/detail.type';
import Icon from '@/components/Icon';

export default function DetailHeader({ name }: IDetailHeaderProps) {
	return (
		<div className="w-full flex items-center justify-between">
			<div className="prose-b_20_28">{name}</div>
			<Icon name="edit" />
		</div>
	);
}
