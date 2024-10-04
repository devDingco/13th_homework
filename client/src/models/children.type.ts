/** @format */

export interface IProps {
	children: React.ReactNode;
}

export interface IBoardListProps extends IProps {
	modal: React.ReactNode;
}
export interface IModalBoards {
	boardId?: number;
}
export interface IboardId {
	boardId: string;
}
export interface IModalEditBoard {
	modal?: boolean;
}

export interface IModalProps {
	searchParams: IModalBoards;
}
export interface IDeatilProps {
	params: IboardId;
}
export interface IDeatilPageProps {
	searchParams: IModalEditBoard;
}

export interface IModalCommon extends IModalBoards, IModalEditBoard {}
