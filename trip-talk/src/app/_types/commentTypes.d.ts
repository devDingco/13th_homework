interface ICommentInput {
  writer?: string;
  content?: string;
  rating?: number;
  commentId?: string;
  type?: 'EDIT' | boolean;
  editType?: boolean;
  onEditComment?: () => void;
  resetHasMore?: () => void;
}
