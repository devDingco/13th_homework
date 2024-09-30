/** @format */

export enum EButtonTitle {
	sumbit = 'sumbit',
	cancel = 'cancel',
}

export interface IButtonProps extends IButtonDisabled {
	title: EButtonTitle;
}

export interface IButtonDisabled {
	isButtonDisabled?: boolean;
}

export enum EButtonKorea {
	sumbit = '작성하기',
	cancel = '취소',
}
