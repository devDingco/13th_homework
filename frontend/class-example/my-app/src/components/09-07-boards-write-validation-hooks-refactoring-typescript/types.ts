import { FetchBoardQuery } from "@/commons/graphql/graphql";

export interface IBoardWriteprops {
    isEdit: boolean;
    data: FetchBoardQuery
  }

  export interface IMyvariables {
    mynumber: number;
    mywriter?: string;
    mytitle?: string;
    mycontents?: string;
  }