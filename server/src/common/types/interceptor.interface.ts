export interface IDeleteResponse {
    message?: string;
    statusCode?: number;
}

export interface IResponseInterceptor<T> extends IDeleteResponse {
    data: T;
}
