interface IDetailContentProps {
  value: string | null | undefined;
}

interface IDetailInfoProps {
  value: string | null | undefined;
}

interface IDetailButtonProps {
  value: string | undefined;
}

interface ICommentInput {
  author: string;
  password: string;
  comment: string;
  rating: number;
}

interface IDeteailCommentProps {
  boardId: string;
}

interface IComment {
  _id: string;
  writer: string;
  contents: string;
  rating: number;
  createdAt: string;
}
