export interface IcommentWriteProps {
  title?: string;
  textMaxCount: number;
  placeholder: string;
  id: string;
  type: string;
  starCountBox?: boolean;
  data?: {
    __typename: string;
    _id: string;
    writer: string;
    // password?: string;
    contents: string;
  };
  setMode?: Function;
  mode?: string[];
  commentIndex?: number;
}

export interface IcommentForm {
  commentWriter: string;
  commentPassword: string;
  commentContents: string;
}

export interface IuseCommentWriteProps {
  data?: { _id: string; writer: string; password: string; contents: string };
  setMode?: Function;
  mode?: string[];
  commentIndex?: number;
}
