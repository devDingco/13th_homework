import { BoardEntity } from '../entity/board.entity';

export class PaginationResponseDTO {
    result: BoardEntity[];
    totalCount: number;
}
