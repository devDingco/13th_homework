export class ResponseDto<TData> {
    message: string;

    statusCode: number;

    results: TData;
}
