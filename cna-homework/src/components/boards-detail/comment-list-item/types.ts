export type Comment = {
  _id: string;
  writer?: string | null;
  rating: number;
  contents: string;
  createdAt: string;
};

export type UseCommentListItemProps = {
  el: Comment;
  index: number;
};
