import { comment } from "postcss";
import { DocumentNode } from "@apollo/client";
import type { GetProp, UploadProps } from "antd";
import { FetchBoardDetailQuery } from "@/commons/graphql/graphql";
export type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
export interface IboardFormProps {
  title: string;
  formType: string;
}

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
