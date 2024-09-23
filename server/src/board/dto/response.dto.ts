import { ApiProperty } from '@nestjs/swagger';

export class ResponseDto<TData> {
    @ApiProperty()
    total: number;

    @ApiProperty()
    limit: number;

    @ApiProperty()
    offset: number;

    results: TData[];
}
