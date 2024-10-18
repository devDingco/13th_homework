import { BoardAddressInput } from '@/commons/graphql/graphql';

export interface AppState {
    boardId: string;
    userId: string | null;
    writer: string;
    title: string;
    password: string;
    contents: string;

    youtubeUrl: string;
    boardAddress: BoardAddressInput;
}

type BoardAddressInputUpdater =
    | BoardAddressInput
    | ((prevState: BoardAddressInput) => BoardAddressInput);

export type Action =
    | { type: 'SET_BOARD_ID'; payload: string }
    | { type: 'SET_USER_ID'; payload: string | null }
    | { type: 'SET_WRITER'; payload: string }
    | { type: 'SET_TITLE'; payload: string }
    | { type: 'SET_PASSWORD'; payload: string }
    | { type: 'SET_CONTENTS'; payload: string }
    | { type: 'SET_YOUTUBE_URL'; payload: string }
    | { type: 'SET_BOARD_ADDRESS'; payload: BoardAddressInputUpdater }
    | { type: 'LOGIN'; payload: { userId: string; token: string } }
    | { type: 'LOGOUT' }
    | { type: 'RESET_FORM' };

const initialState: AppState = {
    boardId: '',
    userId: null,
    writer: '',
    title: '',
    password: '',
    contents: '',
    youtubeUrl: '',
    boardAddress: {
        zipcode: '',
        address: '',
        addressDetail: '',
    },
};

const appReducer = (state: AppState, action: Action): AppState => {
    switch (action.type) {
        case 'SET_BOARD_ID':
            return { ...state, boardId: action.payload };
        case 'SET_USER_ID':
            return { ...state, userId: action.payload };
        case 'SET_WRITER':
            return { ...state, writer: action.payload };
        case 'SET_TITLE':
            return { ...state, title: action.payload };
        case 'SET_PASSWORD':
            return { ...state, password: action.payload };
        case 'SET_CONTENTS':
            return { ...state, contents: action.payload };
        case 'SET_YOUTUBE_URL':
            return { ...state, youtubeUrl: action.payload };
        case 'SET_BOARD_ADDRESS': {
            const newAddress =
                typeof action.payload === 'function'
                    ? action.payload(state.boardAddress)
                    : action.payload;
            return { ...state, boardAddress: newAddress };
        }

        case 'RESET_FORM':
            return initialState;

        default:
            return state;
    }
};

export { initialState, appReducer };
