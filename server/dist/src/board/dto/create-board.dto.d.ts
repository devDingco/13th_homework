import { BoardAddressDTO } from './board-addresss.dto';
export declare class CreateBoardDTO {
    author: string;
    title: string;
    content: string;
    imageUrl?: string[];
    youtubeUrl?: string;
    password: string;
    boardAddressInput?: BoardAddressDTO;
}
