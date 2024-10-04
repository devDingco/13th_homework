export interface IErrorMessage {
  errorMessage: string;
}

export interface IContentsGroup {
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  defaultValue?: string;
  error?: string;
}

// props 타입 정의
export interface IInputGroup {
  label: string;
  type?: string;
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  error?: string;
  isRequired?: boolean;
  defaultValue?: string;
  isDisabled?: boolean;
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
  writer: string;
  title: string;
  contents: string;
  createdAt: string;
}

export interface IBoardWriteProps {
  isEdit: boolean;
  data: IBoard; // Board 객체를 사용
}
