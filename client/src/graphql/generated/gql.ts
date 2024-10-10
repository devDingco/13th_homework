/**
 * eslint-disable
 *
 * @format
 */

import * as types from './graphql';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
	'mutation IsPasswordCorrect($boardId: Int!, $password: String!) {\n  isPasswordCorrect(boardId: $boardId, password: $password)\n}':
		types.IsPasswordCorrectDocument,
	'mutation ClearBoard {\n  clearBoard\n}': types.ClearBoardDocument,
	'mutation CreateBoardComment($boardId: Int!, $createBoardComment: CreateBoardCommentDto!) {\n  createBoardComment(boardId: $boardId, createBoardComment: $createBoardComment) {\n    author\n    content\n    rating\n    parentId\n    _id\n    createdAt\n    replies {\n      author\n      content\n      createdAt\n    }\n  }\n}':
		types.CreateBoardCommentDocument,
	'mutation CreateBoard($createBoard: CreateBoardDto!) {\n  createBoard(createBoard: $createBoard) {\n    author\n    title\n    content\n    imageUrl\n    youtubeUrl\n    address\n    createdAt\n  }\n}':
		types.CreateBoardDocument,
	'mutation DeleteBoardComment($boardId: Int!, $commentId: String!) {\n  deleteBoardComment(boardId: $boardId, commentId: $commentId)\n}':
		types.DeleteBoardCommentDocument,
	'mutation DeleteBoard($boardId: Int!) {\n  deleteBoard(boardId: $boardId)\n}':
		types.DeleteBoardDocument,
	'mutation UpdateBoardComment($boardId: Int!, $updateBoardComment: UpdateBoardCommentDto!, $parentId: String!) {\n  updateBoardComment(\n    boardId: $boardId\n    updateBoardComment: $updateBoardComment\n    parentId: $parentId\n  ) {\n    author\n    content\n    rating\n    parentId\n    _id\n    createdAt\n    replies {\n      author\n      content\n      createdAt\n    }\n  }\n}':
		types.UpdateBoardCommentDocument,
	'mutation UpdateBoard($boardId: Int!, $updateBoard: UpdateBoardDto!) {\n  updateBoard(boardId: $boardId, updateBoard: $updateBoard) {\n    author\n    title\n    content\n    imageUrl\n    youtubeUrl\n    address\n    createdAt\n  }\n}':
		types.UpdateBoardDocument,
	'query GetBoardComment($boardId: Int!) {\n  getBoardComment(boardId: $boardId) {\n    author\n    content\n    rating\n    parentId\n    _id\n    createdAt\n    replies {\n      author\n      content\n      createdAt\n    }\n  }\n}':
		types.GetBoardCommentDocument,
	'query GetBoardReaction($boardId: Int!) {\n  getBoardReaction(boardId: $boardId) {\n    like\n    hate\n  }\n}':
		types.GetBoardReactionDocument,
	'query GetBoard($boardId: Int!) {\n  getBoard(boardId: $boardId) {\n    author\n    title\n    content\n    imageUrl\n    youtubeUrl\n    address\n    createdAt\n  }\n}':
		types.GetBoardDocument,
	'query GetBoards {\n  getBoards {\n    author\n    title\n    boardId\n    createdAt\n  }\n}':
		types.GetBoardsDocument,
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
export function graphql(
	source: 'mutation IsPasswordCorrect($boardId: Int!, $password: String!) {\n  isPasswordCorrect(boardId: $boardId, password: $password)\n}',
): (typeof documents)['mutation IsPasswordCorrect($boardId: Int!, $password: String!) {\n  isPasswordCorrect(boardId: $boardId, password: $password)\n}'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: 'mutation ClearBoard {\n  clearBoard\n}',
): (typeof documents)['mutation ClearBoard {\n  clearBoard\n}'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: 'mutation CreateBoardComment($boardId: Int!, $createBoardComment: CreateBoardCommentDto!) {\n  createBoardComment(boardId: $boardId, createBoardComment: $createBoardComment) {\n    author\n    content\n    rating\n    parentId\n    _id\n    createdAt\n    replies {\n      author\n      content\n      createdAt\n    }\n  }\n}',
): (typeof documents)['mutation CreateBoardComment($boardId: Int!, $createBoardComment: CreateBoardCommentDto!) {\n  createBoardComment(boardId: $boardId, createBoardComment: $createBoardComment) {\n    author\n    content\n    rating\n    parentId\n    _id\n    createdAt\n    replies {\n      author\n      content\n      createdAt\n    }\n  }\n}'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: 'mutation CreateBoard($createBoard: CreateBoardDto!) {\n  createBoard(createBoard: $createBoard) {\n    author\n    title\n    content\n    imageUrl\n    youtubeUrl\n    address\n    createdAt\n  }\n}',
): (typeof documents)['mutation CreateBoard($createBoard: CreateBoardDto!) {\n  createBoard(createBoard: $createBoard) {\n    author\n    title\n    content\n    imageUrl\n    youtubeUrl\n    address\n    createdAt\n  }\n}'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: 'mutation DeleteBoardComment($boardId: Int!, $commentId: String!) {\n  deleteBoardComment(boardId: $boardId, commentId: $commentId)\n}',
): (typeof documents)['mutation DeleteBoardComment($boardId: Int!, $commentId: String!) {\n  deleteBoardComment(boardId: $boardId, commentId: $commentId)\n}'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: 'mutation DeleteBoard($boardId: Int!) {\n  deleteBoard(boardId: $boardId)\n}',
): (typeof documents)['mutation DeleteBoard($boardId: Int!) {\n  deleteBoard(boardId: $boardId)\n}'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: 'mutation UpdateBoardComment($boardId: Int!, $updateBoardComment: UpdateBoardCommentDto!, $parentId: String!) {\n  updateBoardComment(\n    boardId: $boardId\n    updateBoardComment: $updateBoardComment\n    parentId: $parentId\n  ) {\n    author\n    content\n    rating\n    parentId\n    _id\n    createdAt\n    replies {\n      author\n      content\n      createdAt\n    }\n  }\n}',
): (typeof documents)['mutation UpdateBoardComment($boardId: Int!, $updateBoardComment: UpdateBoardCommentDto!, $parentId: String!) {\n  updateBoardComment(\n    boardId: $boardId\n    updateBoardComment: $updateBoardComment\n    parentId: $parentId\n  ) {\n    author\n    content\n    rating\n    parentId\n    _id\n    createdAt\n    replies {\n      author\n      content\n      createdAt\n    }\n  }\n}'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: 'mutation UpdateBoard($boardId: Int!, $updateBoard: UpdateBoardDto!) {\n  updateBoard(boardId: $boardId, updateBoard: $updateBoard) {\n    author\n    title\n    content\n    imageUrl\n    youtubeUrl\n    address\n    createdAt\n  }\n}',
): (typeof documents)['mutation UpdateBoard($boardId: Int!, $updateBoard: UpdateBoardDto!) {\n  updateBoard(boardId: $boardId, updateBoard: $updateBoard) {\n    author\n    title\n    content\n    imageUrl\n    youtubeUrl\n    address\n    createdAt\n  }\n}'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: 'query GetBoardComment($boardId: Int!) {\n  getBoardComment(boardId: $boardId) {\n    author\n    content\n    rating\n    parentId\n    _id\n    createdAt\n    replies {\n      author\n      content\n      createdAt\n    }\n  }\n}',
): (typeof documents)['query GetBoardComment($boardId: Int!) {\n  getBoardComment(boardId: $boardId) {\n    author\n    content\n    rating\n    parentId\n    _id\n    createdAt\n    replies {\n      author\n      content\n      createdAt\n    }\n  }\n}'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: 'query GetBoardReaction($boardId: Int!) {\n  getBoardReaction(boardId: $boardId) {\n    like\n    hate\n  }\n}',
): (typeof documents)['query GetBoardReaction($boardId: Int!) {\n  getBoardReaction(boardId: $boardId) {\n    like\n    hate\n  }\n}'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: 'query GetBoard($boardId: Int!) {\n  getBoard(boardId: $boardId) {\n    author\n    title\n    content\n    imageUrl\n    youtubeUrl\n    address\n    createdAt\n  }\n}',
): (typeof documents)['query GetBoard($boardId: Int!) {\n  getBoard(boardId: $boardId) {\n    author\n    title\n    content\n    imageUrl\n    youtubeUrl\n    address\n    createdAt\n  }\n}'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: 'query GetBoards {\n  getBoards {\n    author\n    title\n    boardId\n    createdAt\n  }\n}',
): (typeof documents)['query GetBoards {\n  getBoards {\n    author\n    title\n    boardId\n    createdAt\n  }\n}'];

export function graphql(source: string) {
	return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
	TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
