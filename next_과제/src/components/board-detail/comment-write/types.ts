export interface IcommentWriteProps {
  title?: string;
  textMaxCount: number;
  placeholder: string;
  id?: string;
  type: string;
  starCountBox?: boolean;
  data?: {
    __typename?: string;
    _id: string;
    writer: string;
    contents: string;
    rating?: number;
  };
  setMode?: (mode: string[]) => void;
  mode?: string[];
  commentIndex?: number;
}

export interface IcommentForm {
  commentWriter: string;
  commentPassword: string;
  commentContents: string;
  commentRating: number;
}

export interface IuseCommentWriteProps {
  data?: {
    __typename?: string;
    _id: string;
    writer: string;
    password?: string;
    contents: string;
    rating?: number;
  };
  setMode?: (mode: string[]) => void;
  mode?: string[];
  commentIndex?: number;
}
