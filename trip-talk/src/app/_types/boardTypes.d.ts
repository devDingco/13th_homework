interface BoardType {
  createdAt?: any;
  title?: string;
  writer?: string | null | undefined;
  _id: string;
}

interface BoardDetailPropsType {
  style: classes;
  postId: string;
}
