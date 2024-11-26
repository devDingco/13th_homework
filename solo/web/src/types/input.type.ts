import { ElementType } from "react";

export interface IInputWrapperProps extends IInputProps {
    name: string
    textarea?: boolean;
}

export interface IInputProps {
    placeholder: string;
}

export enum EInputTitle{
    NEW = "플레이스 이름",
    CONTENT = "플레이스 내용",
    ADDRESS = "플레이스 주소"
}

export enum EInputPlaceholder {
    NEW = "플레이스 이름을 입력해 주세요. (1자 이상)",
    CONTENT = "플레이스 내용을 입력해주세요. (1자 이상)"
}