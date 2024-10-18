'use client';

import React, {
    createContext,
    useContext,
    useReducer,
    ReactNode,
    Dispatch,
} from 'react';

import {
    appReducer,
    initialState,
    AppState,
    Action,
} from '../reducers/appReducer';
import { BoardAddressInput } from '@/commons/graphql/graphql';

type BoardAddressInputUpdater =
    | BoardAddressInput
    | ((prevState: BoardAddressInput) => BoardAddressInput);

interface AppContextType {
    boardId: string;
    setBoardId: (id: string) => void;
    userId: string | null;
    setUserId: (id: string | null) => void;
    writer: string;
    setWriter: (writer: string) => void;
    title: string;
    setTitle: (title: string) => void;
    password: string;
    setPassword: (password: string) => void;
    contents: string;
    setContents: (contents: string) => void;
    youtubeUrl: string;
    setYoutubeUrl: (url: string) => void;
    boardAddress: BoardAddressInput;
    setBoardAddress: (address: BoardAddressInputUpdater) => void;
    resetForm: () => void;

    dispatch: Dispatch<Action>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [state, dispatch] = useReducer<React.Reducer<AppState, Action>>(
        appReducer,
        initialState
    );

    const setBoardId = (id: string) =>
        dispatch({ type: 'SET_BOARD_ID', payload: id });
    const setUserId = (id: string | null) =>
        dispatch({ type: 'SET_USER_ID', payload: id });
    const setWriter = (writer: string) =>
        dispatch({ type: 'SET_WRITER', payload: writer });
    const setTitle = (title: string) =>
        dispatch({ type: 'SET_TITLE', payload: title });
    const setPassword = (password: string) =>
        dispatch({ type: 'SET_PASSWORD', payload: password });
    const setContents = (contents: string) =>
        dispatch({ type: 'SET_CONTENTS', payload: contents });
    const setYoutubeUrl = (url: string) =>
        dispatch({ type: 'SET_YOUTUBE_URL', payload: url });

    const setBoardAddress = (addressUpdater: BoardAddressInputUpdater) => {
        const updatedAddress =
            typeof addressUpdater === 'function'
                ? addressUpdater(state.boardAddress)
                : addressUpdater;

        dispatch({ type: 'SET_BOARD_ADDRESS', payload: updatedAddress });
    };

    const resetForm = () => {
        dispatch({ type: 'RESET_FORM' });
    };

    return (
        <AppContext.Provider
            value={{
                boardId: state?.boardId,
                setBoardId,
                userId: state?.userId,
                setUserId,
                writer: state?.writer,
                setWriter,
                title: state?.title,
                setTitle,
                password: state?.password,
                setPassword,
                contents: state?.contents,
                setContents,
                youtubeUrl: state?.youtubeUrl,
                setYoutubeUrl,
                boardAddress: state?.boardAddress,
                setBoardAddress,
                resetForm,
                dispatch,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within a AppProvider');
    }
    return context;
};
