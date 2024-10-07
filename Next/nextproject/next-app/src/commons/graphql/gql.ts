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
    "\nmutation createBoard(\n  $createBoardInput: CreateBoardInput!\n) \n  {\n  createBoard(\n    createBoardInput: $createBoardInput\n  ) {\n    _id\n    writer\n    title\n    createdAt\n    updatedAt\n    boardAddress { \n      zipcode\n      address\n      addressDetail\n    }     \n  }\n}\n": types.CreateBoardDocument,
    "\n  mutation updateBoard($boardId: ID!, $password: String, $updateBoardInput: UpdateBoardInput!) {\n    updateBoard(\n      boardId: $boardId\n      password: $password\n      updateBoardInput: $updateBoardInput\n    ) {\n      _id\n      title\n      contents  \n      createdAt\n      updatedAt\n      writer\n    }\n  }\n": types.UpdateBoardDocument,
    "\nquery fetchBoard($myboardId: ID!) {\n  fetchBoard(boardId: $myboardId) {\n    _id\n    writer\n    title\n    contents\n    createdAt\n    # boardAddress {\n    #   address\n    #   zipcode\n    #   addressDetail\n    # }\n  }\n}\n": types.FetchBoardDocument,
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
export function graphql(source: "\nmutation createBoard(\n  $createBoardInput: CreateBoardInput!\n) \n  {\n  createBoard(\n    createBoardInput: $createBoardInput\n  ) {\n    _id\n    writer\n    title\n    createdAt\n    updatedAt\n    boardAddress { \n      zipcode\n      address\n      addressDetail\n    }     \n  }\n}\n"): (typeof documents)["\nmutation createBoard(\n  $createBoardInput: CreateBoardInput!\n) \n  {\n  createBoard(\n    createBoardInput: $createBoardInput\n  ) {\n    _id\n    writer\n    title\n    createdAt\n    updatedAt\n    boardAddress { \n      zipcode\n      address\n      addressDetail\n    }     \n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateBoard($boardId: ID!, $password: String, $updateBoardInput: UpdateBoardInput!) {\n    updateBoard(\n      boardId: $boardId\n      password: $password\n      updateBoardInput: $updateBoardInput\n    ) {\n      _id\n      title\n      contents  \n      createdAt\n      updatedAt\n      writer\n    }\n  }\n"): (typeof documents)["\n  mutation updateBoard($boardId: ID!, $password: String, $updateBoardInput: UpdateBoardInput!) {\n    updateBoard(\n      boardId: $boardId\n      password: $password\n      updateBoardInput: $updateBoardInput\n    ) {\n      _id\n      title\n      contents  \n      createdAt\n      updatedAt\n      writer\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery fetchBoard($myboardId: ID!) {\n  fetchBoard(boardId: $myboardId) {\n    _id\n    writer\n    title\n    contents\n    createdAt\n    # boardAddress {\n    #   address\n    #   zipcode\n    #   addressDetail\n    # }\n  }\n}\n"): (typeof documents)["\nquery fetchBoard($myboardId: ID!) {\n  fetchBoard(boardId: $myboardId) {\n    _id\n    writer\n    title\n    contents\n    createdAt\n    # boardAddress {\n    #   address\n    #   zipcode\n    #   addressDetail\n    # }\n  }\n}\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;