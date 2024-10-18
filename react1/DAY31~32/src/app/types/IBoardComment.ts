export interface IBoardComment {
    __typename?: 'BoardComment' | undefined;
    _id: string;
    writer?: string | null | undefined;
    contents: string;
    rating: number;
    user?: {
        _id: string;
        name: string;
    };
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;
}
