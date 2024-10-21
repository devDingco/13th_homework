import type { GetProp, UploadProps, UploadFile } from "antd";

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

export interface UploadFileList extends UploadFile {
  uid: string;
  name: string;
  status: "done" | "uploading" | "error";
  url: string;
}
