/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
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
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
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
  /** The `Upload` scalar type represents a file upload. */
  Upload: { input: any; output: any };
};

export type Board = {
  __typename?: "Board";
  _id: Scalars["ID"]["output"];
  boardAddress?: Maybe<BoardAddress>;
  contents: Scalars["String"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  deletedAt?: Maybe<Scalars["DateTime"]["output"]>;
  dislikeCount: Scalars["Int"]["output"];
  images?: Maybe<Array<Scalars["String"]["output"]>>;
  likeCount: Scalars["Int"]["output"];
  title: Scalars["String"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
  user?: Maybe<User>;
  writer?: Maybe<Scalars["String"]["output"]>;
  youtubeUrl?: Maybe<Scalars["String"]["output"]>;
};

export type BoardAddress = {
  __typename?: "BoardAddress";
  _id: Scalars["ID"]["output"];
  address?: Maybe<Scalars["String"]["output"]>;
  addressDetail?: Maybe<Scalars["String"]["output"]>;
  createdAt: Scalars["DateTime"]["output"];
  deletedAt?: Maybe<Scalars["DateTime"]["output"]>;
  updatedAt: Scalars["DateTime"]["output"];
  zipcode?: Maybe<Scalars["String"]["output"]>;
};

export type BoardAddressInput = {
  address?: InputMaybe<Scalars["String"]["input"]>;
  addressDetail?: InputMaybe<Scalars["String"]["input"]>;
  zipcode?: InputMaybe<Scalars["String"]["input"]>;
};

export type BoardComment = {
  __typename?: "BoardComment";
  _id: Scalars["ID"]["output"];
  contents: Scalars["String"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  deletedAt?: Maybe<Scalars["DateTime"]["output"]>;
  rating: Scalars["Float"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
  user?: Maybe<User>;
  writer?: Maybe<Scalars["String"]["output"]>;
};

export type CreateBoardCommentInput = {
  contents: Scalars["String"]["input"];
  password?: InputMaybe<Scalars["String"]["input"]>;
  rating: Scalars["Float"]["input"];
  writer?: InputMaybe<Scalars["String"]["input"]>;
};

export type CreateBoardInput = {
  boardAddress?: InputMaybe<BoardAddressInput>;
  contents: Scalars["String"]["input"];
  images?: InputMaybe<Array<Scalars["String"]["input"]>>;
  password?: InputMaybe<Scalars["String"]["input"]>;
  title: Scalars["String"]["input"];
  writer?: InputMaybe<Scalars["String"]["input"]>;
  youtubeUrl?: InputMaybe<Scalars["String"]["input"]>;
};

export type CreateTravelproductInput = {
  contents: Scalars["String"]["input"];
  images?: InputMaybe<Array<Scalars["String"]["input"]>>;
  name: Scalars["String"]["input"];
  price: Scalars["Int"]["input"];
  remarks: Scalars["String"]["input"];
  tags?: InputMaybe<Array<Scalars["String"]["input"]>>;
  travelproductAddress?: InputMaybe<TravelproductAddressInput>;
};

export type CreateTravelproductQuestionAnswerInput = {
  contents: Scalars["String"]["input"];
};

export type CreateTravelproductQuestionInput = {
  contents: Scalars["String"]["input"];
};

export type CreateUserInput = {
  email: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type FileManager = {
  __typename?: "FileManager";
  _id: Scalars["ID"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  deletedAt?: Maybe<Scalars["DateTime"]["output"]>;
  isUsed: Scalars["Boolean"]["output"];
  size?: Maybe<Scalars["Float"]["output"]>;
  updatedAt: Scalars["DateTime"]["output"];
  url: Scalars["String"]["output"];
};

export type Mutation = {
  __typename?: "Mutation";
  createBoard: Board;
  createBoardComment: BoardComment;
  createPointTransactionOfBuyingAndSelling: Travelproduct;
  createPointTransactionOfLoading: PointTransaction;
  createTravelproduct: Travelproduct;
  createTravelproductQuestion: TravelproductQuestion;
  createTravelproductQuestionAnswer: TravelproductQuestionAnswer;
  createUser: User;
  deleteBoard: Scalars["ID"]["output"];
  deleteBoardComment: Scalars["ID"]["output"];
  deleteBoards: Array<Scalars["ID"]["output"]>;
  deleteTravelproduct: Scalars["ID"]["output"];
  deleteTravelproductQuestion: Scalars["ID"]["output"];
  deleteTravelproductQuestionAnswer: Scalars["String"]["output"];
  dislikeBoard: Scalars["Int"]["output"];
  likeBoard: Scalars["Int"]["output"];
  loginUser: Token;
  loginUserExample: Token;
  logoutUser: Scalars["Boolean"]["output"];
  resetUserPassword: Scalars["Boolean"]["output"];
  restoreAccessToken: Token;
  toggleTravelproductPick: Scalars["Int"]["output"];
  updateBoard: Board;
  updateBoardComment: BoardComment;
  updateTravelproduct: Travelproduct;
  updateTravelproductQuestion: TravelproductQuestion;
  updateTravelproductQuestionAnswer: TravelproductQuestionAnswer;
  updateUser: User;
  uploadFile: FileManager;
};

export type MutationCreateBoardArgs = {
  createBoardInput: CreateBoardInput;
};

export type MutationCreateBoardCommentArgs = {
  boardId: Scalars["ID"]["input"];
  createBoardCommentInput: CreateBoardCommentInput;
};

export type MutationCreatePointTransactionOfBuyingAndSellingArgs = {
  useritemId: Scalars["ID"]["input"];
};

export type MutationCreatePointTransactionOfLoadingArgs = {
  paymentId: Scalars["ID"]["input"];
};

export type MutationCreateTravelproductArgs = {
  createTravelproductInput: CreateTravelproductInput;
};

export type MutationCreateTravelproductQuestionArgs = {
  createTravelproductQuestionInput: CreateTravelproductQuestionInput;
  travelproductId: Scalars["ID"]["input"];
};

export type MutationCreateTravelproductQuestionAnswerArgs = {
  createTravelproductQuestionAnswerInput: CreateTravelproductQuestionAnswerInput;
  travelproductQuestionId: Scalars["ID"]["input"];
};

export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};

export type MutationDeleteBoardArgs = {
  boardId: Scalars["ID"]["input"];
};

export type MutationDeleteBoardCommentArgs = {
  boardCommentId: Scalars["ID"]["input"];
  password?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationDeleteBoardsArgs = {
  boardIds: Array<Scalars["ID"]["input"]>;
};

export type MutationDeleteTravelproductArgs = {
  travelproductId: Scalars["ID"]["input"];
};

export type MutationDeleteTravelproductQuestionArgs = {
  travelproductQuestionId: Scalars["ID"]["input"];
};

export type MutationDeleteTravelproductQuestionAnswerArgs = {
  travelproductQuestionAnswerId: Scalars["ID"]["input"];
};

export type MutationDislikeBoardArgs = {
  boardId: Scalars["ID"]["input"];
};

export type MutationLikeBoardArgs = {
  boardId: Scalars["ID"]["input"];
};

export type MutationLoginUserArgs = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type MutationLoginUserExampleArgs = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type MutationResetUserPasswordArgs = {
  password: Scalars["String"]["input"];
};

export type MutationToggleTravelproductPickArgs = {
  travelproductId: Scalars["ID"]["input"];
};

export type MutationUpdateBoardArgs = {
  boardId: Scalars["ID"]["input"];
  password?: InputMaybe<Scalars["String"]["input"]>;
  updateBoardInput: UpdateBoardInput;
};

export type MutationUpdateBoardCommentArgs = {
  boardCommentId: Scalars["ID"]["input"];
  password?: InputMaybe<Scalars["String"]["input"]>;
  updateBoardCommentInput: UpdateBoardCommentInput;
};

export type MutationUpdateTravelproductArgs = {
  travelproductId: Scalars["ID"]["input"];
  updateTravelproductInput: UpdateTravelproductInput;
};

export type MutationUpdateTravelproductQuestionArgs = {
  travelproductQuestionId: Scalars["ID"]["input"];
  updateTravelproductQuestionInput: UpdateTravelproductQuestionInput;
};

export type MutationUpdateTravelproductQuestionAnswerArgs = {
  travelproductQuestionAnswerId: Scalars["ID"]["input"];
  updateTravelproductQuestionAnswerInput: UpdateTravelproductQuestionAnswerInput;
};

export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};

export type MutationUploadFileArgs = {
  file: Scalars["Upload"]["input"];
};

export type PointTransaction = {
  __typename?: "PointTransaction";
  _id: Scalars["ID"]["output"];
  amount: Scalars["Int"]["output"];
  balance: Scalars["Int"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  deletedAt?: Maybe<Scalars["DateTime"]["output"]>;
  impUid?: Maybe<Scalars["ID"]["output"]>;
  status: Scalars["String"]["output"];
  statusDetail: Scalars["String"]["output"];
  travelproduct?: Maybe<Travelproduct>;
  updatedAt: Scalars["DateTime"]["output"];
  user?: Maybe<User>;
};

export type Query = {
  __typename?: "Query";
  fetchBoard: Board;
  fetchBoardComments: Array<BoardComment>;
  fetchBoards: Array<Board>;
  fetchBoardsCount: Scalars["Int"]["output"];
  fetchBoardsCountOfMine: Scalars["Int"]["output"];
  fetchBoardsOfMine: Array<Board>;
  fetchBoardsOfTheBest: Array<Board>;
  fetchPointTransactions: Array<PointTransaction>;
  fetchPointTransactionsCountOfBuying: Scalars["Int"]["output"];
  fetchPointTransactionsCountOfLoading: Scalars["Int"]["output"];
  fetchPointTransactionsCountOfSelling: Scalars["Int"]["output"];
  fetchPointTransactionsOfBuying: Array<PointTransaction>;
  fetchPointTransactionsOfLoading: Array<PointTransaction>;
  fetchPointTransactionsOfSelling: Array<PointTransaction>;
  fetchTravelproduct: Travelproduct;
  fetchTravelproductQuestionAnswers: Array<TravelproductQuestionAnswer>;
  fetchTravelproductQuestions: Array<TravelproductQuestion>;
  fetchTravelproducts: Array<Travelproduct>;
  fetchTravelproductsCountIBought: Scalars["Int"]["output"];
  fetchTravelproductsCountIPicked: Scalars["Int"]["output"];
  fetchTravelproductsCountISold: Scalars["Int"]["output"];
  fetchTravelproductsIBought: Array<Travelproduct>;
  fetchTravelproductsIPicked: Array<Travelproduct>;
  fetchTravelproductsISold: Array<Travelproduct>;
  fetchTravelproductsOfTheBest: Array<Travelproduct>;
  fetchUserLoggedIn: User;
};

export type QueryFetchBoardArgs = {
  boardId: Scalars["ID"]["input"];
};

export type QueryFetchBoardCommentsArgs = {
  boardId: Scalars["ID"]["input"];
  page?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryFetchBoardsArgs = {
  endDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  startDate?: InputMaybe<Scalars["DateTime"]["input"]>;
};

export type QueryFetchBoardsCountArgs = {
  endDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  startDate?: InputMaybe<Scalars["DateTime"]["input"]>;
};

export type QueryFetchPointTransactionsArgs = {
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryFetchPointTransactionsOfBuyingArgs = {
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryFetchPointTransactionsOfLoadingArgs = {
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryFetchPointTransactionsOfSellingArgs = {
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryFetchTravelproductArgs = {
  travelproductId: Scalars["ID"]["input"];
};

export type QueryFetchTravelproductQuestionAnswersArgs = {
  page?: InputMaybe<Scalars["Int"]["input"]>;
  travelproductQuestionId: Scalars["ID"]["input"];
};

export type QueryFetchTravelproductQuestionsArgs = {
  page?: InputMaybe<Scalars["Int"]["input"]>;
  travelproductId: Scalars["ID"]["input"];
};

export type QueryFetchTravelproductsArgs = {
  isSoldout?: InputMaybe<Scalars["Boolean"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryFetchTravelproductsIBoughtArgs = {
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryFetchTravelproductsIPickedArgs = {
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryFetchTravelproductsISoldArgs = {
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
};

export type Token = {
  __typename?: "Token";
  accessToken: Scalars["String"]["output"];
};

export type Travelproduct = {
  __typename?: "Travelproduct";
  _id: Scalars["ID"]["output"];
  buyer?: Maybe<User>;
  contents: Scalars["String"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  deletedAt?: Maybe<Scalars["DateTime"]["output"]>;
  images?: Maybe<Array<Scalars["String"]["output"]>>;
  name: Scalars["String"]["output"];
  pickedCount?: Maybe<Scalars["Int"]["output"]>;
  price?: Maybe<Scalars["Int"]["output"]>;
  remarks: Scalars["String"]["output"];
  seller?: Maybe<User>;
  soldAt?: Maybe<Scalars["DateTime"]["output"]>;
  tags?: Maybe<Array<Scalars["String"]["output"]>>;
  travelproductAddress?: Maybe<TravelproductAddress>;
  updatedAt: Scalars["DateTime"]["output"];
};

export type TravelproductAddress = {
  __typename?: "TravelproductAddress";
  _id: Scalars["ID"]["output"];
  address?: Maybe<Scalars["String"]["output"]>;
  addressDetail?: Maybe<Scalars["String"]["output"]>;
  createdAt: Scalars["DateTime"]["output"];
  deletedAt?: Maybe<Scalars["DateTime"]["output"]>;
  lat?: Maybe<Scalars["Float"]["output"]>;
  lng?: Maybe<Scalars["Float"]["output"]>;
  updatedAt: Scalars["DateTime"]["output"];
  zipcode?: Maybe<Scalars["String"]["output"]>;
};

export type TravelproductAddressInput = {
  address?: InputMaybe<Scalars["String"]["input"]>;
  addressDetail?: InputMaybe<Scalars["String"]["input"]>;
  lat?: InputMaybe<Scalars["Float"]["input"]>;
  lng?: InputMaybe<Scalars["Float"]["input"]>;
  zipcode?: InputMaybe<Scalars["String"]["input"]>;
};

export type TravelproductQuestion = {
  __typename?: "TravelproductQuestion";
  _id: Scalars["ID"]["output"];
  contents: Scalars["String"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  deletedAt?: Maybe<Scalars["DateTime"]["output"]>;
  travelproduct: Travelproduct;
  updatedAt: Scalars["DateTime"]["output"];
  user: User;
};

export type TravelproductQuestionAnswer = {
  __typename?: "TravelproductQuestionAnswer";
  _id: Scalars["ID"]["output"];
  contents: Scalars["String"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  deletedAt?: Maybe<Scalars["DateTime"]["output"]>;
  travelproductQuestion: TravelproductQuestion;
  updatedAt: Scalars["DateTime"]["output"];
  user: User;
};

export type UpdateBoardCommentInput = {
  contents?: InputMaybe<Scalars["String"]["input"]>;
  rating?: InputMaybe<Scalars["Float"]["input"]>;
};

export type UpdateBoardInput = {
  boardAddress?: InputMaybe<BoardAddressInput>;
  contents?: InputMaybe<Scalars["String"]["input"]>;
  images?: InputMaybe<Array<Scalars["String"]["input"]>>;
  title?: InputMaybe<Scalars["String"]["input"]>;
  youtubeUrl?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateTravelproductInput = {
  contents?: InputMaybe<Scalars["String"]["input"]>;
  images?: InputMaybe<Array<Scalars["String"]["input"]>>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  price?: InputMaybe<Scalars["Int"]["input"]>;
  remarks?: InputMaybe<Scalars["String"]["input"]>;
  tags?: InputMaybe<Array<Scalars["String"]["input"]>>;
  travelproductAddress?: InputMaybe<TravelproductAddressInput>;
};

export type UpdateTravelproductQuestionAnswerInput = {
  contents: Scalars["String"]["input"];
};

export type UpdateTravelproductQuestionInput = {
  contents: Scalars["String"]["input"];
};

export type UpdateUserInput = {
  name?: InputMaybe<Scalars["String"]["input"]>;
  picture?: InputMaybe<Scalars["String"]["input"]>;
};

export type User = {
  __typename?: "User";
  _id: Scalars["ID"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  deletedAt?: Maybe<Scalars["DateTime"]["output"]>;
  email: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  picture?: Maybe<Scalars["String"]["output"]>;
  updatedAt: Scalars["DateTime"]["output"];
  userPoint?: Maybe<UserPoint>;
};

export type UserPoint = {
  __typename?: "UserPoint";
  _id: Scalars["ID"]["output"];
  amount: Scalars["Int"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  deletedAt?: Maybe<Scalars["DateTime"]["output"]>;
  updatedAt: Scalars["DateTime"]["output"];
  user: User;
};

export type CreateUserMutationVariables = Exact<{
  createUserInput: CreateUserInput;
}>;

export type CreateUserMutation = {
  __typename?: "Mutation";
  createUser: { __typename?: "User"; _id: string; email: string; name: string };
};

export type LoginUserMutationVariables = Exact<{
  password: Scalars["String"]["input"];
  email: Scalars["String"]["input"];
}>;

export type LoginUserMutation = {
  __typename?: "Mutation";
  loginUser: { __typename?: "Token"; accessToken: string };
};

export type LogoutUserMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutUserMutation = {
  __typename?: "Mutation";
  logoutUser: boolean;
};

export type RestoreAccessTokenMutationVariables = Exact<{
  [key: string]: never;
}>;

export type RestoreAccessTokenMutation = {
  __typename?: "Mutation";
  restoreAccessToken: { __typename?: "Token"; accessToken: string };
};

export type FetchBoardCommentsQueryVariables = Exact<{
  page?: InputMaybe<Scalars["Int"]["input"]>;
  boardId: Scalars["ID"]["input"];
}>;

export type FetchBoardCommentsQuery = {
  __typename?: "Query";
  fetchBoardComments: Array<{
    __typename?: "BoardComment";
    _id: string;
    writer?: string | null;
    contents: string;
    rating: number;
    createdAt: any;
    updatedAt: any;
    deletedAt?: any | null;
    user?: {
      __typename?: "User";
      _id: string;
      email: string;
      name: string;
      picture?: string | null;
    } | null;
  }>;
};

export type DeleteBoardCommentMutationVariables = Exact<{
  password?: InputMaybe<Scalars["String"]["input"]>;
  boardCommentId: Scalars["ID"]["input"];
}>;

export type DeleteBoardCommentMutation = {
  __typename?: "Mutation";
  deleteBoardComment: string;
};

export type UpdateBoardCommentMutationVariables = Exact<{
  updateBoardCommentInput: UpdateBoardCommentInput;
  password?: InputMaybe<Scalars["String"]["input"]>;
  boardCommentId: Scalars["ID"]["input"];
}>;

export type UpdateBoardCommentMutation = {
  __typename?: "Mutation";
  updateBoardComment: { __typename?: "BoardComment"; _id: string };
};

export type CreateBoardCommentMutationVariables = Exact<{
  createBoardCommentInput: CreateBoardCommentInput;
  boardId: Scalars["ID"]["input"];
}>;

export type CreateBoardCommentMutation = {
  __typename?: "Mutation";
  createBoardComment: {
    __typename?: "BoardComment";
    _id: string;
    writer?: string | null;
    contents: string;
    rating: number;
  };
};

export type FetchBoardDetailQueryVariables = Exact<{
  boardId: Scalars["ID"]["input"];
}>;

export type FetchBoardDetailQuery = {
  __typename?: "Query";
  fetchBoard: {
    __typename?: "Board";
    _id: string;
    writer?: string | null;
    title: string;
    contents: string;
    youtubeUrl?: string | null;
    images?: Array<string> | null;
    createdAt: any;
    updatedAt: any;
    deletedAt?: any | null;
    boardAddress?: {
      __typename?: "BoardAddress";
      zipcode?: string | null;
      address?: string | null;
      addressDetail?: string | null;
    } | null;
    user?: {
      __typename?: "User";
      picture?: string | null;
      deletedAt?: any | null;
    } | null;
  };
};

export type FetchBoardsListQueryVariables = Exact<{
  endDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  startDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type FetchBoardsListQuery = {
  __typename?: "Query";
  fetchBoards: Array<{
    __typename?: "Board";
    _id: string;
    writer?: string | null;
    title: string;
    createdAt: any;
    images?: Array<string> | null;
    youtubeUrl?: string | null;
  }>;
};

export type DeleteBoardMutationVariables = Exact<{
  boardId: Scalars["ID"]["input"];
}>;

export type DeleteBoardMutation = {
  __typename?: "Mutation";
  deleteBoard: string;
};

export type FetchBoardsCountQueryVariables = Exact<{
  endDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  startDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type FetchBoardsCountQuery = {
  __typename?: "Query";
  fetchBoardsCount: number;
};

export type CreateBoardMutationVariables = Exact<{
  createBoardInput: CreateBoardInput;
}>;

export type CreateBoardMutation = {
  __typename?: "Mutation";
  createBoard: { __typename?: "Board"; _id: string };
};

export type UploadFileMutationVariables = Exact<{
  file: Scalars["Upload"]["input"];
}>;

export type UploadFileMutation = {
  __typename?: "Mutation";
  uploadFile: { __typename?: "FileManager"; _id: string; url: string };
};

export type UpdateBoardMutationVariables = Exact<{
  updateBoardInput: UpdateBoardInput;
  password?: InputMaybe<Scalars["String"]["input"]>;
  boardId: Scalars["ID"]["input"];
}>;

export type UpdateBoardMutation = {
  __typename?: "Mutation";
  updateBoard: { __typename?: "Board"; _id: string };
};

export type FetchBoardQueryVariables = Exact<{
  boardId: Scalars["ID"]["input"];
}>;

export type FetchBoardQuery = {
  __typename?: "Query";
  fetchBoard: {
    __typename?: "Board";
    _id: string;
    writer?: string | null;
    title: string;
    contents: string;
    youtubeUrl?: string | null;
    likeCount: number;
    dislikeCount: number;
    images?: Array<string> | null;
    createdAt: any;
    updatedAt: any;
    deletedAt?: any | null;
    boardAddress?: {
      __typename?: "BoardAddress";
      zipcode?: string | null;
      address?: string | null;
      addressDetail?: string | null;
    } | null;
    user?: {
      __typename?: "User";
      picture?: string | null;
      deletedAt?: any | null;
    } | null;
  };
};

export type LogoutUserMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutUserMutation = {
  __typename?: "Mutation";
  logoutUser: boolean;
};

export type FetchBoardsOfTheBestQueryVariables = Exact<{
  [key: string]: never;
}>;

export type FetchBoardsOfTheBestQuery = {
  __typename?: "Query";
  fetchBoardsOfTheBest: Array<{
    __typename?: "Board";
    _id: string;
    title: string;
    images?: Array<string> | null;
    writer?: string | null;
    createdAt: any;
    likeCount: number;
    user?: {
      __typename?: "User";
      picture?: string | null;
      name: string;
    } | null;
  }>;
};

export type FetchBoardLikeCountQueryVariables = Exact<{
  boardId: Scalars["ID"]["input"];
}>;

export type FetchBoardLikeCountQuery = {
  __typename?: "Query";
  fetchBoard: { __typename?: "Board"; likeCount: number; dislikeCount: number };
};

export type LikeBoardMutationVariables = Exact<{
  boardId: Scalars["ID"]["input"];
}>;

export type LikeBoardMutation = { __typename?: "Mutation"; likeBoard: number };

export type DislikeBoardMutationVariables = Exact<{
  boardId: Scalars["ID"]["input"];
}>;

export type DislikeBoardMutation = {
  __typename?: "Mutation";
  dislikeBoard: number;
};

export type FetchUserLoggedInQueryVariables = Exact<{ [key: string]: never }>;

export type FetchUserLoggedInQuery = {
  __typename?: "Query";
  fetchUserLoggedIn: {
    __typename?: "User";
    _id: string;
    email: string;
    name: string;
    picture?: string | null;
    createdAt: any;
    updatedAt: any;
    deletedAt?: any | null;
    userPoint?: {
      __typename?: "UserPoint";
      _id: string;
      amount: number;
      createdAt: any;
      updatedAt: any;
      deletedAt?: any | null;
    } | null;
  };
};

export type ResetUserPasswordMutationVariables = Exact<{
  password: Scalars["String"]["input"];
}>;

export type ResetUserPasswordMutation = {
  __typename?: "Mutation";
  resetUserPassword: boolean;
};

export type FetchTravelproductsIPickedQueryVariables = Exact<{
  search?: InputMaybe<Scalars["String"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type FetchTravelproductsIPickedQuery = {
  __typename?: "Query";
  fetchTravelproductsIPicked: Array<{
    __typename?: "Travelproduct";
    _id: string;
    name: string;
    price?: number | null;
    createdAt: any;
    updatedAt: any;
    deletedAt?: any | null;
  }>;
};

export type FetchTravelproductsCountIPickedQueryVariables = Exact<{
  [key: string]: never;
}>;

export type FetchTravelproductsCountIPickedQuery = {
  __typename?: "Query";
  fetchTravelproductsCountIPicked: number;
};

export type FetchPointTransactionsOfAllQueryVariables = Exact<{
  search?: InputMaybe<Scalars["String"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type FetchPointTransactionsOfAllQuery = {
  __typename?: "Query";
  fetchPointTransactionsOfBuying: Array<{
    __typename?: "PointTransaction";
    _id: string;
    impUid?: string | null;
    amount: number;
    balance: number;
    status: string;
    statusDetail: string;
    createdAt: any;
    updatedAt: any;
    deletedAt?: any | null;
    user?: { __typename?: "User"; name: string } | null;
  }>;
  fetchPointTransactionsOfLoading: Array<{
    __typename?: "PointTransaction";
    _id: string;
    impUid?: string | null;
    amount: number;
    balance: number;
    status: string;
    statusDetail: string;
    createdAt: any;
    updatedAt: any;
    deletedAt?: any | null;
    user?: { __typename?: "User"; name: string } | null;
  }>;
  fetchPointTransactionsOfSelling: Array<{
    __typename?: "PointTransaction";
    _id: string;
    impUid?: string | null;
    amount: number;
    balance: number;
    status: string;
    statusDetail: string;
    createdAt: any;
    updatedAt: any;
    deletedAt?: any | null;
    user?: { __typename?: "User"; name: string } | null;
  }>;
};

export type FetchPointTransactionsCountOfAllQueryVariables = Exact<{
  [key: string]: never;
}>;

export type FetchPointTransactionsCountOfAllQuery = {
  __typename?: "Query";
  fetchPointTransactionsCountOfBuying: number;
  fetchPointTransactionsCountOfLoading: number;
  fetchPointTransactionsCountOfSelling: number;
};

export type FetchPointTransactionsOfBuyingQueryVariables = Exact<{
  search?: InputMaybe<Scalars["String"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type FetchPointTransactionsOfBuyingQuery = {
  __typename?: "Query";
  fetchPointTransactionsOfBuying: Array<{
    __typename?: "PointTransaction";
    _id: string;
    impUid?: string | null;
    amount: number;
    balance: number;
    status: string;
    statusDetail: string;
    createdAt: any;
    updatedAt: any;
    deletedAt?: any | null;
    user?: { __typename?: "User"; name: string } | null;
  }>;
};

export type FetchPointTransactionsCountOfBuyingQueryVariables = Exact<{
  [key: string]: never;
}>;

export type FetchPointTransactionsCountOfBuyingQuery = {
  __typename?: "Query";
  fetchPointTransactionsCountOfBuying: number;
};

export type FetchPointTransactionsOfLoadingQueryVariables = Exact<{
  search?: InputMaybe<Scalars["String"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type FetchPointTransactionsOfLoadingQuery = {
  __typename?: "Query";
  fetchPointTransactionsOfLoading: Array<{
    __typename?: "PointTransaction";
    _id: string;
    impUid?: string | null;
    amount: number;
    balance: number;
    status: string;
    statusDetail: string;
    createdAt: any;
    updatedAt: any;
    deletedAt?: any | null;
    user?: { __typename?: "User"; name: string } | null;
  }>;
};

export type FetchPointTransactionsCountOfLoadingQueryVariables = Exact<{
  [key: string]: never;
}>;

export type FetchPointTransactionsCountOfLoadingQuery = {
  __typename?: "Query";
  fetchPointTransactionsCountOfLoading: number;
};

export type FetchPointTransactionsOfSellingQueryVariables = Exact<{
  search?: InputMaybe<Scalars["String"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type FetchPointTransactionsOfSellingQuery = {
  __typename?: "Query";
  fetchPointTransactionsOfSelling: Array<{
    __typename?: "PointTransaction";
    _id: string;
    impUid?: string | null;
    amount: number;
    balance: number;
    status: string;
    statusDetail: string;
    createdAt: any;
    updatedAt: any;
    deletedAt?: any | null;
    user?: { __typename?: "User"; name: string } | null;
  }>;
};

export type FetchPointTransactionsCountOfSellingQueryVariables = Exact<{
  [key: string]: never;
}>;

export type FetchPointTransactionsCountOfSellingQuery = {
  __typename?: "Query";
  fetchPointTransactionsCountOfSelling: number;
};

export type CreatePointTransactionOfBuyingAndSellingMutationVariables = Exact<{
  useritemId: Scalars["ID"]["input"];
}>;

export type CreatePointTransactionOfBuyingAndSellingMutation = {
  __typename?: "Mutation";
  createPointTransactionOfBuyingAndSelling: {
    __typename?: "Travelproduct";
    _id: string;
  };
};

export type DeleteTravelproductQuestionAnswerMutationVariables = Exact<{
  travelproductQuestionAnswerId: Scalars["ID"]["input"];
}>;

export type DeleteTravelproductQuestionAnswerMutation = {
  __typename?: "Mutation";
  deleteTravelproductQuestionAnswer: string;
};

export type FetchTravelproductQuestionAnswersQueryVariables = Exact<{
  page?: InputMaybe<Scalars["Int"]["input"]>;
  travelproductQuestionId: Scalars["ID"]["input"];
}>;

export type FetchTravelproductQuestionAnswersQuery = {
  __typename?: "Query";
  fetchTravelproductQuestionAnswers: Array<{
    __typename?: "TravelproductQuestionAnswer";
    _id: string;
    contents: string;
    createdAt: any;
    updatedAt: any;
    deletedAt?: any | null;
    user: {
      __typename?: "User";
      _id: string;
      name: string;
      picture?: string | null;
    };
  }>;
};

export type CreateTravelproductQuestionAnswerMutationVariables = Exact<{
  createTravelproductQuestionAnswerInput: CreateTravelproductQuestionAnswerInput;
  travelproductQuestionId: Scalars["ID"]["input"];
}>;

export type CreateTravelproductQuestionAnswerMutation = {
  __typename?: "Mutation";
  createTravelproductQuestionAnswer: {
    __typename?: "TravelproductQuestionAnswer";
    _id: string;
  };
};

export type UpdateTravelproductQuestionAnswerMutationVariables = Exact<{
  updateTravelproductQuestionAnswerInput: UpdateTravelproductQuestionAnswerInput;
  travelproductQuestionAnswerId: Scalars["ID"]["input"];
}>;

export type UpdateTravelproductQuestionAnswerMutation = {
  __typename?: "Mutation";
  updateTravelproductQuestionAnswer: {
    __typename?: "TravelproductQuestionAnswer";
    _id: string;
  };
};

export type DeleteTravelproductQuestionMutationVariables = Exact<{
  travelproductQuestionId: Scalars["ID"]["input"];
}>;

export type DeleteTravelproductQuestionMutation = {
  __typename?: "Mutation";
  deleteTravelproductQuestion: string;
};

export type FetchTravelproductQuestionsQueryVariables = Exact<{
  page?: InputMaybe<Scalars["Int"]["input"]>;
  travelproductId: Scalars["ID"]["input"];
}>;

export type FetchTravelproductQuestionsQuery = {
  __typename?: "Query";
  fetchTravelproductQuestions: Array<{
    __typename?: "TravelproductQuestion";
    _id: string;
    contents: string;
    createdAt: any;
    updatedAt: any;
    deletedAt?: any | null;
    user: {
      __typename?: "User";
      _id: string;
      name: string;
      picture?: string | null;
    };
  }>;
};

export type FetchTravelproductOfMineQueryVariables = Exact<{
  [key: string]: never;
}>;

export type FetchTravelproductOfMineQuery = {
  __typename?: "Query";
  fetchUserLoggedIn: { __typename?: "User"; _id: string };
};

export type CreateTravelproductQuestionMutationVariables = Exact<{
  createTravelproductQuestionInput: CreateTravelproductQuestionInput;
  travelproductId: Scalars["ID"]["input"];
}>;

export type CreateTravelproductQuestionMutation = {
  __typename?: "Mutation";
  createTravelproductQuestion: {
    __typename?: "TravelproductQuestion";
    _id: string;
  };
};

export type UpdateTravelproductQuestionMutationVariables = Exact<{
  updateTravelproductQuestionInput: UpdateTravelproductQuestionInput;
  travelproductQuestionId: Scalars["ID"]["input"];
}>;

export type UpdateTravelproductQuestionMutation = {
  __typename?: "Mutation";
  updateTravelproductQuestion: {
    __typename?: "TravelproductQuestion";
    _id: string;
  };
};

export type FetchTravelproductDetailQueryVariables = Exact<{
  travelproductId: Scalars["ID"]["input"];
}>;

export type FetchTravelproductDetailQuery = {
  __typename?: "Query";
  fetchTravelproduct: {
    __typename?: "Travelproduct";
    _id: string;
    name: string;
    remarks: string;
    contents: string;
    tags?: Array<string> | null;
    images?: Array<string> | null;
    pickedCount?: number | null;
    price?: number | null;
    seller?: {
      __typename?: "User";
      _id: string;
      name: string;
      picture?: string | null;
    } | null;
    travelproductAddress?: {
      __typename?: "TravelproductAddress";
      zipcode?: string | null;
      address?: string | null;
      addressDetail?: string | null;
      lat?: number | null;
      lng?: number | null;
    } | null;
  };
};

export type ToggleTravelproductPickMutationVariables = Exact<{
  travelproductId: Scalars["ID"]["input"];
}>;

export type ToggleTravelproductPickMutation = {
  __typename?: "Mutation";
  toggleTravelproductPick: number;
};

export type FetchTravelproductsQueryVariables = Exact<{
  isSoldout?: InputMaybe<Scalars["Boolean"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type FetchTravelproductsQuery = {
  __typename?: "Query";
  fetchTravelproducts: Array<{
    __typename?: "Travelproduct";
    _id: string;
    name: string;
    remarks: string;
    contents: string;
    price?: number | null;
    tags?: Array<string> | null;
    images?: Array<string> | null;
    pickedCount?: number | null;
    soldAt?: any | null;
    createdAt: any;
    updatedAt: any;
    deletedAt?: any | null;
    seller?: {
      __typename?: "User";
      name: string;
      picture?: string | null;
    } | null;
  }>;
};

export type FetchTravelproductsOfTheBestQueryVariables = Exact<{
  [key: string]: never;
}>;

export type FetchTravelproductsOfTheBestQuery = {
  __typename?: "Query";
  fetchTravelproductsOfTheBest: Array<{
    __typename?: "Travelproduct";
    _id: string;
    name: string;
    remarks: string;
    price?: number | null;
    tags?: Array<string> | null;
    images?: Array<string> | null;
    pickedCount?: number | null;
    soldAt?: any | null;
    deletedAt?: any | null;
  }>;
};

export type CreateTravelproductMutationVariables = Exact<{
  createTravelproductInput: CreateTravelproductInput;
}>;

export type CreateTravelproductMutation = {
  __typename?: "Mutation";
  createTravelproduct: { __typename?: "Travelproduct"; _id: string };
};

export type UpdateTravelproductMutationVariables = Exact<{
  updateTravelproductInput: UpdateTravelproductInput;
  travelproductId: Scalars["ID"]["input"];
}>;

export type UpdateTravelproductMutation = {
  __typename?: "Mutation";
  updateTravelproduct: { __typename?: "Travelproduct"; _id: string };
};

export const CreateUserDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "createUser" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "createUserInput" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CreateUserInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createUser" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "createUserInput" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "createUserInput" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "_id" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const LoginUserDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "loginUser" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "password" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "email" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "loginUser" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "password" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "password" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "email" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "email" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "accessToken" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LoginUserMutation, LoginUserMutationVariables>;
export const LogoutUserDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "logoutUser" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "logoutUser" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LogoutUserMutation, LogoutUserMutationVariables>;
export const RestoreAccessTokenDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "restoreAccessToken" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "restoreAccessToken" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "accessToken" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  RestoreAccessTokenMutation,
  RestoreAccessTokenMutationVariables
>;
export const FetchBoardCommentsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "fetchBoardComments" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "page" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "boardId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "fetchBoardComments" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "page" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "page" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "boardId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "boardId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "_id" } },
                { kind: "Field", name: { kind: "Name", value: "writer" } },
                { kind: "Field", name: { kind: "Name", value: "contents" } },
                { kind: "Field", name: { kind: "Name", value: "rating" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "user" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "_id" } },
                      { kind: "Field", name: { kind: "Name", value: "email" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "picture" },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
                { kind: "Field", name: { kind: "Name", value: "deletedAt" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  FetchBoardCommentsQuery,
  FetchBoardCommentsQueryVariables
>;
export const DeleteBoardCommentDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "deleteBoardComment" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "password" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "boardCommentId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteBoardComment" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "password" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "password" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "boardCommentId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "boardCommentId" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeleteBoardCommentMutation,
  DeleteBoardCommentMutationVariables
>;
export const UpdateBoardCommentDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "updateBoardComment" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "updateBoardCommentInput" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "UpdateBoardCommentInput" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "password" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "boardCommentId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateBoardComment" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "updateBoardCommentInput" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "updateBoardCommentInput" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "password" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "password" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "boardCommentId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "boardCommentId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "_id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateBoardCommentMutation,
  UpdateBoardCommentMutationVariables
>;
export const CreateBoardCommentDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "createBoardComment" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "createBoardCommentInput" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CreateBoardCommentInput" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "boardId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createBoardComment" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "createBoardCommentInput" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "createBoardCommentInput" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "boardId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "boardId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "_id" } },
                { kind: "Field", name: { kind: "Name", value: "writer" } },
                { kind: "Field", name: { kind: "Name", value: "contents" } },
                { kind: "Field", name: { kind: "Name", value: "rating" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateBoardCommentMutation,
  CreateBoardCommentMutationVariables
>;
export const FetchBoardDetailDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "fetchBoardDetail" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "boardId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "fetchBoard" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "boardId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "boardId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "_id" } },
                { kind: "Field", name: { kind: "Name", value: "writer" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "contents" } },
                { kind: "Field", name: { kind: "Name", value: "youtubeUrl" } },
                { kind: "Field", name: { kind: "Name", value: "images" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "boardAddress" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "zipcode" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "address" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "addressDetail" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "user" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "picture" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "deletedAt" },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
                { kind: "Field", name: { kind: "Name", value: "deletedAt" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  FetchBoardDetailQuery,
  FetchBoardDetailQueryVariables
>;
export const FetchBoardsListDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "fetchBoardsList" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "endDate" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "DateTime" },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "startDate" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "DateTime" },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "search" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "page" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "fetchBoards" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "endDate" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "endDate" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "startDate" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "startDate" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "search" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "search" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "page" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "page" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "_id" } },
                { kind: "Field", name: { kind: "Name", value: "writer" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                { kind: "Field", name: { kind: "Name", value: "images" } },
                { kind: "Field", name: { kind: "Name", value: "youtubeUrl" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  FetchBoardsListQuery,
  FetchBoardsListQueryVariables
>;
export const DeleteBoardDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "deleteBoard" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "boardId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteBoard" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "boardId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "boardId" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteBoardMutation, DeleteBoardMutationVariables>;
export const FetchBoardsCountDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "fetchBoardsCount" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "endDate" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "DateTime" },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "startDate" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "DateTime" },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "search" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "fetchBoardsCount" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "endDate" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "endDate" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "startDate" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "startDate" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "search" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "search" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  FetchBoardsCountQuery,
  FetchBoardsCountQueryVariables
>;
export const CreateBoardDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "createBoard" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "createBoardInput" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CreateBoardInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createBoard" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "createBoardInput" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "createBoardInput" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "_id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateBoardMutation, CreateBoardMutationVariables>;
export const UploadFileDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "uploadFile" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "file" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "Upload" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "uploadFile" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "file" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "file" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "_id" } },
                { kind: "Field", name: { kind: "Name", value: "url" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UploadFileMutation, UploadFileMutationVariables>;
export const UpdateBoardDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "updateBoard" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "updateBoardInput" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "UpdateBoardInput" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "password" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "boardId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateBoard" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "updateBoardInput" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "updateBoardInput" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "password" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "password" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "boardId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "boardId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "_id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateBoardMutation, UpdateBoardMutationVariables>;
export const FetchBoardDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "fetchBoard" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "boardId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "fetchBoard" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "boardId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "boardId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "_id" } },
                { kind: "Field", name: { kind: "Name", value: "writer" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "contents" } },
                { kind: "Field", name: { kind: "Name", value: "youtubeUrl" } },
                { kind: "Field", name: { kind: "Name", value: "likeCount" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "dislikeCount" },
                },
                { kind: "Field", name: { kind: "Name", value: "images" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "boardAddress" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "zipcode" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "address" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "addressDetail" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "user" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "picture" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "deletedAt" },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
                { kind: "Field", name: { kind: "Name", value: "deletedAt" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<FetchBoardQuery, FetchBoardQueryVariables>;
export const FetchBoardsOfTheBestDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "fetchBoardsOfTheBest" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "fetchBoardsOfTheBest" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "_id" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "images" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "user" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "picture" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "writer" } },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                { kind: "Field", name: { kind: "Name", value: "likeCount" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  FetchBoardsOfTheBestQuery,
  FetchBoardsOfTheBestQueryVariables
>;
export const FetchBoardLikeCountDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "fetchBoardLikeCount" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "boardId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "fetchBoard" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "boardId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "boardId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "likeCount" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "dislikeCount" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  FetchBoardLikeCountQuery,
  FetchBoardLikeCountQueryVariables
>;
export const LikeBoardDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "likeBoard" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "boardId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "likeBoard" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "boardId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "boardId" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LikeBoardMutation, LikeBoardMutationVariables>;
export const DislikeBoardDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "dislikeBoard" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "boardId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "dislikeBoard" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "boardId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "boardId" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DislikeBoardMutation,
  DislikeBoardMutationVariables
>;
export const FetchUserLoggedInDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "fetchUserLoggedIn" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "fetchUserLoggedIn" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "_id" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "picture" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "userPoint" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "_id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "amount" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "createdAt" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "updatedAt" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "deletedAt" },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
                { kind: "Field", name: { kind: "Name", value: "deletedAt" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  FetchUserLoggedInQuery,
  FetchUserLoggedInQueryVariables
>;
export const ResetUserPasswordDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "resetUserPassword" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "password" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "resetUserPassword" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "password" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "password" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ResetUserPasswordMutation,
  ResetUserPasswordMutationVariables
>;
export const FetchTravelproductsIPickedDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "fetchTravelproductsIPicked" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "search" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "page" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "fetchTravelproductsIPicked" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "search" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "search" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "page" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "page" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "_id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "price" } },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
                { kind: "Field", name: { kind: "Name", value: "deletedAt" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  FetchTravelproductsIPickedQuery,
  FetchTravelproductsIPickedQueryVariables
>;
export const FetchTravelproductsCountIPickedDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "fetchTravelproductsCountIPicked" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "fetchTravelproductsCountIPicked" },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  FetchTravelproductsCountIPickedQuery,
  FetchTravelproductsCountIPickedQueryVariables
>;
export const FetchPointTransactionsOfAllDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "fetchPointTransactionsOfAll" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "search" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "page" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "fetchPointTransactionsOfBuying" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "search" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "search" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "page" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "page" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "_id" } },
                { kind: "Field", name: { kind: "Name", value: "impUid" } },
                { kind: "Field", name: { kind: "Name", value: "amount" } },
                { kind: "Field", name: { kind: "Name", value: "balance" } },
                { kind: "Field", name: { kind: "Name", value: "status" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "statusDetail" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "user" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
                { kind: "Field", name: { kind: "Name", value: "deletedAt" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "fetchPointTransactionsOfLoading" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "search" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "search" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "page" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "page" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "_id" } },
                { kind: "Field", name: { kind: "Name", value: "impUid" } },
                { kind: "Field", name: { kind: "Name", value: "amount" } },
                { kind: "Field", name: { kind: "Name", value: "balance" } },
                { kind: "Field", name: { kind: "Name", value: "status" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "statusDetail" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "user" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
                { kind: "Field", name: { kind: "Name", value: "deletedAt" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "fetchPointTransactionsOfSelling" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "search" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "search" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "page" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "page" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "_id" } },
                { kind: "Field", name: { kind: "Name", value: "impUid" } },
                { kind: "Field", name: { kind: "Name", value: "amount" } },
                { kind: "Field", name: { kind: "Name", value: "balance" } },
                { kind: "Field", name: { kind: "Name", value: "status" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "statusDetail" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "user" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
                { kind: "Field", name: { kind: "Name", value: "deletedAt" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  FetchPointTransactionsOfAllQuery,
  FetchPointTransactionsOfAllQueryVariables
>;
export const FetchPointTransactionsCountOfAllDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "fetchPointTransactionsCountOfAll" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: {
              kind: "Name",
              value: "fetchPointTransactionsCountOfBuying",
            },
          },
          {
            kind: "Field",
            name: {
              kind: "Name",
              value: "fetchPointTransactionsCountOfLoading",
            },
          },
          {
            kind: "Field",
            name: {
              kind: "Name",
              value: "fetchPointTransactionsCountOfSelling",
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  FetchPointTransactionsCountOfAllQuery,
  FetchPointTransactionsCountOfAllQueryVariables
>;
export const FetchPointTransactionsOfBuyingDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "fetchPointTransactionsOfBuying" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "search" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "page" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "fetchPointTransactionsOfBuying" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "search" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "search" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "page" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "page" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "_id" } },
                { kind: "Field", name: { kind: "Name", value: "impUid" } },
                { kind: "Field", name: { kind: "Name", value: "amount" } },
                { kind: "Field", name: { kind: "Name", value: "balance" } },
                { kind: "Field", name: { kind: "Name", value: "status" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "statusDetail" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "user" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
                { kind: "Field", name: { kind: "Name", value: "deletedAt" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  FetchPointTransactionsOfBuyingQuery,
  FetchPointTransactionsOfBuyingQueryVariables
>;
export const FetchPointTransactionsCountOfBuyingDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "fetchPointTransactionsCountOfBuying" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: {
              kind: "Name",
              value: "fetchPointTransactionsCountOfBuying",
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  FetchPointTransactionsCountOfBuyingQuery,
  FetchPointTransactionsCountOfBuyingQueryVariables
>;
export const FetchPointTransactionsOfLoadingDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "fetchPointTransactionsOfLoading" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "search" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "page" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "fetchPointTransactionsOfLoading" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "search" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "search" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "page" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "page" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "_id" } },
                { kind: "Field", name: { kind: "Name", value: "impUid" } },
                { kind: "Field", name: { kind: "Name", value: "amount" } },
                { kind: "Field", name: { kind: "Name", value: "balance" } },
                { kind: "Field", name: { kind: "Name", value: "status" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "statusDetail" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "user" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
                { kind: "Field", name: { kind: "Name", value: "deletedAt" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  FetchPointTransactionsOfLoadingQuery,
  FetchPointTransactionsOfLoadingQueryVariables
>;
export const FetchPointTransactionsCountOfLoadingDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "fetchPointTransactionsCountOfLoading" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: {
              kind: "Name",
              value: "fetchPointTransactionsCountOfLoading",
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  FetchPointTransactionsCountOfLoadingQuery,
  FetchPointTransactionsCountOfLoadingQueryVariables
>;
export const FetchPointTransactionsOfSellingDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "fetchPointTransactionsOfSelling" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "search" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "page" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "fetchPointTransactionsOfSelling" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "search" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "search" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "page" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "page" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "_id" } },
                { kind: "Field", name: { kind: "Name", value: "impUid" } },
                { kind: "Field", name: { kind: "Name", value: "amount" } },
                { kind: "Field", name: { kind: "Name", value: "balance" } },
                { kind: "Field", name: { kind: "Name", value: "status" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "statusDetail" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "user" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
                { kind: "Field", name: { kind: "Name", value: "deletedAt" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  FetchPointTransactionsOfSellingQuery,
  FetchPointTransactionsOfSellingQueryVariables
>;
export const FetchPointTransactionsCountOfSellingDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "fetchPointTransactionsCountOfSelling" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: {
              kind: "Name",
              value: "fetchPointTransactionsCountOfSelling",
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  FetchPointTransactionsCountOfSellingQuery,
  FetchPointTransactionsCountOfSellingQueryVariables
>;
export const CreatePointTransactionOfBuyingAndSellingDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "createPointTransactionOfBuyingAndSelling" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "useritemId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: {
              kind: "Name",
              value: "createPointTransactionOfBuyingAndSelling",
            },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "useritemId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "useritemId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "_id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreatePointTransactionOfBuyingAndSellingMutation,
  CreatePointTransactionOfBuyingAndSellingMutationVariables
>;
export const DeleteTravelproductQuestionAnswerDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "deleteTravelproductQuestionAnswer" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "travelproductQuestionAnswerId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteTravelproductQuestionAnswer" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "travelproductQuestionAnswerId" },
                value: {
                  kind: "Variable",
                  name: {
                    kind: "Name",
                    value: "travelproductQuestionAnswerId",
                  },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeleteTravelproductQuestionAnswerMutation,
  DeleteTravelproductQuestionAnswerMutationVariables
>;
export const FetchTravelproductQuestionAnswersDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "fetchTravelproductQuestionAnswers" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "page" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "travelproductQuestionId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "fetchTravelproductQuestionAnswers" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "page" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "page" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "travelproductQuestionId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "travelproductQuestionId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "_id" } },
                { kind: "Field", name: { kind: "Name", value: "contents" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "user" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "_id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "picture" },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
                { kind: "Field", name: { kind: "Name", value: "deletedAt" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  FetchTravelproductQuestionAnswersQuery,
  FetchTravelproductQuestionAnswersQueryVariables
>;
export const CreateTravelproductQuestionAnswerDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "createTravelproductQuestionAnswer" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: {
              kind: "Name",
              value: "createTravelproductQuestionAnswerInput",
            },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "CreateTravelproductQuestionAnswerInput",
              },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "travelproductQuestionId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createTravelproductQuestionAnswer" },
            arguments: [
              {
                kind: "Argument",
                name: {
                  kind: "Name",
                  value: "createTravelproductQuestionAnswerInput",
                },
                value: {
                  kind: "Variable",
                  name: {
                    kind: "Name",
                    value: "createTravelproductQuestionAnswerInput",
                  },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "travelproductQuestionId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "travelproductQuestionId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "_id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateTravelproductQuestionAnswerMutation,
  CreateTravelproductQuestionAnswerMutationVariables
>;
export const UpdateTravelproductQuestionAnswerDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "updateTravelproductQuestionAnswer" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: {
              kind: "Name",
              value: "updateTravelproductQuestionAnswerInput",
            },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "UpdateTravelproductQuestionAnswerInput",
              },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "travelproductQuestionAnswerId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateTravelproductQuestionAnswer" },
            arguments: [
              {
                kind: "Argument",
                name: {
                  kind: "Name",
                  value: "updateTravelproductQuestionAnswerInput",
                },
                value: {
                  kind: "Variable",
                  name: {
                    kind: "Name",
                    value: "updateTravelproductQuestionAnswerInput",
                  },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "travelproductQuestionAnswerId" },
                value: {
                  kind: "Variable",
                  name: {
                    kind: "Name",
                    value: "travelproductQuestionAnswerId",
                  },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "_id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateTravelproductQuestionAnswerMutation,
  UpdateTravelproductQuestionAnswerMutationVariables
>;
export const DeleteTravelproductQuestionDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "deleteTravelproductQuestion" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "travelproductQuestionId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteTravelproductQuestion" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "travelproductQuestionId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "travelproductQuestionId" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeleteTravelproductQuestionMutation,
  DeleteTravelproductQuestionMutationVariables
>;
export const FetchTravelproductQuestionsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "fetchTravelproductQuestions" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "page" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "travelproductId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "fetchTravelproductQuestions" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "page" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "page" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "travelproductId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "travelproductId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "_id" } },
                { kind: "Field", name: { kind: "Name", value: "contents" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "user" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "_id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "picture" },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
                { kind: "Field", name: { kind: "Name", value: "deletedAt" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  FetchTravelproductQuestionsQuery,
  FetchTravelproductQuestionsQueryVariables
>;
export const FetchTravelproductOfMineDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "fetchTravelproductOfMine" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "fetchUserLoggedIn" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "_id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  FetchTravelproductOfMineQuery,
  FetchTravelproductOfMineQueryVariables
>;
export const CreateTravelproductQuestionDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "createTravelproductQuestion" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "createTravelproductQuestionInput" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CreateTravelproductQuestionInput" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "travelproductId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createTravelproductQuestion" },
            arguments: [
              {
                kind: "Argument",
                name: {
                  kind: "Name",
                  value: "createTravelproductQuestionInput",
                },
                value: {
                  kind: "Variable",
                  name: {
                    kind: "Name",
                    value: "createTravelproductQuestionInput",
                  },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "travelproductId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "travelproductId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "_id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateTravelproductQuestionMutation,
  CreateTravelproductQuestionMutationVariables
>;
export const UpdateTravelproductQuestionDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "updateTravelproductQuestion" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "updateTravelproductQuestionInput" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "UpdateTravelproductQuestionInput" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "travelproductQuestionId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateTravelproductQuestion" },
            arguments: [
              {
                kind: "Argument",
                name: {
                  kind: "Name",
                  value: "updateTravelproductQuestionInput",
                },
                value: {
                  kind: "Variable",
                  name: {
                    kind: "Name",
                    value: "updateTravelproductQuestionInput",
                  },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "travelproductQuestionId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "travelproductQuestionId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "_id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateTravelproductQuestionMutation,
  UpdateTravelproductQuestionMutationVariables
>;
export const FetchTravelproductDetailDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "fetchTravelproductDetail" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "travelproductId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "fetchTravelproduct" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "travelproductId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "travelproductId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "_id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "remarks" } },
                { kind: "Field", name: { kind: "Name", value: "contents" } },
                { kind: "Field", name: { kind: "Name", value: "tags" } },
                { kind: "Field", name: { kind: "Name", value: "images" } },
                { kind: "Field", name: { kind: "Name", value: "pickedCount" } },
                { kind: "Field", name: { kind: "Name", value: "price" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "seller" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "_id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "picture" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "travelproductAddress" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "zipcode" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "address" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "addressDetail" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "lat" } },
                      { kind: "Field", name: { kind: "Name", value: "lng" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  FetchTravelproductDetailQuery,
  FetchTravelproductDetailQueryVariables
>;
export const ToggleTravelproductPickDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "toggleTravelproductPick" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "travelproductId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "toggleTravelproductPick" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "travelproductId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "travelproductId" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ToggleTravelproductPickMutation,
  ToggleTravelproductPickMutationVariables
>;
export const FetchTravelproductsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "fetchTravelproducts" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "isSoldout" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "search" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "page" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "fetchTravelproducts" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "isSoldout" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "isSoldout" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "search" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "search" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "page" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "page" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "_id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "remarks" } },
                { kind: "Field", name: { kind: "Name", value: "contents" } },
                { kind: "Field", name: { kind: "Name", value: "price" } },
                { kind: "Field", name: { kind: "Name", value: "tags" } },
                { kind: "Field", name: { kind: "Name", value: "images" } },
                { kind: "Field", name: { kind: "Name", value: "pickedCount" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "seller" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "picture" },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "soldAt" } },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
                { kind: "Field", name: { kind: "Name", value: "deletedAt" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  FetchTravelproductsQuery,
  FetchTravelproductsQueryVariables
>;
export const FetchTravelproductsOfTheBestDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "fetchTravelproductsOfTheBest" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "fetchTravelproductsOfTheBest" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "_id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "remarks" } },
                { kind: "Field", name: { kind: "Name", value: "price" } },
                { kind: "Field", name: { kind: "Name", value: "tags" } },
                { kind: "Field", name: { kind: "Name", value: "images" } },
                { kind: "Field", name: { kind: "Name", value: "pickedCount" } },
                { kind: "Field", name: { kind: "Name", value: "soldAt" } },
                { kind: "Field", name: { kind: "Name", value: "deletedAt" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  FetchTravelproductsOfTheBestQuery,
  FetchTravelproductsOfTheBestQueryVariables
>;
export const CreateTravelproductDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "createTravelproduct" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "createTravelproductInput" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CreateTravelproductInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createTravelproduct" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "createTravelproductInput" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "createTravelproductInput" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "_id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateTravelproductMutation,
  CreateTravelproductMutationVariables
>;
export const UpdateTravelproductDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "updateTravelproduct" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "updateTravelproductInput" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "UpdateTravelproductInput" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "travelproductId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateTravelproduct" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "updateTravelproductInput" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "updateTravelproductInput" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "travelproductId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "travelproductId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "_id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateTravelproductMutation,
  UpdateTravelproductMutationVariables
>;
