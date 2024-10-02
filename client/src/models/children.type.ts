/** @format */

export interface IProps {
	children: React.ReactNode;
}

export interface IBoardListProps extends IProps {
	modal: React.ReactNode;
}

export interface IModalProps {
	modal: number;
}

export interface IDeatilPageProps {
	params: {
		boardId: string;
	};
}
