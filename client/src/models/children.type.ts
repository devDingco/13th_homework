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
	address?: boolean;
}

export interface IModalProps {
	searchParams: IModalBoards;
}
export interface IDetailProps {
	params: IboardId;
}
export interface IDeatilPageProps extends IDetailProps {
	searchParams: IModalEditBoard;
}

export interface IModalCommon extends IModalBoards, IModalEditBoard {}

export interface IRatingProps {
	rating: number;
	setRating?: React.Dispatch<React.SetStateAction<number>>;
}

export interface ISearchParamsProps {
	searchParams: { [key: string]: string | undefined };
}
