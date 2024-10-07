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
    "\n  query fetchBoard($myid: ID!) {\n    fetchBoard(boardId: $myid) {\n      _id\n      writer\n      title\n      contents\n    }\n  }\n": types.FetchBoardDocument,
    "\n  mutation deleteBoard($boardId: ID!) {\n    deleteBoard(boardId: $boardId)\n  }\n": types.DeleteBoardDocument,
    "\n  # 타입적는곳\n  mutation createBoard(\n    $writer: String\n    $password: String\n    $title: String!\n    $contents: String!\n  ) {\n    #전달할 변수 적는곳\n    createBoard(\n      createBoardInput: {\n        writer: $writer\n        password: $password\n        title: $title\n        contents: $contents\n      }\n    ) {\n      _id\n      writer\n      title\n      contents\n    }\n  }\n": types.CreateBoardDocument,
    "\n  # 타입적는곳\n  mutation updateBoard(\n    $title: String\n    $contents: String\n    $password: String\n    $boardId: ID!\n  ) {\n    # 전달할 변수 적는곳\n    updateBoard(\n      updateBoardInput: { title: $title, contents: $contents }\n      password: $password\n      boardId: $boardId\n    ) {\n      _id\n      writer\n      title\n      contents\n    }\n  }\n": types.UpdateBoardDocument,
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
export function graphql(source: "\n  query fetchBoard($myid: ID!) {\n    fetchBoard(boardId: $myid) {\n      _id\n      writer\n      title\n      contents\n    }\n  }\n"): (typeof documents)["\n  query fetchBoard($myid: ID!) {\n    fetchBoard(boardId: $myid) {\n      _id\n      writer\n      title\n      contents\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteBoard($boardId: ID!) {\n    deleteBoard(boardId: $boardId)\n  }\n"): (typeof documents)["\n  mutation deleteBoard($boardId: ID!) {\n    deleteBoard(boardId: $boardId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  # 타입적는곳\n  mutation createBoard(\n    $writer: String\n    $password: String\n    $title: String!\n    $contents: String!\n  ) {\n    #전달할 변수 적는곳\n    createBoard(\n      createBoardInput: {\n        writer: $writer\n        password: $password\n        title: $title\n        contents: $contents\n      }\n    ) {\n      _id\n      writer\n      title\n      contents\n    }\n  }\n"): (typeof documents)["\n  # 타입적는곳\n  mutation createBoard(\n    $writer: String\n    $password: String\n    $title: String!\n    $contents: String!\n  ) {\n    #전달할 변수 적는곳\n    createBoard(\n      createBoardInput: {\n        writer: $writer\n        password: $password\n        title: $title\n        contents: $contents\n      }\n    ) {\n      _id\n      writer\n      title\n      contents\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  # 타입적는곳\n  mutation updateBoard(\n    $title: String\n    $contents: String\n    $password: String\n    $boardId: ID!\n  ) {\n    # 전달할 변수 적는곳\n    updateBoard(\n      updateBoardInput: { title: $title, contents: $contents }\n      password: $password\n      boardId: $boardId\n    ) {\n      _id\n      writer\n      title\n      contents\n    }\n  }\n"): (typeof documents)["\n  # 타입적는곳\n  mutation updateBoard(\n    $title: String\n    $contents: String\n    $password: String\n    $boardId: ID!\n  ) {\n    # 전달할 변수 적는곳\n    updateBoard(\n      updateBoardInput: { title: $title, contents: $contents }\n      password: $password\n      boardId: $boardId\n    ) {\n      _id\n      writer\n      title\n      contents\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;