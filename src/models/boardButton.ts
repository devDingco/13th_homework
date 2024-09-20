/** @format */
export enum EBoardButton {
    list = 'list',
    update = 'update',
}

export enum EBoardButtonContent {
    list = '목록으로',
    update = '수정하기',
}

export interface IBoardButton {
    content: EBoardButton;
}
