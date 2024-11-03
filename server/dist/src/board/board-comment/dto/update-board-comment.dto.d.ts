import { CreateBoardCommentDTO } from './create-board-comment.dto';
declare const UpdateBoardCommentDTO_base: import("@nestjs/mapped-types").MappedType<Partial<CreateBoardCommentDTO>>;
export declare class UpdateBoardCommentDTO extends UpdateBoardCommentDTO_base {
    password: string;
}
export {};
