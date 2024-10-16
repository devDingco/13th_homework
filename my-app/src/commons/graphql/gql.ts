/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query fetchBoard_edit($myid: ID!) {\n    fetchBoard(boardId: $myid) {\n      _id\n      writer\n      title\n      contents\n    }\n  }\n": types.FetchBoard_EditDocument,
    "\n  query fetchBoards_boards($mypage: Int) {\n    fetchBoards(page: $mypage) {\n      _id\n      writer\n      title\n      contents\n      createdAt\n    }\n  }\n": types.FetchBoards_BoardsDocument,
    "\n  query fetchBoardsCount {\n    fetchBoardsCount\n  }\n": types.FetchBoardsCountDocument,
    "\n  query fetchBoardComments($boardId: ID!) {\n    fetchBoardComments(boardId: $boardId) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n    }\n  }\n": types.FetchBoardCommentsDocument,
    "\n  #타입 적는 곳\n  mutation createBoardComment(\n    $boardId: ID!\n    $writer: String\n    $password: String\n    $contents: String!\n    $rating: Float!\n  ) {\n    # 변수 적는 곳\n    createBoardComment(\n      boardId: $boardId\n      createBoardCommentInput: {\n        writer: $writer\n        password: $password\n        contents: $contents\n        rating: $rating\n      }\n    ) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n    }\n  }\n": types.CreateBoardCommentDocument,
    "\n  query fetchBoard_detail($myid: ID!) {\n    fetchBoard(boardId: $myid) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n    }\n  }\n": types.FetchBoard_DetailDocument,
    "\n  query fetchBoards_list($mypage: Int) {\n    fetchBoards(page: $mypage) {\n      _id\n      writer\n      title\n      contents\n      createdAt\n    }\n  }\n": types.FetchBoards_ListDocument,
    "\n  mutation deleteBoard($boardId: ID!) {\n    deleteBoard(boardId: $boardId)\n  }\n": types.DeleteBoardDocument,
    "\n  query fetchBoards_pagination($mypage: Int) {\n    fetchBoards(page: $mypage) {\n      _id\n      writer\n      title\n      contents\n    }\n  }\n": types.FetchBoards_PaginationDocument,
    "\n  # 타입적는곳\n  mutation createBoard_boardWrite(\n    $writer: String\n    $password: String\n    $title: String!\n    $contents: String!\n    $youtubeUrl: String\n    $zipcode: String\n    $address: String\n    $addressDetail: String\n  ) {\n    #전달할 변수 적는곳\n    createBoard(\n      createBoardInput: {\n        writer: $writer\n        password: $password\n        title: $title\n        contents: $contents\n        youtubeUrl: $youtubeUrl\n        boardAddress: {\n          zipcode: $zipcode\n          address: $address\n          addressDetail: $addressDetail\n        }\n      }\n    ) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      boardAddress {\n        _id\n        zipcode\n        address\n        addressDetail\n      }\n    }\n  }\n": types.CreateBoard_BoardWriteDocument,
    "\n  # 타입적는곳\n  mutation updateBoard(\n    $title: String\n    $contents: String\n    $password: String\n    $boardId: ID!\n    $youtubeUrl: String\n    $zipcode: String\n    $address: String\n    $addressDetail: String\n  ) {\n    # 전달할 변수 적는곳\n    updateBoard(\n      updateBoardInput: {\n        title: $title\n        contents: $contents\n        youtubeUrl: $youtubeUrl\n        boardAddress: {\n          zipcode: $zipcode\n          address: $address\n          addressDetail: $addressDetail\n        }\n      }\n      password: $password\n      boardId: $boardId\n    ) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      boardAddress {\n        _id\n        zipcode\n        address\n        addressDetail\n      }\n    }\n  }\n": types.UpdateBoardDocument,
    "\n  query fetchBoard($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n    }\n  }\n": types.FetchBoardDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoard_edit($myid: ID!) {\n    fetchBoard(boardId: $myid) {\n      _id\n      writer\n      title\n      contents\n    }\n  }\n"): (typeof documents)["\n  query fetchBoard_edit($myid: ID!) {\n    fetchBoard(boardId: $myid) {\n      _id\n      writer\n      title\n      contents\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoards_boards($mypage: Int) {\n    fetchBoards(page: $mypage) {\n      _id\n      writer\n      title\n      contents\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query fetchBoards_boards($mypage: Int) {\n    fetchBoards(page: $mypage) {\n      _id\n      writer\n      title\n      contents\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoardsCount {\n    fetchBoardsCount\n  }\n"): (typeof documents)["\n  query fetchBoardsCount {\n    fetchBoardsCount\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoardComments($boardId: ID!) {\n    fetchBoardComments(boardId: $boardId) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query fetchBoardComments($boardId: ID!) {\n    fetchBoardComments(boardId: $boardId) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #타입 적는 곳\n  mutation createBoardComment(\n    $boardId: ID!\n    $writer: String\n    $password: String\n    $contents: String!\n    $rating: Float!\n  ) {\n    # 변수 적는 곳\n    createBoardComment(\n      boardId: $boardId\n      createBoardCommentInput: {\n        writer: $writer\n        password: $password\n        contents: $contents\n        rating: $rating\n      }\n    ) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  #타입 적는 곳\n  mutation createBoardComment(\n    $boardId: ID!\n    $writer: String\n    $password: String\n    $contents: String!\n    $rating: Float!\n  ) {\n    # 변수 적는 곳\n    createBoardComment(\n      boardId: $boardId\n      createBoardCommentInput: {\n        writer: $writer\n        password: $password\n        contents: $contents\n        rating: $rating\n      }\n    ) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoard_detail($myid: ID!) {\n    fetchBoard(boardId: $myid) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n    }\n  }\n"): (typeof documents)["\n  query fetchBoard_detail($myid: ID!) {\n    fetchBoard(boardId: $myid) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoards_list($mypage: Int) {\n    fetchBoards(page: $mypage) {\n      _id\n      writer\n      title\n      contents\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query fetchBoards_list($mypage: Int) {\n    fetchBoards(page: $mypage) {\n      _id\n      writer\n      title\n      contents\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteBoard($boardId: ID!) {\n    deleteBoard(boardId: $boardId)\n  }\n"): (typeof documents)["\n  mutation deleteBoard($boardId: ID!) {\n    deleteBoard(boardId: $boardId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoards_pagination($mypage: Int) {\n    fetchBoards(page: $mypage) {\n      _id\n      writer\n      title\n      contents\n    }\n  }\n"): (typeof documents)["\n  query fetchBoards_pagination($mypage: Int) {\n    fetchBoards(page: $mypage) {\n      _id\n      writer\n      title\n      contents\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  # 타입적는곳\n  mutation createBoard_boardWrite(\n    $writer: String\n    $password: String\n    $title: String!\n    $contents: String!\n    $youtubeUrl: String\n    $zipcode: String\n    $address: String\n    $addressDetail: String\n  ) {\n    #전달할 변수 적는곳\n    createBoard(\n      createBoardInput: {\n        writer: $writer\n        password: $password\n        title: $title\n        contents: $contents\n        youtubeUrl: $youtubeUrl\n        boardAddress: {\n          zipcode: $zipcode\n          address: $address\n          addressDetail: $addressDetail\n        }\n      }\n    ) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      boardAddress {\n        _id\n        zipcode\n        address\n        addressDetail\n      }\n    }\n  }\n"): (typeof documents)["\n  # 타입적는곳\n  mutation createBoard_boardWrite(\n    $writer: String\n    $password: String\n    $title: String!\n    $contents: String!\n    $youtubeUrl: String\n    $zipcode: String\n    $address: String\n    $addressDetail: String\n  ) {\n    #전달할 변수 적는곳\n    createBoard(\n      createBoardInput: {\n        writer: $writer\n        password: $password\n        title: $title\n        contents: $contents\n        youtubeUrl: $youtubeUrl\n        boardAddress: {\n          zipcode: $zipcode\n          address: $address\n          addressDetail: $addressDetail\n        }\n      }\n    ) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      boardAddress {\n        _id\n        zipcode\n        address\n        addressDetail\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  # 타입적는곳\n  mutation updateBoard(\n    $title: String\n    $contents: String\n    $password: String\n    $boardId: ID!\n    $youtubeUrl: String\n    $zipcode: String\n    $address: String\n    $addressDetail: String\n  ) {\n    # 전달할 변수 적는곳\n    updateBoard(\n      updateBoardInput: {\n        title: $title\n        contents: $contents\n        youtubeUrl: $youtubeUrl\n        boardAddress: {\n          zipcode: $zipcode\n          address: $address\n          addressDetail: $addressDetail\n        }\n      }\n      password: $password\n      boardId: $boardId\n    ) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      boardAddress {\n        _id\n        zipcode\n        address\n        addressDetail\n      }\n    }\n  }\n"): (typeof documents)["\n  # 타입적는곳\n  mutation updateBoard(\n    $title: String\n    $contents: String\n    $password: String\n    $boardId: ID!\n    $youtubeUrl: String\n    $zipcode: String\n    $address: String\n    $addressDetail: String\n  ) {\n    # 전달할 변수 적는곳\n    updateBoard(\n      updateBoardInput: {\n        title: $title\n        contents: $contents\n        youtubeUrl: $youtubeUrl\n        boardAddress: {\n          zipcode: $zipcode\n          address: $address\n          addressDetail: $addressDetail\n        }\n      }\n      password: $password\n      boardId: $boardId\n    ) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      boardAddress {\n        _id\n        zipcode\n        address\n        addressDetail\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoard($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n    }\n  }\n"): (typeof documents)["\n  query fetchBoard($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;