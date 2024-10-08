interface BoardType {
  createdAt?: Date;
  title?: string;
  writer?: string | null | undefined;
  _id: string;
}

interface BoardDetailPropsType {
  style: classes;
  postId: string;
}
