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
    "\n  query fetchBoardComments($boardId: ID!) {\n    fetchBoardComments(page: 1, boardId: $boardId) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n    }\n  }\n": types.FetchBoardCommentsDocument,
    "\n  mutation createBoardComment(\n    $createBoardCommentInput: CreateBoardCommentInput!\n    $boardId: ID!\n  ) {\n    createBoardComment(\n      createBoardCommentInput: $createBoardCommentInput\n      boardId: $boardId\n    ) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n    }\n  }\n": types.CreateBoardCommentDocument,
    "\n  query fetchBoard($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      images\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      createdAt\n    }\n  }\n": types.FetchBoardDocument,
    "\n  query fetchBoards(\n    $page: Int\n    $search: String\n    $endDate: DateTime\n    $startDate: DateTime\n  ) {\n    fetchBoards(\n      page: $page\n      search: $search\n      endDate: $endDate\n      startDate: $startDate\n    ) {\n      _id\n      writer\n      title\n      createdAt\n    }\n  }\n": types.FetchBoardsDocument,
    "\n  mutation deleteBoard($boardId: ID!) {\n    deleteBoard(boardId: $boardId)\n  }\n": types.DeleteBoardDocument,
    "\n  mutation createBoard($createBoardInput: CreateBoardInput!) {\n    createBoard(createBoardInput: $createBoardInput) {\n      _id\n      writer\n      title\n      youtubeUrl\n      images\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      createdAt\n    }\n  }\n": types.CreateBoardDocument,
    "\n  mutation updateBoard(\n    $updateBoardInput: UpdateBoardInput!\n    $password: String\n    $boardId: ID!\n  ) {\n    updateBoard(\n      updateBoardInput: $updateBoardInput\n      password: $password\n      boardId: $boardId\n    ) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      images\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      createdAt\n    }\n  }\n": types.UpdateBoardDocument,
    "\n  mutation uploadFile($file: Upload!) {\n    uploadFile(file: $file) {\n      _id\n      url\n    }\n  }\n": types.UploadFileDocument,
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
export function graphql(source: "\n  query fetchBoardComments($boardId: ID!) {\n    fetchBoardComments(page: 1, boardId: $boardId) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query fetchBoardComments($boardId: ID!) {\n    fetchBoardComments(page: 1, boardId: $boardId) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createBoardComment(\n    $createBoardCommentInput: CreateBoardCommentInput!\n    $boardId: ID!\n  ) {\n    createBoardComment(\n      createBoardCommentInput: $createBoardCommentInput\n      boardId: $boardId\n    ) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  mutation createBoardComment(\n    $createBoardCommentInput: CreateBoardCommentInput!\n    $boardId: ID!\n  ) {\n    createBoardComment(\n      createBoardCommentInput: $createBoardCommentInput\n      boardId: $boardId\n    ) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoard($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      images\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query fetchBoard($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      images\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoards(\n    $page: Int\n    $search: String\n    $endDate: DateTime\n    $startDate: DateTime\n  ) {\n    fetchBoards(\n      page: $page\n      search: $search\n      endDate: $endDate\n      startDate: $startDate\n    ) {\n      _id\n      writer\n      title\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query fetchBoards(\n    $page: Int\n    $search: String\n    $endDate: DateTime\n    $startDate: DateTime\n  ) {\n    fetchBoards(\n      page: $page\n      search: $search\n      endDate: $endDate\n      startDate: $startDate\n    ) {\n      _id\n      writer\n      title\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteBoard($boardId: ID!) {\n    deleteBoard(boardId: $boardId)\n  }\n"): (typeof documents)["\n  mutation deleteBoard($boardId: ID!) {\n    deleteBoard(boardId: $boardId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createBoard($createBoardInput: CreateBoardInput!) {\n    createBoard(createBoardInput: $createBoardInput) {\n      _id\n      writer\n      title\n      youtubeUrl\n      images\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  mutation createBoard($createBoardInput: CreateBoardInput!) {\n    createBoard(createBoardInput: $createBoardInput) {\n      _id\n      writer\n      title\n      youtubeUrl\n      images\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateBoard(\n    $updateBoardInput: UpdateBoardInput!\n    $password: String\n    $boardId: ID!\n  ) {\n    updateBoard(\n      updateBoardInput: $updateBoardInput\n      password: $password\n      boardId: $boardId\n    ) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      images\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  mutation updateBoard(\n    $updateBoardInput: UpdateBoardInput!\n    $password: String\n    $boardId: ID!\n  ) {\n    updateBoard(\n      updateBoardInput: $updateBoardInput\n      password: $password\n      boardId: $boardId\n    ) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      images\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation uploadFile($file: Upload!) {\n    uploadFile(file: $file) {\n      _id\n      url\n    }\n  }\n"): (typeof documents)["\n  mutation uploadFile($file: Upload!) {\n    uploadFile(file: $file) {\n      _id\n      url\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;