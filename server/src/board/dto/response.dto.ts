import { ApiProperty } from '@nestjs/swagger';

export class ResponseDto<TData> {
    @ApiProperty({
        example: 'board 전체를 성공적으로 생성했습니다.',
    })
    message: string;

    @ApiProperty({
        example: 200,
    })
    statusCode: number;

    results: TData;
}
