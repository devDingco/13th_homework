interface ICommentInput {
  writer?: string;
  content?: string;
  rating?: number;
  commentId?: string;
  type?: 'EDIT';
  onEditComment?: () => void;
}
