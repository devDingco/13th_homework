import { CreateBoardMutation } from '@/commons/graphql/graphql';

export interface IBoardsNewProps {
    isEdit: boolean;
    data?: CreateBoardMutation;
    showResetButton?: boolean;
}
