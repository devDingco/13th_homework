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
    "\n  mutation createBoardComment(\n    $createBoardCommentInput: CreateBoardCommentInput!\n    $boardId: ID!\n  ) {\n    createBoardComment(\n      createBoardCommentInput: $createBoardCommentInput\n      boardId: $boardId\n    ) {\n      _id\n      writer\n      contents\n    }\n  }\n": types.CreateBoardCommentDocument,
    "\n  query fetchBoardComments($page: Int, $boardId: ID!) {\n    fetchBoardComments(page: $page, boardId: $boardId) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n      updatedAt\n    }\n  }\n": types.FetchBoardCommentsDocument,
    "\n  query fetchBoard($myid: ID!) {\n    fetchBoard(boardId: $myid) {\n      writer\n      title\n      contents\n    }\n  }\n": types.FetchBoardDocument,
    "\n  query fetchBoards {\n    fetchBoards {\n      _id\n      writer\n      title\n      contents\n      createdAt\n    }\n  }\n": types.FetchBoardsDocument,
    "\n  mutation deleteBoard($mydelete: ID!) {\n    deleteBoard(boardId: $mydelete)\n  }\n": types.DeleteBoardDocument,
    "\n  mutation createBoard($myCreateBoardInput: CreateBoardInput!) {\n    createBoard(createBoardInput: $myCreateBoardInput) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n    }\n  }\n": types.CreateBoardDocument,
    "\n  mutation updateBoard(\n    $myUpdateBoardInput: UpdateBoardInput!\n    $myPassword: String\n    $myEditId: ID!\n  ) {\n    updateBoard(\n      updateBoardInput: $myUpdateBoardInput\n      password: $myPassword\n      boardId: $myEditId\n    ) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n    }\n  }\n": types.UpdateBoardDocument,
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
export function graphql(source: "\n  mutation createBoardComment(\n    $createBoardCommentInput: CreateBoardCommentInput!\n    $boardId: ID!\n  ) {\n    createBoardComment(\n      createBoardCommentInput: $createBoardCommentInput\n      boardId: $boardId\n    ) {\n      _id\n      writer\n      contents\n    }\n  }\n"): (typeof documents)["\n  mutation createBoardComment(\n    $createBoardCommentInput: CreateBoardCommentInput!\n    $boardId: ID!\n  ) {\n    createBoardComment(\n      createBoardCommentInput: $createBoardCommentInput\n      boardId: $boardId\n    ) {\n      _id\n      writer\n      contents\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoardComments($page: Int, $boardId: ID!) {\n    fetchBoardComments(page: $page, boardId: $boardId) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query fetchBoardComments($page: Int, $boardId: ID!) {\n    fetchBoardComments(page: $page, boardId: $boardId) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoard($myid: ID!) {\n    fetchBoard(boardId: $myid) {\n      writer\n      title\n      contents\n    }\n  }\n"): (typeof documents)["\n  query fetchBoard($myid: ID!) {\n    fetchBoard(boardId: $myid) {\n      writer\n      title\n      contents\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoards {\n    fetchBoards {\n      _id\n      writer\n      title\n      contents\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query fetchBoards {\n    fetchBoards {\n      _id\n      writer\n      title\n      contents\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteBoard($mydelete: ID!) {\n    deleteBoard(boardId: $mydelete)\n  }\n"): (typeof documents)["\n  mutation deleteBoard($mydelete: ID!) {\n    deleteBoard(boardId: $mydelete)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createBoard($myCreateBoardInput: CreateBoardInput!) {\n    createBoard(createBoardInput: $myCreateBoardInput) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n    }\n  }\n"): (typeof documents)["\n  mutation createBoard($myCreateBoardInput: CreateBoardInput!) {\n    createBoard(createBoardInput: $myCreateBoardInput) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateBoard(\n    $myUpdateBoardInput: UpdateBoardInput!\n    $myPassword: String\n    $myEditId: ID!\n  ) {\n    updateBoard(\n      updateBoardInput: $myUpdateBoardInput\n      password: $myPassword\n      boardId: $myEditId\n    ) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n    }\n  }\n"): (typeof documents)["\n  mutation updateBoard(\n    $myUpdateBoardInput: UpdateBoardInput!\n    $myPassword: String\n    $myEditId: ID!\n  ) {\n    updateBoard(\n      updateBoardInput: $myUpdateBoardInput\n      password: $myPassword\n      boardId: $myEditId\n    ) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;