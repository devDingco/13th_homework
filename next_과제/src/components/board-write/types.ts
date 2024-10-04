import { DocumentNode } from "@apollo/client";

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
  youtubeUrl?: URL;
  imgFile1?: File | null;
  imgFile2?: File | null;
  imgFile3?: File | null;
  email?: string;
  phone?: string;
  userId?: string;
}

export interface IformResister {
  [key: string]: {
    required?: string;
    pattern?: {
      value: RegExp;
      message: string;
    };
    maxLength?: {
      value: number;
      message: string;
    };
    minLength?: {
      value: number;
      message: string;
    };
  };
}
