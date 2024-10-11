import { Board, BoardAddress } from "@/commons/graphql/graphql";
import { ChangeEvent } from "react";

// 게시글의 공통 필드를 정의, Board 타입을 재사용
export type BoardCommonFields = Pick<
  Board,
  "_id" | "title" | "writer" | "contents" | "createdAt" | "youtubeUrl"
> & {
  boardAddress?: Pick<
    BoardAddress,
    "zipcode" | "address" | "addressDetail"
  > | null;
};

// BoardItem 컴포넌트의 props 타입
export interface BoardItemProps {
  board: BoardCommonFields;
  index: number;
  onDelete: (id: string) => void;
}

// BoardHeader 컴포넌트의 props 타입
export interface BoardHeaderProps {
  title: string;
  writer: string | null | undefined;
  createdAt: string;
}

// BoardContent 컴포넌트의 props 타입
export interface BoardContentProps {
  contents: string;
  youtubeUrl?: string | null;
  likes: number;
  dislikes: number;
}

// ActionButtons 컴포넌트의 props 타입
export interface ActionButtonsProps {
  boardId: string;
}

// LikeDislikeButtons 컴포넌트의 props 타입
export interface LikeDislikeButtonsProps {
  likes: number;
  dislikes: number;
}

// BoardForm 컴포넌트의 props 타입
export interface BoardFormProps {
  mode: "create" | "edit";
  boardId?: string;
}

// 폼 데이터 타입. CreateBoardInput을 확장하여 사용
export interface FormData {
  writer: string;
  password: string;
  title: string;
  contents: string;
  youtubeUrl?: string | "";
  zipcode?: string | "";
  address?: string | "";
  addressDetail?: string | "";
}

// FormData의 각 필드에 대한 에러 메시지
export type FormErrors = Partial<Record<keyof FormData, string>>;

// 입력 컴포넌트(InputField, TextareaField)의 공통 props 타입
export interface InputProps {
  label: string;
  name: keyof FormData;
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

// AddressInput 컴포넌트의 props 타입
export interface AddressInputProps {
  zipcode: string;
  address: string;
  addressDetail: string;
  onAddressDetailChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onZipCodeChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onAddressChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSearchClick: () => void;
}

