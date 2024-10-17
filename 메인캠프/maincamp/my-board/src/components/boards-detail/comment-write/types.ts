import { Dispatch, SetStateAction } from 'react';

export interface ICommentWrite {
  isEdit?: boolean;
  el?: {
    __typename?: 'BoardComment';
    _id: string;
    writer?: string | null;
    contents: string;
    rating: number;
    createdAt?: any;
  };
  setIsEdit?: Dispatch<SetStateAction<boolean>>;
  commentId?: string;
  handleUnableEdit?: () => void;
}
