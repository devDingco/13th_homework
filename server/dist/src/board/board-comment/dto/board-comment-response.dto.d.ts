import { BoardCommentSchema } from '../schema/board-comment.schema';
declare const BoardCommentResponseDTO_base: import("@nestjs/common").Type<Omit<BoardCommentSchema, "password">>;
export declare class BoardCommentResponseDTO extends BoardCommentResponseDTO_base {
    replies?: BoardCommentResponseDTO[];
}
export {};
