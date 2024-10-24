import { FetchBoardQuery } from "@/commons/graphql/graphql";

// 주소 정보
export interface IBoardAddressProps {
  zipcode?: string | null;
  address?: string | null;
  addressDetail?: string | null;
}

// 폼 데이터
export interface IFormDataProps {
  writer: string;
  password: string;
  title: string;
  contents: string;
  boardAddress?: IBoardAddressProps;
  youtubeUrl?: string;
  images?: string[];
}

export interface IBoardFormProps {
  isEdit: boolean;
  data?: FetchBoardQuery;
  boardId?: string;
}

export interface IUseBoardFormProps {
  isEdit: boolean;
  data?: FetchBoardQuery;
}
