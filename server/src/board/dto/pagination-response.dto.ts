import { Board } from '../entities/board.entity';

export class PaginationResponseDto {
    result: Board[];
    totalCount: number;
}
