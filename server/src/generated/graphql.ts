import {
    GraphQLResolveInfo,
    GraphQLScalarType,
    GraphQLScalarTypeConfig,
} from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
    [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
    T extends { [key: string]: unknown },
    K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
    | T
    | {
          [P in keyof T]?: P extends ' $fragmentName' | '__typename'
              ? T[P]
              : never;
      };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
    [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: { input: string; output: string };
    String: { input: string; output: string };
    Boolean: { input: boolean; output: boolean };
    Int: { input: number; output: number };
    Float: { input: number; output: number };
    /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
    DateTime: { input: any; output: any };
};

export type BoardAddressInput = {
    address: Scalars['String']['input'];
    detailAddress: Scalars['String']['input'];
    zoneCode: Scalars['Int']['input'];
};

export type BoardAddressOutput = {
    __typename?: 'BoardAddressOutput';
    address: Scalars['String']['output'];
    detailAddress: Scalars['String']['output'];
    zoneCode: Scalars['Int']['output'];
};

export type BoardCommentResponseDto = {
    __typename?: 'BoardCommentResponseDTO';
    _id: Scalars['ID']['output'];
    author: Scalars['String']['output'];
    boardId: Scalars['Int']['output'];
    content: Scalars['String']['output'];
    createdAt: Scalars['DateTime']['output'];
    parentId?: Maybe<Scalars['String']['output']>;
    rating?: Maybe<Scalars['Int']['output']>;
    replies?: Maybe<Array<BoardCommentResponseDto>>;
    updatedAt: Scalars['DateTime']['output'];
};

export type BoardPaginationResponse = {
    __typename?: 'BoardPaginationResponse';
    result: Array<BoardSchema>;
    totalCount: Scalars['Int']['output'];
};

export type BoardReactionSchema = {
    __typename?: 'BoardReactionSchema';
    _id: Scalars['ID']['output'];
    boardId: Scalars['Int']['output'];
    createdAt: Scalars['DateTime']['output'];
    hate: Scalars['Int']['output'];
    like: Scalars['Int']['output'];
    updatedAt: Scalars['DateTime']['output'];
};

export type BoardSchema = {
    __typename?: 'BoardSchema';
    _id: Scalars['ID']['output'];
    author: Scalars['String']['output'];
    boardAddressOutput?: Maybe<BoardAddressOutput>;
    boardId: Scalars['Int']['output'];
    content: Scalars['String']['output'];
    createdAt: Scalars['DateTime']['output'];
    imageUrl?: Maybe<Array<Scalars['String']['output']>>;
    title: Scalars['String']['output'];
    updatedAt: Scalars['DateTime']['output'];
    youtubeUrl?: Maybe<Scalars['String']['output']>;
};

export type CreateBoardCommentInput = {
    author: Scalars['String']['input'];
    content: Scalars['String']['input'];
    parentId?: InputMaybe<Scalars['String']['input']>;
    password: Scalars['String']['input'];
    rating?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateBoardInput = {
    author: Scalars['String']['input'];
    boardAddressInput?: InputMaybe<Array<BoardAddressInput>>;
    content: Scalars['String']['input'];
    imageUrl?: InputMaybe<Array<Scalars['String']['input']>>;
    password: Scalars['String']['input'];
    title: Scalars['String']['input'];
    youtubeUrl?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
    __typename?: 'Mutation';
    clearBoard: Scalars['Boolean']['output'];
    createBoard: BoardSchema;
    createBoardComment: BoardCommentResponseDto;
    deleteBoard: Scalars['Boolean']['output'];
    deleteBoardComment: Scalars['Boolean']['output'];
    isPasswordCorrect: Scalars['Boolean']['output'];
    updateBoard: BoardSchema;
    updateBoardComment: BoardCommentResponseDto;
};

export type MutationCreateBoardArgs = {
    createBoardInput: CreateBoardInput;
};

export type MutationCreateBoardCommentArgs = {
    boardId: Scalars['Int']['input'];
    createBoardComment: CreateBoardCommentInput;
};

export type MutationDeleteBoardArgs = {
    boardId: Scalars['Int']['input'];
};

export type MutationDeleteBoardCommentArgs = {
    boardId: Scalars['Int']['input'];
    commentId: Scalars['String']['input'];
};

export type MutationIsPasswordCorrectArgs = {
    boardId: Scalars['Int']['input'];
    password: Scalars['String']['input'];
};

export type MutationUpdateBoardArgs = {
    boardId: Scalars['Int']['input'];
    updateBoardInput: UpdateBoardInput;
};

export type MutationUpdateBoardCommentArgs = {
    boardId: Scalars['Int']['input'];
    commentId: Scalars['String']['input'];
    updateBoardComment: UpdateBoardCommentInput;
};

export type Query = {
    __typename?: 'Query';
    getBoard: BoardSchema;
    getBoardComment: Array<BoardCommentResponseDto>;
    getBoardReaction: BoardReactionSchema;
    getBoards: BoardPaginationResponse;
};

export type QueryGetBoardArgs = {
    boardId: Scalars['Int']['input'];
};

export type QueryGetBoardCommentArgs = {
    boardId: Scalars['Int']['input'];
    page?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryGetBoardReactionArgs = {
    boardId: Scalars['Int']['input'];
};

export type QueryGetBoardsArgs = {
    page?: InputMaybe<Scalars['Int']['input']>;
    take?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateBoardCommentInput = {
    content: Scalars['String']['input'];
    parentId?: InputMaybe<Scalars['String']['input']>;
    password: Scalars['String']['input'];
    rating?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateBoardInput = {
    boardAddressInput?: InputMaybe<Array<BoardAddressInput>>;
    content: Scalars['String']['input'];
    imageUrl?: InputMaybe<Array<Scalars['String']['input']>>;
    title: Scalars['String']['input'];
    youtubeUrl?: InputMaybe<Scalars['String']['input']>;
};

export type CreateBoardCommentMutationVariables = Exact<{
    boardId: Scalars['Int']['input'];
    createBoardComment: CreateBoardCommentInput;
}>;

export type CreateBoardCommentMutation = {
    __typename?: 'Mutation';
    createBoardComment: {
        __typename?: 'BoardCommentResponseDTO';
        author: string;
        content: string;
        rating?: number | null;
        parentId?: string | null;
        _id: string;
        createdAt: any;
        replies?: Array<{
            __typename?: 'BoardCommentResponseDTO';
            author: string;
            content: string;
            createdAt: any;
        }> | null;
    };
};

export type UpdateBoardCommentMutationVariables = Exact<{
    boardId: Scalars['Int']['input'];
    updateBoardComment: UpdateBoardCommentInput;
    commentId: Scalars['String']['input'];
}>;

export type UpdateBoardCommentMutation = {
    __typename?: 'Mutation';
    updateBoardComment: {
        __typename?: 'BoardCommentResponseDTO';
        author: string;
        content: string;
        rating?: number | null;
        parentId?: string | null;
        _id: string;
        createdAt: any;
        replies?: Array<{
            __typename?: 'BoardCommentResponseDTO';
            author: string;
            content: string;
            createdAt: any;
        }> | null;
    };
};

export type DeleteBoardCommentMutationVariables = Exact<{
    boardId: Scalars['Int']['input'];
    commentId: Scalars['String']['input'];
}>;

export type DeleteBoardCommentMutation = {
    __typename?: 'Mutation';
    deleteBoardComment: boolean;
};

export type IsPasswordCorrectMutationVariables = Exact<{
    boardId: Scalars['Int']['input'];
    password: Scalars['String']['input'];
}>;

export type IsPasswordCorrectMutation = {
    __typename?: 'Mutation';
    isPasswordCorrect: boolean;
};

export type CreateBoardMutationVariables = Exact<{
    createBoardInput: CreateBoardInput;
}>;

export type CreateBoardMutation = {
    __typename?: 'Mutation';
    createBoard: {
        __typename?: 'BoardSchema';
        author: string;
        title: string;
        content: string;
        imageUrl?: Array<string> | null;
        youtubeUrl?: string | null;
        createdAt: any;
        boardAddressOutput?: {
            __typename?: 'BoardAddressOutput';
            zoneCode: number;
            address: string;
            detailAddress: string;
        } | null;
    };
};

export type UpdateBoardMutationVariables = Exact<{
    boardId: Scalars['Int']['input'];
    updateBoardInput: UpdateBoardInput;
}>;

export type UpdateBoardMutation = {
    __typename?: 'Mutation';
    updateBoard: {
        __typename?: 'BoardSchema';
        author: string;
        title: string;
        content: string;
        imageUrl?: Array<string> | null;
        youtubeUrl?: string | null;
        createdAt: any;
        boardAddressOutput?: {
            __typename?: 'BoardAddressOutput';
            zoneCode: number;
            address: string;
            detailAddress: string;
        } | null;
    };
};

export type DeleteBoardMutationVariables = Exact<{
    boardId: Scalars['Int']['input'];
}>;

export type DeleteBoardMutation = {
    __typename?: 'Mutation';
    deleteBoard: boolean;
};

export type ClearBoardMutationVariables = Exact<{ [key: string]: never }>;

export type ClearBoardMutation = {
    __typename?: 'Mutation';
    clearBoard: boolean;
};

export type GetBoardCommentQueryVariables = Exact<{
    boardId: Scalars['Int']['input'];
    page?: InputMaybe<Scalars['Int']['input']>;
}>;

export type GetBoardCommentQuery = {
    __typename?: 'Query';
    getBoardComment: Array<{
        __typename?: 'BoardCommentResponseDTO';
        author: string;
        content: string;
        rating?: number | null;
        parentId?: string | null;
        _id: string;
        createdAt: any;
        replies?: Array<{
            __typename?: 'BoardCommentResponseDTO';
            author: string;
            content: string;
            createdAt: any;
        }> | null;
    }>;
};

export type GetBoardReactionQueryVariables = Exact<{
    boardId: Scalars['Int']['input'];
}>;

export type GetBoardReactionQuery = {
    __typename?: 'Query';
    getBoardReaction: {
        __typename?: 'BoardReactionSchema';
        like: number;
        hate: number;
    };
};

export type GetBoardsQueryVariables = Exact<{
    page?: InputMaybe<Scalars['Int']['input']>;
    take?: InputMaybe<Scalars['Int']['input']>;
}>;

export type GetBoardsQuery = {
    __typename?: 'Query';
    getBoards: {
        __typename?: 'BoardPaginationResponse';
        totalCount: number;
        result: Array<{
            __typename?: 'BoardSchema';
            author: string;
            title: string;
            boardId: number;
            createdAt: any;
        }>;
    };
};

export type GetBoardQueryVariables = Exact<{
    boardId: Scalars['Int']['input'];
}>;

export type GetBoardQuery = {
    __typename?: 'Query';
    getBoard: {
        __typename?: 'BoardSchema';
        author: string;
        title: string;
        content: string;
        imageUrl?: Array<string> | null;
        youtubeUrl?: string | null;
        createdAt: any;
        boardAddressOutput?: {
            __typename?: 'BoardAddressOutput';
            zoneCode: number;
            address: string;
            detailAddress: string;
        } | null;
    };
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
    resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
    | ResolverFn<TResult, TParent, TContext, TArgs>
    | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
    TResult,
    TKey extends string,
    TParent,
    TContext,
    TArgs,
> {
    subscribe: SubscriptionSubscribeFn<
        { [key in TKey]: TResult },
        TParent,
        TContext,
        TArgs
    >;
    resolve?: SubscriptionResolveFn<
        TResult,
        { [key in TKey]: TResult },
        TContext,
        TArgs
    >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
    resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
    TResult,
    TKey extends string,
    TParent,
    TContext,
    TArgs,
> =
    | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
    | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
    TResult,
    TKey extends string,
    TParent = {},
    TContext = {},
    TArgs = {},
> =
    | ((
          ...args: any[]
      ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
    | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
    parent: TParent,
    context: TContext,
    info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
    obj: T,
    context: TContext,
    info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
    TResult = {},
    TParent = {},
    TContext = {},
    TArgs = {},
> = (
    next: NextResolverFn<TResult>,
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
    BoardAddressInput: BoardAddressInput;
    BoardAddressOutput: ResolverTypeWrapper<BoardAddressOutput>;
    BoardCommentResponseDTO: ResolverTypeWrapper<BoardCommentResponseDto>;
    BoardPaginationResponse: ResolverTypeWrapper<BoardPaginationResponse>;
    BoardReactionSchema: ResolverTypeWrapper<BoardReactionSchema>;
    BoardSchema: ResolverTypeWrapper<BoardSchema>;
    Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
    CreateBoardCommentInput: CreateBoardCommentInput;
    CreateBoardInput: CreateBoardInput;
    DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
    ID: ResolverTypeWrapper<Scalars['ID']['output']>;
    Int: ResolverTypeWrapper<Scalars['Int']['output']>;
    Mutation: ResolverTypeWrapper<{}>;
    Query: ResolverTypeWrapper<{}>;
    String: ResolverTypeWrapper<Scalars['String']['output']>;
    UpdateBoardCommentInput: UpdateBoardCommentInput;
    UpdateBoardInput: UpdateBoardInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
    BoardAddressInput: BoardAddressInput;
    BoardAddressOutput: BoardAddressOutput;
    BoardCommentResponseDTO: BoardCommentResponseDto;
    BoardPaginationResponse: BoardPaginationResponse;
    BoardReactionSchema: BoardReactionSchema;
    BoardSchema: BoardSchema;
    Boolean: Scalars['Boolean']['output'];
    CreateBoardCommentInput: CreateBoardCommentInput;
    CreateBoardInput: CreateBoardInput;
    DateTime: Scalars['DateTime']['output'];
    ID: Scalars['ID']['output'];
    Int: Scalars['Int']['output'];
    Mutation: {};
    Query: {};
    String: Scalars['String']['output'];
    UpdateBoardCommentInput: UpdateBoardCommentInput;
    UpdateBoardInput: UpdateBoardInput;
};

export type BoardAddressOutputResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['BoardAddressOutput'] = ResolversParentTypes['BoardAddressOutput'],
> = {
    address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    detailAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    zoneCode?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BoardCommentResponseDtoResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['BoardCommentResponseDTO'] = ResolversParentTypes['BoardCommentResponseDTO'],
> = {
    _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    author?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    boardId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    parentId?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >;
    rating?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    replies?: Resolver<
        Maybe<Array<ResolversTypes['BoardCommentResponseDTO']>>,
        ParentType,
        ContextType
    >;
    updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BoardPaginationResponseResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['BoardPaginationResponse'] = ResolversParentTypes['BoardPaginationResponse'],
> = {
    result?: Resolver<
        Array<ResolversTypes['BoardSchema']>,
        ParentType,
        ContextType
    >;
    totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BoardReactionSchemaResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['BoardReactionSchema'] = ResolversParentTypes['BoardReactionSchema'],
> = {
    _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    boardId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    hate?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    like?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BoardSchemaResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['BoardSchema'] = ResolversParentTypes['BoardSchema'],
> = {
    _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    author?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    boardAddressOutput?: Resolver<
        Maybe<ResolversTypes['BoardAddressOutput']>,
        ParentType,
        ContextType
    >;
    boardId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    imageUrl?: Resolver<
        Maybe<Array<ResolversTypes['String']>>,
        ParentType,
        ContextType
    >;
    title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    youtubeUrl?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig
    extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
    name: 'DateTime';
}

export type MutationResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation'],
> = {
    clearBoard?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    createBoard?: Resolver<
        ResolversTypes['BoardSchema'],
        ParentType,
        ContextType,
        RequireFields<MutationCreateBoardArgs, 'createBoardInput'>
    >;
    createBoardComment?: Resolver<
        ResolversTypes['BoardCommentResponseDTO'],
        ParentType,
        ContextType,
        RequireFields<
            MutationCreateBoardCommentArgs,
            'boardId' | 'createBoardComment'
        >
    >;
    deleteBoard?: Resolver<
        ResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<MutationDeleteBoardArgs, 'boardId'>
    >;
    deleteBoardComment?: Resolver<
        ResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<MutationDeleteBoardCommentArgs, 'boardId' | 'commentId'>
    >;
    isPasswordCorrect?: Resolver<
        ResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<MutationIsPasswordCorrectArgs, 'boardId' | 'password'>
    >;
    updateBoard?: Resolver<
        ResolversTypes['BoardSchema'],
        ParentType,
        ContextType,
        RequireFields<MutationUpdateBoardArgs, 'boardId' | 'updateBoardInput'>
    >;
    updateBoardComment?: Resolver<
        ResolversTypes['BoardCommentResponseDTO'],
        ParentType,
        ContextType,
        RequireFields<
            MutationUpdateBoardCommentArgs,
            'boardId' | 'commentId' | 'updateBoardComment'
        >
    >;
};

export type QueryResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['Query'] = ResolversParentTypes['Query'],
> = {
    getBoard?: Resolver<
        ResolversTypes['BoardSchema'],
        ParentType,
        ContextType,
        RequireFields<QueryGetBoardArgs, 'boardId'>
    >;
    getBoardComment?: Resolver<
        Array<ResolversTypes['BoardCommentResponseDTO']>,
        ParentType,
        ContextType,
        RequireFields<QueryGetBoardCommentArgs, 'boardId'>
    >;
    getBoardReaction?: Resolver<
        ResolversTypes['BoardReactionSchema'],
        ParentType,
        ContextType,
        RequireFields<QueryGetBoardReactionArgs, 'boardId'>
    >;
    getBoards?: Resolver<
        ResolversTypes['BoardPaginationResponse'],
        ParentType,
        ContextType,
        Partial<QueryGetBoardsArgs>
    >;
};

export type Resolvers<ContextType = any> = {
    BoardAddressOutput?: BoardAddressOutputResolvers<ContextType>;
    BoardCommentResponseDTO?: BoardCommentResponseDtoResolvers<ContextType>;
    BoardPaginationResponse?: BoardPaginationResponseResolvers<ContextType>;
    BoardReactionSchema?: BoardReactionSchemaResolvers<ContextType>;
    BoardSchema?: BoardSchemaResolvers<ContextType>;
    DateTime?: GraphQLScalarType;
    Mutation?: MutationResolvers<ContextType>;
    Query?: QueryResolvers<ContextType>;
};
