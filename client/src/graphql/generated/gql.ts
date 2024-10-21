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
    "query GetBoardComment($boardId: Int!, $page: Int) {\n  getBoardComment(boardId: $boardId, page: $page) {\n    author\n    content\n    rating\n    parentId\n    _id\n    createdAt\n    replies {\n      author\n      content\n      createdAt\n    }\n  }\n}": types.GetBoardCommentDocument,
    "query GetBoardReaction($boardId: Int!) {\n  getBoardReaction(boardId: $boardId) {\n    like\n    hate\n  }\n}": types.GetBoardReactionDocument,
    "query GetBoards($page: Int, $take: Int) {\n  getBoards(page: $page, take: $take) {\n    result {\n      author\n      title\n      boardId\n      createdAt\n    }\n    totalCount\n  }\n}\n\nquery GetBoard($boardId: Int!) {\n  getBoard(boardId: $boardId) {\n    author\n    title\n    content\n    imageUrl\n    youtubeUrl\n    boardAddressOutput {\n      zoneCode\n      address\n      detailAddress\n    }\n    createdAt\n  }\n}": types.GetBoardsDocument,
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
export function graphql(source: "query GetBoardComment($boardId: Int!, $page: Int) {\n  getBoardComment(boardId: $boardId, page: $page) {\n    author\n    content\n    rating\n    parentId\n    _id\n    createdAt\n    replies {\n      author\n      content\n      createdAt\n    }\n  }\n}"): (typeof documents)["query GetBoardComment($boardId: Int!, $page: Int) {\n  getBoardComment(boardId: $boardId, page: $page) {\n    author\n    content\n    rating\n    parentId\n    _id\n    createdAt\n    replies {\n      author\n      content\n      createdAt\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetBoardReaction($boardId: Int!) {\n  getBoardReaction(boardId: $boardId) {\n    like\n    hate\n  }\n}"): (typeof documents)["query GetBoardReaction($boardId: Int!) {\n  getBoardReaction(boardId: $boardId) {\n    like\n    hate\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetBoards($page: Int, $take: Int) {\n  getBoards(page: $page, take: $take) {\n    result {\n      author\n      title\n      boardId\n      createdAt\n    }\n    totalCount\n  }\n}\n\nquery GetBoard($boardId: Int!) {\n  getBoard(boardId: $boardId) {\n    author\n    title\n    content\n    imageUrl\n    youtubeUrl\n    boardAddressOutput {\n      zoneCode\n      address\n      detailAddress\n    }\n    createdAt\n  }\n}"): (typeof documents)["query GetBoards($page: Int, $take: Int) {\n  getBoards(page: $page, take: $take) {\n    result {\n      author\n      title\n      boardId\n      createdAt\n    }\n    totalCount\n  }\n}\n\nquery GetBoard($boardId: Int!) {\n  getBoard(boardId: $boardId) {\n    author\n    title\n    content\n    imageUrl\n    youtubeUrl\n    boardAddressOutput {\n      zoneCode\n      address\n      detailAddress\n    }\n    createdAt\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;