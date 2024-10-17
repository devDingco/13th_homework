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
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n  mutation createBoard($createBoardInput: CreateBoardInput!) {\n    createBoard(createBoardInput: $createBoardInput) {\n      _id\n      writer\n      title\n      createdAt\n      updatedAt\n      youtubeUrl\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n    }\n  }\n": types.CreateBoardDocument,
    "\n  mutation updateBoard(\n    $boardId: ID!\n    $password: String\n    $updateBoardInput: UpdateBoardInput!\n  ) {\n    updateBoard(\n      boardId: $boardId\n      password: $password\n      updateBoardInput: $updateBoardInput\n    ) {\n      _id\n      title\n      contents\n      createdAt\n      updatedAt\n      writer\n      youtubeUrl\n      boardAddress {\n        address\n        addressDetail\n        zipcode\n      }\n    }\n  }\n": types.UpdateBoardDocument,
    "\n  query fetchBoard($myboardId: ID!) {\n    fetchBoard(boardId: $myboardId) {\n      _id\n      writer\n      title\n      contents\n      createdAt\n      youtubeUrl\n      boardAddress {\n        address\n        zipcode\n        addressDetail\n      }\n    }\n  }\n": types.FetchBoardDocument,
    "\n  mutation createBoardComment(\n    $createBoardCommentInput: CreateBoardCommentInput!\n    $boardId: ID!\n  ) {\n    createBoardComment(\n      createBoardCommentInput: $createBoardCommentInput\n      boardId: $boardId\n    ) {\n      _id\n      contents\n      createdAt\n      writer\n      rating\n    }\n  }\n": types.CreateBoardCommentDocument,
    "\n  query fetchBoardComments($page: Int, $boardId: ID!) {\n    fetchBoardComments(page: $page, boardId: $boardId) {\n      writer\n      contents\n      createdAt\n      _id\n      rating\n    }\n  }\n": types.FetchBoardCommentsDocument,
    "\n  mutation updateBoardComment(\n    $boardCommentId: ID!\n    $updateBoardCommentInput: UpdateBoardCommentInput!\n    $password: String!\n  ) {\n    updateBoardComment(\n      boardCommentId: $boardCommentId\n      updateBoardCommentInput: $updateBoardCommentInput\n      password: $password\n    ) {\n      _id\n      contents\n      rating\n      writer\n      updatedAt\n    }\n  }\n": types.UpdateBoardCommentDocument,
    "\n  mutation deleteBoard($boardId: ID!) {\n    deleteBoard(boardId: $boardId)\n  }\n": types.DeleteBoardDocument,
    "\n  query fetchBoardsCount {\n    fetchBoardsCount\n  }\n": types.FetchBoardsCountDocument,
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
export function graphql(source: "\n  mutation createBoard($createBoardInput: CreateBoardInput!) {\n    createBoard(createBoardInput: $createBoardInput) {\n      _id\n      writer\n      title\n      createdAt\n      updatedAt\n      youtubeUrl\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation createBoard($createBoardInput: CreateBoardInput!) {\n    createBoard(createBoardInput: $createBoardInput) {\n      _id\n      writer\n      title\n      createdAt\n      updatedAt\n      youtubeUrl\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateBoard(\n    $boardId: ID!\n    $password: String\n    $updateBoardInput: UpdateBoardInput!\n  ) {\n    updateBoard(\n      boardId: $boardId\n      password: $password\n      updateBoardInput: $updateBoardInput\n    ) {\n      _id\n      title\n      contents\n      createdAt\n      updatedAt\n      writer\n      youtubeUrl\n      boardAddress {\n        address\n        addressDetail\n        zipcode\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation updateBoard(\n    $boardId: ID!\n    $password: String\n    $updateBoardInput: UpdateBoardInput!\n  ) {\n    updateBoard(\n      boardId: $boardId\n      password: $password\n      updateBoardInput: $updateBoardInput\n    ) {\n      _id\n      title\n      contents\n      createdAt\n      updatedAt\n      writer\n      youtubeUrl\n      boardAddress {\n        address\n        addressDetail\n        zipcode\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoard($myboardId: ID!) {\n    fetchBoard(boardId: $myboardId) {\n      _id\n      writer\n      title\n      contents\n      createdAt\n      youtubeUrl\n      boardAddress {\n        address\n        zipcode\n        addressDetail\n      }\n    }\n  }\n"): (typeof documents)["\n  query fetchBoard($myboardId: ID!) {\n    fetchBoard(boardId: $myboardId) {\n      _id\n      writer\n      title\n      contents\n      createdAt\n      youtubeUrl\n      boardAddress {\n        address\n        zipcode\n        addressDetail\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createBoardComment(\n    $createBoardCommentInput: CreateBoardCommentInput!\n    $boardId: ID!\n  ) {\n    createBoardComment(\n      createBoardCommentInput: $createBoardCommentInput\n      boardId: $boardId\n    ) {\n      _id\n      contents\n      createdAt\n      writer\n      rating\n    }\n  }\n"): (typeof documents)["\n  mutation createBoardComment(\n    $createBoardCommentInput: CreateBoardCommentInput!\n    $boardId: ID!\n  ) {\n    createBoardComment(\n      createBoardCommentInput: $createBoardCommentInput\n      boardId: $boardId\n    ) {\n      _id\n      contents\n      createdAt\n      writer\n      rating\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoardComments($page: Int, $boardId: ID!) {\n    fetchBoardComments(page: $page, boardId: $boardId) {\n      writer\n      contents\n      createdAt\n      _id\n      rating\n    }\n  }\n"): (typeof documents)["\n  query fetchBoardComments($page: Int, $boardId: ID!) {\n    fetchBoardComments(page: $page, boardId: $boardId) {\n      writer\n      contents\n      createdAt\n      _id\n      rating\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateBoardComment(\n    $boardCommentId: ID!\n    $updateBoardCommentInput: UpdateBoardCommentInput!\n    $password: String!\n  ) {\n    updateBoardComment(\n      boardCommentId: $boardCommentId\n      updateBoardCommentInput: $updateBoardCommentInput\n      password: $password\n    ) {\n      _id\n      contents\n      rating\n      writer\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation updateBoardComment(\n    $boardCommentId: ID!\n    $updateBoardCommentInput: UpdateBoardCommentInput!\n    $password: String!\n  ) {\n    updateBoardComment(\n      boardCommentId: $boardCommentId\n      updateBoardCommentInput: $updateBoardCommentInput\n      password: $password\n    ) {\n      _id\n      contents\n      rating\n      writer\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteBoard($boardId: ID!) {\n    deleteBoard(boardId: $boardId)\n  }\n"): (typeof documents)["\n  mutation deleteBoard($boardId: ID!) {\n    deleteBoard(boardId: $boardId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoardsCount {\n    fetchBoardsCount\n  }\n"): (typeof documents)["\n  query fetchBoardsCount {\n    fetchBoardsCount\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;