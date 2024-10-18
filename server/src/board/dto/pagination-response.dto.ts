import { BoardEntity } from '../entities/board.entity';

export class PaginationResponseDTO {
    result: BoardEntity[];
    totalCount: number;
}
