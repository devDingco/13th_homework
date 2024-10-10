import { QueryFetchBoardCommentsArgs } from '@/commons/graphql/graphql';

export interface IBoardListItemProps {
    boardId: {
        _id: string;
        title: string;
        writer: string;
    };
    data?: QueryFetchBoardCommentsArgs;
    // onDelete: (event: React.MouseEvent<HTMLButtonElement>, id: string) => void;
    onComment: (_id: string) => void;
}
