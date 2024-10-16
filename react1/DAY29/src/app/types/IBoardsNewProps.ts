import { CreateBoardDocument } from '@/commons/graphql/graphql';

export interface IBoardsNewProps {
    isEdit: boolean;
    data?: typeof CreateBoardDocument;

    showResetButton?: boolean;
}
