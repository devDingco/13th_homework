/** @format */

export enum EButtonTitle {
	sumbit = 'sumbit',
	update = 'update',
	cancel = 'cancel',
	delete = 'delete',
	back = 'back',
}

export interface IButtonProps extends IButtonDisabled {
	title: EButtonTitle;
	boardId?: number;
}

export interface IButtonDisabled {
	isButtonDisabled?: boolean;
}

export enum EButtonKorea {
	sumbit = '작성하기',
	cancel = '취소',
	delete = '삭제 하기',
	back = '뒤로 가기',
	list = '목록으로',
	update = '수정하기',
}

export enum EBoardButton {
	list = 'list',
	update = 'update',
}

export interface IBoardButton {
	content: EBoardButton;
}
