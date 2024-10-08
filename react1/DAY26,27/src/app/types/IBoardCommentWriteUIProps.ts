import { ChangeEvent } from 'react';

export interface IBoardCommentWriteUIProps {
    onChangeWriter: (e: ChangeEvent<HTMLInputElement>) => void;
    onChangePassword: (e: ChangeEvent<HTMLInputElement>) => void;
    onChangeContents: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    onClickWrite: () => Promise<void>;
    onReset: () => void;
    style: React.CSSProperties;
    writer: string;
    password: string;
    contents: string;
    isActive: boolean;
}
