/** @format */

export enum EButtonTitle {
	sumbit = 'sumbit',
	cancel = 'cancel',
	delete = 'delete',
	back = 'back',
}

export interface IButtonProps extends IButtonDisabled {
	title: EButtonTitle;
	onClickBack?: () => void;
}

export interface IButtonDisabled {
	isButtonDisabled?: boolean;
}

export enum EButtonKorea {
	sumbit = '작성하기',
	cancel = '취소',
	delete = '삭제 하기',
	back = '뒤로 가기',
}
