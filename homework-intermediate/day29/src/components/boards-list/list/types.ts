export interface IBoardList {
  _id: string;
  title: string;
  writer: string;
  contents: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  likeCount: number | null;
  dislikeCount: number | null;
  images: string[];
  youtubeUrl: string | null;
  __typename: string;
}
