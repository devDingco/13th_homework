/** @format */

import { IBoardType } from '@/models/board.type';

export const boardObject: IBoardType[] = [
	{
		boardId: 1,
		author: '김철수',
		title: '안녕 나는 철수야',
		content: '처어어엉ㄹ수sfdmgksdkgfmskldmfg;fsmdlkgmfskldmglksdmklgmsdlkgmflks',
		createdAt: '2024.09.20',
		imageUrl: ['/Images/img1.png', '/Images/img1.png'],
		hate: 24,
		like: 12,
	},
	{
		boardId: 2,
		author: '김영희',
		title: '안녕 나는 영희야',
		content: '여여여영희sfdmgksdkgfmskldmfg;fsmdlkgmfskldmglksdmklgmsdlkgmflks',
		createdAt: '2024.09.20',
		youtubeUrl: 'gSSsZReIFRk',
		hate: 21,
		like: 12,
	},
	{
		boardId: 3,
		author: '김맹구',
		title: '안녕 나는 맹구야',
		createdAt: '2024.09.20',
		content: '맹규sfdmgksdkgfmskldmfg;fsmdlkgmfskldmglksdmklgmsdlkgmflks',
		imageUrl: ['/Images/img1.png', '/Images/img1.png', '/Images/img1.png'],
		youtubeUrl: 'gSSsZReIFRk',
		hate: 24,
		like: 13,
	},
];
