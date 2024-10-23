import { Dispatch, SetStateAction } from 'react';

export interface ICommentWrite {
  isEdit?: boolean;
  el?: IBoardComment;
  setIsEdit?: Dispatch<SetStateAction<boolean>>;
  commentId?: string;
  handleUnableEdit?: () => void;
}

export interface IBoardComment {
  __typename?: 'BoardComment';
  _id: string;
  writer?: string | null;
  contents: string;
  rating: number;
  createdAt: string;
}
