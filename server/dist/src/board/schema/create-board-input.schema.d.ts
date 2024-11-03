import { BoardAddressInput } from './board-address-input.schema';
export declare class CreateBoardInput {
    author: string;
    password: string;
    title: string;
    content: string;
    imageUrl?: string[];
    youtubeUrl?: string;
    boardAddressInput?: BoardAddressInput;
}
