/** @format */

import Image from 'next/image';
interface IIconProp {
	name: string;
}

export default function Icon({ name }: IIconProp) {
	return (
		<Image src={`/Images/${name}.png`} alt={name} width={24} height={24} className="size-6" />
	);
}
