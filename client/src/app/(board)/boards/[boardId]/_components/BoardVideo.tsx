/** @format */
import { IBoardProps } from '@/models/boardType';

export default function BoardVideo({ infor }) {
	return (
		<div className="w-full flex justify-center items-center bg-gray-100 py-4">
			<iframe
				width="560"
				height="315"
				src={`https://www.youtube.com/embed/${infor?.youtubeUrl}`}
				title="YouTube video player"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowFullScreen
			></iframe>
		</div>
	);
}
