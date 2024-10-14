import { IsInt, IsNotEmpty } from 'class-validator';

import { Type } from 'class-transformer';

export class PaginationDto {
    @IsNotEmpty()
    @Type(() => Number) // 자동으로 문자열을 숫자로 변환
    @IsInt()
    page: number;
}
