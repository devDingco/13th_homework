import { comment } from "postcss";
import { DocumentNode } from "@apollo/client";
import type { GetProp, UploadProps } from "antd";
export type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
export interface IboardFormProps {
  title: string;
  formType: string;
  data?: {
    fetchBoard: {
      writer: string;
      title: string;
      contents: string;
      youtubeUrl: string;
      boardAddress: {
        zipcode: string;
        address: string;
        addressDetail: string;
      };
      images: string[];
    };
  };
  fetchQuery?: DocumentNode;
}

export interface IeditVariables {
  updateBoardInput: {
    title?: string;
    contents?: string;
  };
  boardId: string;
  password: string;
}

export interface IonBoardEdit {
  boardId: string;
  title: string;
  contents: string;
  boardControl: (args: {
    variables: IeditVariables;
    refetchQueries: { boardId: string };
  }) => Promise<void>;
  query: DocumentNode | null;
}

// import Filter from "badwords-ko"; 나중에 욕설 검사 필터링 추가
// const badwordFilter = new Filter();

export interface IformList {
  writeName?: string;
  writePassword?: string;
  writeTitle?: string;
  writeContents?: string;
  writeAddressPost?: string;
  writeAddress?: string;
  writeAddressDetail?: string;
  youtubeUrl?: string;
  imgFiles?: FileList;
  email?: string;
  phone?: string;
  userId?: string;
  commentWriter?: string;
  commentPassword?: string;
  commentContents?: string;
  commentRating?: number;
}

export interface IwriteVariables {
  createBoardInput: {
    writer: string;
    password: string;
    title: string;
    contents: string;
    youtubeUrl?: string;
    boardAddress?: {
      zipcode?: string;
      address?: string;
      addressDetail?: string;
    };
    images?: (string | undefined)[];
  };
}
