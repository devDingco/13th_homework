/** @format */
import { IReactionResource, IReactionResponse } from '@/models/boardReaderResponse';

import Image from 'next/image';

export default function BoardLikeHate({ resource }: IReactionResource) {
	const infor: IReactionResponse = resource.read();

	return (
		<>
			{infor && typeof infor === 'object' && 'like' in infor && (
				<>
					<div className="flex justify-center items-center gap-6">
						<div className="flex flex-col gap-1 items-center cursor-pointer">
							<Image src="/Images/hate.svg" alt="hate" width={24} height={24} />
							<div className="prose-r_14_20 text-gray-700">{infor?.hate}</div>
						</div>
						<div className="flex flex-col gap-1 items-center cursor-pointer">
							<Image src="/Images/like.svg" alt="hate" width={24} height={24} />
							<div className="prose-r_14_20 text-[#F66A6A]">{infor?.like}</div>
						</div>
					</div>
				</>
			)}
		</>
	);
}
