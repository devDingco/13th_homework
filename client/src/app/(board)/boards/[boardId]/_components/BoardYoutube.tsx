/** @format */
'use client';
// WARNING - third party cookie error

import YouTube from 'react-youtube';

export default function BoardYoutube() {
	const videoId = 'dQw4w9WgXcQ';
	const opts = {
		height: '390',
		width: '640',
		playerVars: {
			controls: 1,
		},
	};

	return <YouTube videoId={videoId} opts={opts} />;
}
