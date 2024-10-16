import { ChangeEvent, Dispatch, SetStateAction } from 'react';

export interface IBoardAddress {
    zipcode: string;
    address: string;
    addressDetail: string;
}
export interface IBoardsNew {
    writer: string;
    password: string;
    title: string;
    content: string;
    youtubeUrl: string;
    setYoutubeUrl: Dispatch<SetStateAction<string>>;
    boardAddress: IBoardAddress;
    setBoardAddress: Dispatch<SetStateAction<IBoardAddress>>;
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
