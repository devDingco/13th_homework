import { IsInt, IsOptional, IsPositive } from 'class-validator';

import { Type } from 'class-transformer';

export class PaginationDTO {
    @IsOptional()
    @Type(() => Number)
    @IsPositive()
    @IsInt()
    page: number = 1;

    @IsOptional()
    @Type(() => Number)
    @IsPositive()
    @IsInt()
    take: number = 5;
}
