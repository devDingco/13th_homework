/** @format */
'use client';

import YouTube from 'react-youtube';

export default function BoardYoutube() {
	const videoId = 'dQw4w9WgXcQ';
	const opts = {
		height: '390',
		width: '640',
		playerVars: {
			autoplay: 1,
			controls: 1,
		},
	};

	return <YouTube videoId={videoId} opts={opts} />;
}
