import { ChangeEvent } from "react";

export interface Board {
  _id: string;
  writer: string;
  title: string;
  contents: string;
  createdAt: string;
  youtubeUrl?: string;
  boardAddress?: {
    zipcode: string;
    address: string;
    addressDetail: string;
  };
}

export interface FetchBoardsResult {
  fetchBoards: Board[];
}

export interface BoardHeaderProps {
  title: string;
  writer: string;
  createdAt: string;
}

export interface ActionButtonsProps {
  boardId: string;
}

export interface LikeDislikeButtonsProps {
  likes: number;
  dislikes: number;
}

export interface CreateBoardInput {
  writer: string;
  password: string;
  title: string;
  contents: string;
}

export interface UpdateBoardInput {
  title?: string;
  contents?: string;
}

export interface BoardFormProps {
  mode: "create" | "edit";
  boardId?: string;
}

export interface FormData {
  writer: string;
  password: string;
  title: string;
  contents: string;
}

export interface AddressInputProps {
  zipCode: string; // 우편번호
  address: string; // 주소
  detailAddress: string; // 상세주소
  onZipCodeChange: (event: ChangeEvent<HTMLInputElement>) => void; // 우편번호 변경
  onAddressChange: (event: ChangeEvent<HTMLInputElement>) => void; // 주소 변경
  onDetailAddressChange: (event: ChangeEvent<HTMLInputElement>) => void; // 상세주소
  onSearchClick: () => void; // 우편번호 검색 버튼
}

export interface TextareaFieldProps {
  label: string; // 라벨 텍스트
  name: string; // textarea 이름
  value: string; // 입력 값
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void; // 변경
  placeholder?: string; // 플레이스홀더 텍스트
  required?: boolean; // 필수 입력 여부
  error?: string; // 에러 메시지
  className?: string;
  rows?: number; // textarea의 행 수
}

export interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  error?: string;
  className?: string;
  disabled?: boolean;
}

export interface BoardItemProps {
  board: {
    _id: string;
    title: string;
    writer: string;
    createdAt: string;
  };
  index: number;
  onDelete: (id: string) => void;
}

export interface BoardContentProps {
  contents: string;
  likes: number;
  dislikes: number;
}
export interface FormData {
  writer: string;
  password: string;
  title: string;
  contents: string;
  zipCode: string;
  address: string;
  detailAddress: string;
  youtubeLink: string;
}

export interface CreateBoardInput {
  writer: string;
  password: string;
  title: string;
  contents: string;
  youtubeUrl?: string;
  boardAddress?: {
    zipcode: string;
    address: string;
    addressDetail: string;
  };
}

export interface UpdateBoardInput {
  title?: string;
  contents?: string;
  youtubeUrl?: string;
  boardAddress?: {
    zipcode: string;
    address: string;
    addressDetail: string;
  };
}

export interface FormErrors {
  writer?: string;
  password?: string;
  title?: string;
  contents?: string;
}
