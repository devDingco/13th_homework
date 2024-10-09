/** @format */

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
	[_ in K]?: never;
};
export type Incremental<T> =
	| T
	| { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: { input: string; output: string };
	String: { input: string; output: string };
	Boolean: { input: boolean; output: boolean };
	Int: { input: number; output: number };
	Float: { input: number; output: number };
	DateTime: { input: string; output: string };
};

export type BoardCommentResponseDto = {
	__typename?: 'BoardCommentResponseDto';
	_id: Scalars['ID']['output'];
	author: Scalars['String']['output'];
	boardId: Scalars['Int']['output'];
	content: Scalars['String']['output'];
	createdAt: Scalars['DateTime']['output'];
	deletedAt: Scalars['DateTime']['output'];
	parentId?: Maybe<Scalars['ID']['output']>;
	rating: Scalars['Int']['output'];
	updatedAt: Scalars['DateTime']['output'];
};

export type BoardPasswordDto = {
	password: Scalars['String']['input'];
};

export type BoardReaction = {
	__typename?: 'BoardReaction';
	boardId: Scalars['Int']['output'];
	createdAt: Scalars['DateTime']['output'];
	hate: Scalars['Int']['output'];
	like: Scalars['Int']['output'];
	updatedAt: Scalars['DateTime']['output'];
};

export type BoardResponseDto = {
	__typename?: 'BoardResponseDto';
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
	createBoardComment: BoardCommentResponseDto;
	deleteBoard: Scalars['Boolean']['output'];
	deleteBoardComment: Scalars['Boolean']['output'];
	updateBoard: BoardResponseDto;
	updateBoardComment: BoardCommentResponseDto;
	updateBoards: BoardResponseDto;
	validateBoardData: Scalars['Boolean']['output'];
};

export type MutationCreateBoardArgs = {
	createBoardDto: CreateBoardDto;
};

export type MutationCreateBoardCommentArgs = {
	boardId: Scalars['Int']['input'];
	createBoardCommentDTO: CreateBoardCommentDto;
};

export type MutationDeleteBoardArgs = {
	boardId: Scalars['Int']['input'];
};

export type MutationDeleteBoardCommentArgs = {
	boardId: Scalars['Int']['input'];
	commentId: Scalars['String']['input'];
};

export type MutationUpdateBoardArgs = {
	boardId: Scalars['Int']['input'];
	createBoardDto: CreateBoardDto;
};

export type MutationUpdateBoardCommentArgs = {
	boardId: Scalars['Int']['input'];
	commentId: Scalars['String']['input'];
	password: Scalars['String']['input'];
	updateBoardCommentDTO: UpdateBoardCommentGraphDto;
};

export type MutationUpdateBoardsArgs = {
	boardId: Scalars['Int']['input'];
	createBoardDto: CreateBoardDto;
};

export type MutationValidateBoardDataArgs = {
	boardId: Scalars['Int']['input'];
	boardPasswordDTO: BoardPasswordDto;
};

export type Query = {
	__typename?: 'Query';
	getAllBoardComment: Array<BoardCommentResponseDto>;
	getBoard: BoardResponseDto;
	getBoardReaction: BoardReaction;
	getBoards: Array<BoardResponseDto>;
};

export type QueryGetAllBoardCommentArgs = {
	boardId: Scalars['Int']['input'];
};

export type QueryGetBoardArgs = {
	boardId: Scalars['Int']['input'];
};

export type QueryGetBoardReactionArgs = {
	boardId: Scalars['Int']['input'];
};

export type UpdateBoardCommentGraphDto = {
	content: Scalars['String']['input'];
	parentId?: InputMaybe<Scalars['ID']['input']>;
	rating: Scalars['Int']['input'];
};

export type GetBoardsQueryVariables = Exact<{ [key: string]: never }>;

export type GetBoardsQuery = {
	__typename?: 'Query';
	getBoards: Array<{
		__typename?: 'BoardResponseDto';
		author: string;
		title: string;
		content: string;
		boardId: number;
		createdAt: any;
		updatedAt: any;
	}>;
};
