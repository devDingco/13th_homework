import type { UploadFile } from "antd";

export interface UploadFileList extends UploadFile {
  uid: string;
  name: string;
  status: "done" | "uploading" | "error";
  url: string;
}

export interface IformList {
  productName: string;
  productRemarks: string;
  productContents: string;
  productPrice: number;
  productTags: string[];
  productAddressPost?: string;
  productAddress?: string;
  productAddressDetail?: string;
  imgFiles?: FileList;
}
