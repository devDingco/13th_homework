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
    "\n  mutation CreateBoardComment(\n    $boardId: ID!\n    $writer: String!\n    $password: String!\n    $contents: String!\n  ) {\n    createBoardComment(\n      boardId: $boardId\n      createBoardCommentInput: {\n        writer: $writer\n        password: $password\n        contents: $contents\n        rating: 0\n      }\n    ) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n": types.CreateBoardCommentDocument,
    "\n  query FetchBoardComments($boardId: ID!) {\n    fetchBoardComments(page: 1, boardId: $boardId) {\n      _id\n      writer\n      contents\n      rating\n      user {\n        picture\n        deletedAt\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n": types.FetchBoardCommentsDocument,
    "\n  query fetchBoard($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      likeCount\n      dislikeCount\n      images\n      boardAddress {\n        _id\n        zipcode\n        address\n        addressDetail\n        createdAt\n        updatedAt\n        deletedAt\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n": types.FetchBoardDocument,
    "\n  query fetchBoards($endDate: DateTime, $startDate: DateTime, $search: String) {\n    fetchBoards(endDate: $endDate, startDate: $startDate, search: $search) {\n      _id\n      writer\n      title\n      images\n      createdAt\n    }\n  }\n": types.FetchBoardsDocument,
    "\n  mutation deleteBoard($boardId: ID!) {\n    deleteBoard(boardId: $boardId)\n  }\n": types.DeleteBoardDocument,
    "\n  mutation createBoard($createBoardInput: CreateBoardInput!) {\n    createBoard(createBoardInput: $createBoardInput) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      likeCount\n      dislikeCount\n      images\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      user {\n        _id\n        name\n        email\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n": types.CreateBoardDocument,
    "\n  mutation updateBoard(\n    $updateBoardInput: UpdateBoardInput!\n    $password: String\n    $boardId: ID!\n  ) {\n    updateBoard(\n      updateBoardInput: $updateBoardInput\n      password: $password\n      boardId: $boardId\n    ) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      likeCount\n      dislikeCount\n      images\n      boardAddress {\n        _id\n        zipcode\n        address\n      }\n      user {\n        _id\n        email\n        name\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n": types.UpdateBoardDocument,
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
export function graphql(source: "\n  mutation CreateBoardComment(\n    $boardId: ID!\n    $writer: String!\n    $password: String!\n    $contents: String!\n  ) {\n    createBoardComment(\n      boardId: $boardId\n      createBoardCommentInput: {\n        writer: $writer\n        password: $password\n        contents: $contents\n        rating: 0\n      }\n    ) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"): (typeof documents)["\n  mutation CreateBoardComment(\n    $boardId: ID!\n    $writer: String!\n    $password: String!\n    $contents: String!\n  ) {\n    createBoardComment(\n      boardId: $boardId\n      createBoardCommentInput: {\n        writer: $writer\n        password: $password\n        contents: $contents\n        rating: 0\n      }\n    ) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FetchBoardComments($boardId: ID!) {\n    fetchBoardComments(page: 1, boardId: $boardId) {\n      _id\n      writer\n      contents\n      rating\n      user {\n        picture\n        deletedAt\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"): (typeof documents)["\n  query FetchBoardComments($boardId: ID!) {\n    fetchBoardComments(page: 1, boardId: $boardId) {\n      _id\n      writer\n      contents\n      rating\n      user {\n        picture\n        deletedAt\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoard($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      likeCount\n      dislikeCount\n      images\n      boardAddress {\n        _id\n        zipcode\n        address\n        addressDetail\n        createdAt\n        updatedAt\n        deletedAt\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"): (typeof documents)["\n  query fetchBoard($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      likeCount\n      dislikeCount\n      images\n      boardAddress {\n        _id\n        zipcode\n        address\n        addressDetail\n        createdAt\n        updatedAt\n        deletedAt\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoards($endDate: DateTime, $startDate: DateTime, $search: String) {\n    fetchBoards(endDate: $endDate, startDate: $startDate, search: $search) {\n      _id\n      writer\n      title\n      images\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query fetchBoards($endDate: DateTime, $startDate: DateTime, $search: String) {\n    fetchBoards(endDate: $endDate, startDate: $startDate, search: $search) {\n      _id\n      writer\n      title\n      images\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteBoard($boardId: ID!) {\n    deleteBoard(boardId: $boardId)\n  }\n"): (typeof documents)["\n  mutation deleteBoard($boardId: ID!) {\n    deleteBoard(boardId: $boardId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createBoard($createBoardInput: CreateBoardInput!) {\n    createBoard(createBoardInput: $createBoardInput) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      likeCount\n      dislikeCount\n      images\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      user {\n        _id\n        name\n        email\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"): (typeof documents)["\n  mutation createBoard($createBoardInput: CreateBoardInput!) {\n    createBoard(createBoardInput: $createBoardInput) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      likeCount\n      dislikeCount\n      images\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      user {\n        _id\n        name\n        email\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateBoard(\n    $updateBoardInput: UpdateBoardInput!\n    $password: String\n    $boardId: ID!\n  ) {\n    updateBoard(\n      updateBoardInput: $updateBoardInput\n      password: $password\n      boardId: $boardId\n    ) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      likeCount\n      dislikeCount\n      images\n      boardAddress {\n        _id\n        zipcode\n        address\n      }\n      user {\n        _id\n        email\n        name\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"): (typeof documents)["\n  mutation updateBoard(\n    $updateBoardInput: UpdateBoardInput!\n    $password: String\n    $boardId: ID!\n  ) {\n    updateBoard(\n      updateBoardInput: $updateBoardInput\n      password: $password\n      boardId: $boardId\n    ) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      likeCount\n      dislikeCount\n      images\n      boardAddress {\n        _id\n        zipcode\n        address\n      }\n      user {\n        _id\n        email\n        name\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;