/** @format */

import { IInputValueParameter } from './inputValueParameter';

export enum ETitle {
	Author = 'Author',
	Password = 'Password',
	Title = 'Title',
	Content = 'Content',
	Address = 'Address',
	DetailAddress = 'DetailAddress',
	YoutubeUrl = 'YoutubeUrl',
}

export enum ENewTitleProps {
	Author = '작성자',
	Password = '비밀번호',
	Title = '제목',
	Content = '내용',
	Address = '주소',
	DetailAddress = '상세 주소',
	YoutubeUrl = '유튜브 링크',
}

export const ENewInputPlaceHolder: Record<ETitle, string> = {
	[ETitle.Author]: '작성자 명을 입력해주세요.',
	[ETitle.Password]: '비밀번호를 입력해주세요.',
	[ETitle.Title]: '제목을 입력해주세요.',
	[ETitle.Content]: '내용을 입력해주세요.',
	[ETitle.Address]: '주소를 입력해주세요.',
	[ETitle.DetailAddress]: '상세주소',
	[ETitle.YoutubeUrl]: '링크를 입력해주세요.',
};

export interface ITitle {
	title: ETitle;
	error?: string;
	onChangeValue?: ({ name, value }: IInputValueParameter) => void;
}
