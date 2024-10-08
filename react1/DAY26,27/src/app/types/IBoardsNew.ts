import { ChangeEvent } from 'react';

export interface IBoardsNew {
    writer: string;
    password: string;
    title: string;
    content: string;
    handleName: (e: ChangeEvent<HTMLInputElement>) => void;
    handlePassword: (e: ChangeEvent<HTMLInputElement>) => void;
    handleTitle: (e: ChangeEvent<HTMLInputElement>) => void;
    handleContent: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    handleUpdate: () => Promise<void>;
    handleSubmit: () => Promise<void>;
    handleReset: () => void;
    errorAlert: string;
    isActive: boolean;
    loading: boolean;
}
