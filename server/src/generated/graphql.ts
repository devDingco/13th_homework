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
    DateTime: { input: any; output: any };
};

export type BoardCommentResponse = {
    __typename?: 'BoardCommentResponse';
    _id: Scalars['ID']['output'];
    author: Scalars['String']['output'];
    boardId: Scalars['Int']['output'];
    content: Scalars['String']['output'];
    createdAt: Scalars['DateTime']['output'];
    parentId?: Maybe<Scalars['ID']['output']>;
    rating: Scalars['Int']['output'];
    replies?: Maybe<Array<BoardCommentResponse>>;
    updatedAt: Scalars['DateTime']['output'];
};

export type BoardReaction = {
    __typename?: 'BoardReaction';
    _id: Scalars['ID']['output'];
    boardId: Scalars['Int']['output'];
    createdAt: Scalars['DateTime']['output'];
    hate: Scalars['Int']['output'];
    like: Scalars['Int']['output'];
    updatedAt: Scalars['DateTime']['output'];
};

export type BoardResponseDto = {
    __typename?: 'BoardResponseDto';
    _id: Scalars['ID']['output'];
    address?: Maybe<Scalars['String']['output']>;
    author: Scalars['String']['output'];
    boardId: Scalars['Int']['output'];
    content: Scalars['String']['output'];
    createdAt: Scalars['DateTime']['output'];
    detailAddress?: Maybe<Scalars['String']['output']>;
    imageUrl?: Maybe<Array<Scalars['String']['output']>>;
    title: Scalars['String']['output'];
    updatedAt: Scalars['DateTime']['output'];
    youtubeUrl?: Maybe<Scalars['String']['output']>;
};

export type CreateBoardCommentDto = {
    author: Scalars['String']['input'];
    content: Scalars['String']['input'];
    parentId?: InputMaybe<Scalars['ID']['input']>;
    password: Scalars['String']['input'];
    rating: Scalars['Int']['input'];
};

export type CreateBoardDto = {
    address?: InputMaybe<Scalars['String']['input']>;
    author: Scalars['String']['input'];
    content: Scalars['String']['input'];
    detailAddress?: InputMaybe<Scalars['String']['input']>;
    imageUrl?: InputMaybe<Array<Scalars['String']['input']>>;
    password: Scalars['String']['input'];
    title: Scalars['String']['input'];
    youtubeUrl?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
    __typename?: 'Mutation';
    clearBoard: Scalars['Boolean']['output'];
    createBoard: BoardResponseDto;
    createBoardComment: BoardCommentResponse;
    deleteBoard: Scalars['Boolean']['output'];
    deleteBoardComment: Scalars['Boolean']['output'];
    isPasswordCorrect: Scalars['Boolean']['output'];
    updateBoard: BoardResponseDto;
    updateBoardComment: BoardCommentResponse;
};

export type MutationCreateBoardArgs = {
    createBoard: CreateBoardDto;
};

export type MutationCreateBoardCommentArgs = {
    boardId: Scalars['Int']['input'];
    createBoardComment: CreateBoardCommentDto;
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
    updateBoard: UpdateBoardDto;
};

export type MutationUpdateBoardCommentArgs = {
    boardId: Scalars['Int']['input'];
    parentId: Scalars['String']['input'];
    updateBoardComment: UpdateBoardCommentDto;
};

export type Query = {
    __typename?: 'Query';
    getBoard: BoardResponseDto;
    getBoardComment: Array<BoardCommentResponse>;
    getBoardReaction: BoardReaction;
    getBoards: Array<BoardResponseDto>;
};

export type QueryGetBoardArgs = {
    boardId: Scalars['Int']['input'];
};

export type QueryGetBoardCommentArgs = {
    boardId: Scalars['Int']['input'];
};

export type QueryGetBoardReactionArgs = {
    boardId: Scalars['Int']['input'];
};

export type UpdateBoardCommentDto = {
    author?: InputMaybe<Scalars['String']['input']>;
    content?: InputMaybe<Scalars['String']['input']>;
    parentId?: InputMaybe<Scalars['ID']['input']>;
    password: Scalars['String']['input'];
    rating?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateBoardDto = {
    address?: InputMaybe<Scalars['String']['input']>;
    content: Scalars['String']['input'];
    detailAddress?: InputMaybe<Scalars['String']['input']>;
    imageUrl?: InputMaybe<Array<Scalars['String']['input']>>;
    title: Scalars['String']['input'];
    youtubeUrl?: InputMaybe<Scalars['String']['input']>;
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
    BoardCommentResponse: ResolverTypeWrapper<BoardCommentResponse>;
    BoardReaction: ResolverTypeWrapper<BoardReaction>;
    BoardResponseDto: ResolverTypeWrapper<BoardResponseDto>;
    Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
    CreateBoardCommentDto: CreateBoardCommentDto;
    CreateBoardDto: CreateBoardDto;
    DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
    ID: ResolverTypeWrapper<Scalars['ID']['output']>;
    Int: ResolverTypeWrapper<Scalars['Int']['output']>;
    Mutation: ResolverTypeWrapper<{}>;
    Query: ResolverTypeWrapper<{}>;
    String: ResolverTypeWrapper<Scalars['String']['output']>;
    UpdateBoardCommentDto: UpdateBoardCommentDto;
    UpdateBoardDto: UpdateBoardDto;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
    BoardCommentResponse: BoardCommentResponse;
    BoardReaction: BoardReaction;
    BoardResponseDto: BoardResponseDto;
    Boolean: Scalars['Boolean']['output'];
    CreateBoardCommentDto: CreateBoardCommentDto;
    CreateBoardDto: CreateBoardDto;
    DateTime: Scalars['DateTime']['output'];
    ID: Scalars['ID']['output'];
    Int: Scalars['Int']['output'];
    Mutation: {};
    Query: {};
    String: Scalars['String']['output'];
    UpdateBoardCommentDto: UpdateBoardCommentDto;
    UpdateBoardDto: UpdateBoardDto;
};

export type BoardCommentResponseResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['BoardCommentResponse'] = ResolversParentTypes['BoardCommentResponse'],
> = {
    _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    author?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    boardId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    parentId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
    rating?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    replies?: Resolver<
        Maybe<Array<ResolversTypes['BoardCommentResponse']>>,
        ParentType,
        ContextType
    >;
    updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BoardReactionResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['BoardReaction'] = ResolversParentTypes['BoardReaction'],
> = {
    _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    boardId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    hate?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    like?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BoardResponseDtoResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['BoardResponseDto'] = ResolversParentTypes['BoardResponseDto'],
> = {
    _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    address?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >;
    author?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    boardId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    detailAddress?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >;
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
        ResolversTypes['BoardResponseDto'],
        ParentType,
        ContextType,
        RequireFields<MutationCreateBoardArgs, 'createBoard'>
    >;
    createBoardComment?: Resolver<
        ResolversTypes['BoardCommentResponse'],
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
        ResolversTypes['BoardResponseDto'],
        ParentType,
        ContextType,
        RequireFields<MutationUpdateBoardArgs, 'boardId' | 'updateBoard'>
    >;
    updateBoardComment?: Resolver<
        ResolversTypes['BoardCommentResponse'],
        ParentType,
        ContextType,
        RequireFields<
            MutationUpdateBoardCommentArgs,
            'boardId' | 'parentId' | 'updateBoardComment'
        >
    >;
};

export type QueryResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['Query'] = ResolversParentTypes['Query'],
> = {
    getBoard?: Resolver<
        ResolversTypes['BoardResponseDto'],
        ParentType,
        ContextType,
        RequireFields<QueryGetBoardArgs, 'boardId'>
    >;
    getBoardComment?: Resolver<
        Array<ResolversTypes['BoardCommentResponse']>,
        ParentType,
        ContextType,
        RequireFields<QueryGetBoardCommentArgs, 'boardId'>
    >;
    getBoardReaction?: Resolver<
        ResolversTypes['BoardReaction'],
        ParentType,
        ContextType,
        RequireFields<QueryGetBoardReactionArgs, 'boardId'>
    >;
    getBoards?: Resolver<
        Array<ResolversTypes['BoardResponseDto']>,
        ParentType,
        ContextType
    >;
};

export type Resolvers<ContextType = any> = {
    BoardCommentResponse?: BoardCommentResponseResolvers<ContextType>;
    BoardReaction?: BoardReactionResolvers<ContextType>;
    BoardResponseDto?: BoardResponseDtoResolvers<ContextType>;
    DateTime?: GraphQLScalarType;
    Mutation?: MutationResolvers<ContextType>;
    Query?: QueryResolvers<ContextType>;
};
