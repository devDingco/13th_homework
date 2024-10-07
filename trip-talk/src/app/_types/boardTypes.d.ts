interface BoardType {
  createdAt?: any;
  title?: string;
  writer?: string | null | undefined;
  // __typename?: string;
  _id: string;
}

interface BoardDetailPropsType {
  style: classes;
  postId: string;
}
