export interface IBoardProps {
  id: string;
  number: number;
  title: string;
  writer: string;
  date: string;
  keyword?: string;
}

export interface IBoard {
  _id: string;
  title: string;
  contents: string;
  writer: string;
  createdAt: string;
}
