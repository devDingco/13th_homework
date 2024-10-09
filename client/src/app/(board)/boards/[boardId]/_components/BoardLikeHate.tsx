/** @format */
import { IReactionResource, IReactionResponse } from '@/models/boardReaderResponse';

import Image from 'next/image';

export default function BoardLikeHate({ resource }: IReactionResource) {
	const infor: IReactionResponse = resource.read();

	return (
		<>
			{infor && typeof infor === 'object' && 'like' in infor && (
				<>
					<div className="flex items-center justify-center gap-6">
						<div className="flex cursor-pointer flex-col items-center gap-1">
							<Image src="/Images/hate.svg" alt="hate" width={24} height={24} />
							<div className="prose-r_14_20 text-gray-700">{infor?.hate}</div>
						</div>
						<div className="flex cursor-pointer flex-col items-center gap-1">
							<Image src="/Images/like.svg" alt="like" width={24} height={24} />
							<div className="prose-r_14_20 text-[#F66A6A]">{infor?.like}</div>
						</div>
					</div>
				</>
			)}
		</>
	);
}
