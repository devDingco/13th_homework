export interface IErrorMessage {
  errorMessage: string;
}

export interface IContentInput {
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
  error?: string;
}

// props 타입 정의
export interface IInputGroup {
  label: string;
  type?: string;
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  value?: string;
  error?: string;
  isRequired?: boolean;
}

export interface IBoardList {
  id: ID!;
  number: number;
  title: string;
  writer: string;
  date: string;
}

export interface IBoard {
  _id: string;
  title: string;
  content: string;
  writer: string;
  createdAt: string;
}
