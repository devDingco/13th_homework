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
    "\n  query fetchBoards14_01($mypage: Int) {\n    fetchBoards(page: $mypage) {\n      _id\n      writer\n      title\n      contents\n    }\n  }\n": types.FetchBoards14_01Document,
    "\n  query fetchBoards14_02($mypage: Int) {\n    fetchBoards(page: $mypage) {\n      _id\n      writer\n      title\n      contents\n    }\n  }\n": types.FetchBoards14_02Document,
    "\n  query fetchBoards14_03($mypage: Int) {\n    fetchBoards(page: $mypage) {\n      _id\n      writer\n      title\n      contents\n    }\n  }\n": types.FetchBoards14_03Document,
    "\n  query fetchBoardsCount {\n    fetchBoardsCount\n  }\n": types.FetchBoardsCountDocument,
    "\n  query fetchBoards14_05($mypage: Int) {\n    fetchBoards(page: $mypage) {\n      _id\n      writer\n      title\n      contents\n    }\n  }\n": types.FetchBoards14_05Document,
    "\n  query fetchBoards14_06($mypage: Int) {\n    fetchBoards(page: $mypage) {\n      _id\n      writer\n      title\n      contents\n    }\n  }\n": types.FetchBoards14_06Document,
    "\n  query fetchBoardshello($mypage: Int) {\n    fetchBoards(page: $mypage) {\n      _id\n      writer\n      title\n      contents\n    }\n  }\n": types.FetchBoardshelloDocument,
    "\n  mutation uploadFile($file: Upload!) {\n    uploadFile(file: $file) {\n      url\n    }\n  }\n": types.UploadFileDocument,
    "\n  mutation createBoard($createBoardInput: CreateBoardInput!) {\n    createBoard(createBoardInput: $createBoardInput) {\n      _id\n      writer\n      title\n      contents\n    }\n  }\n": types.CreateBoardDocument,
    "\n  query fetchBoards19_01($mypage: Int, $mysearch: String) {\n    fetchBoards(page: $mypage, search: $mysearch) {\n      _id\n      writer\n      title\n      contents\n    }\n  }\n": types.FetchBoards19_01Document,
    "\n  query fetchBoardsWithSearch($currentPage: Int, $search: String) {\n    fetchBoards(page: $currentPage, search: $search) {\n      _id\n      writer\n      title\n      contents\n    }\n  }\n": types.FetchBoardsWithSearchDocument,
    "\n  query fetchBoards3 {\n    fetchBoards {\n      _id\n      writer\n      title\n      contents\n    }\n  }\n": types.FetchBoards3Document,
    "\n  query fetchBoards1 {\n    fetchBoards {\n      _id\n      writer\n    }\n  }\n": types.FetchBoards1Document,
    "\n  query fetchBoards4 {\n    fetchBoards {\n      _id\n      writer\n      title\n      contents\n    }\n  }\n": types.FetchBoards4Document,
    "\n  mutation updateBoard {\n    updateBoard(\n      boardId: \"671e27735413b3002914e0e4\"\n      password: \"1234\"\n      updateBoardInput: { title: \"zzz1234\", contents: \"zzz1234\" }\n    ) {\n      _id\n      writer\n      title\n      contents\n    }\n  }\n": types.UpdateBoardDocument,
    "\n  query fetchUserLoggedIn {\n    fetchUserLoggedIn {\n      _id\n      email\n      name\n    }\n  }\n": types.FetchUserLoggedInDocument,
    "\n  mutation loginUser($email: String!, $password: String!) {\n    loginUser(email: $email, password: $password) {\n      accessToken\n    }\n  }\n": types.LoginUserDocument,
    "\n  query fetchBoards5($page: Int) {\n    fetchBoards(page: $page) {\n      _id\n      writer\n      title\n      contents\n    }\n  }\n": types.FetchBoards5Document,
    "\n  query fetchBoards2 {\n    fetchBoards {\n      _id\n      writer\n      title\n    }\n  }\n": types.FetchBoards2Document,
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
export function graphql(source: "\n  query fetchBoards14_01($mypage: Int) {\n    fetchBoards(page: $mypage) {\n      _id\n      writer\n      title\n      contents\n    }\n  }\n"): (typeof documents)["\n  query fetchBoards14_01($mypage: Int) {\n    fetchBoards(page: $mypage) {\n      _id\n      writer\n      title\n      contents\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoards14_02($mypage: Int) {\n    fetchBoards(page: $mypage) {\n      _id\n      writer\n      title\n      contents\n    }\n  }\n"): (typeof documents)["\n  query fetchBoards14_02($mypage: Int) {\n    fetchBoards(page: $mypage) {\n      _id\n      writer\n      title\n      contents\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoards14_03($mypage: Int) {\n    fetchBoards(page: $mypage) {\n      _id\n      writer\n      title\n      contents\n    }\n  }\n"): (typeof documents)["\n  query fetchBoards14_03($mypage: Int) {\n    fetchBoards(page: $mypage) {\n      _id\n      writer\n      title\n      contents\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoardsCount {\n    fetchBoardsCount\n  }\n"): (typeof documents)["\n  query fetchBoardsCount {\n    fetchBoardsCount\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoards14_05($mypage: Int) {\n    fetchBoards(page: $mypage) {\n      _id\n      writer\n      title\n      contents\n    }\n  }\n"): (typeof documents)["\n  query fetchBoards14_05($mypage: Int) {\n    fetchBoards(page: $mypage) {\n      _id\n      writer\n      title\n      contents\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoards14_06($mypage: Int) {\n    fetchBoards(page: $mypage) {\n      _id\n      writer\n      title\n      contents\n    }\n  }\n"): (typeof documents)["\n  query fetchBoards14_06($mypage: Int) {\n    fetchBoards(page: $mypage) {\n      _id\n      writer\n      title\n      contents\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoardshello($mypage: Int) {\n    fetchBoards(page: $mypage) {\n      _id\n      writer\n      title\n      contents\n    }\n  }\n"): (typeof documents)["\n  query fetchBoardshello($mypage: Int) {\n    fetchBoards(page: $mypage) {\n      _id\n      writer\n      title\n      contents\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation uploadFile($file: Upload!) {\n    uploadFile(file: $file) {\n      url\n    }\n  }\n"): (typeof documents)["\n  mutation uploadFile($file: Upload!) {\n    uploadFile(file: $file) {\n      url\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createBoard($createBoardInput: CreateBoardInput!) {\n    createBoard(createBoardInput: $createBoardInput) {\n      _id\n      writer\n      title\n      contents\n    }\n  }\n"): (typeof documents)["\n  mutation createBoard($createBoardInput: CreateBoardInput!) {\n    createBoard(createBoardInput: $createBoardInput) {\n      _id\n      writer\n      title\n      contents\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoards19_01($mypage: Int, $mysearch: String) {\n    fetchBoards(page: $mypage, search: $mysearch) {\n      _id\n      writer\n      title\n      contents\n    }\n  }\n"): (typeof documents)["\n  query fetchBoards19_01($mypage: Int, $mysearch: String) {\n    fetchBoards(page: $mypage, search: $mysearch) {\n      _id\n      writer\n      title\n      contents\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoardsWithSearch($currentPage: Int, $search: String) {\n    fetchBoards(page: $currentPage, search: $search) {\n      _id\n      writer\n      title\n      contents\n    }\n  }\n"): (typeof documents)["\n  query fetchBoardsWithSearch($currentPage: Int, $search: String) {\n    fetchBoards(page: $currentPage, search: $search) {\n      _id\n      writer\n      title\n      contents\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoards3 {\n    fetchBoards {\n      _id\n      writer\n      title\n      contents\n    }\n  }\n"): (typeof documents)["\n  query fetchBoards3 {\n    fetchBoards {\n      _id\n      writer\n      title\n      contents\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoards1 {\n    fetchBoards {\n      _id\n      writer\n    }\n  }\n"): (typeof documents)["\n  query fetchBoards1 {\n    fetchBoards {\n      _id\n      writer\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoards4 {\n    fetchBoards {\n      _id\n      writer\n      title\n      contents\n    }\n  }\n"): (typeof documents)["\n  query fetchBoards4 {\n    fetchBoards {\n      _id\n      writer\n      title\n      contents\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateBoard {\n    updateBoard(\n      boardId: \"671e27735413b3002914e0e4\"\n      password: \"1234\"\n      updateBoardInput: { title: \"zzz1234\", contents: \"zzz1234\" }\n    ) {\n      _id\n      writer\n      title\n      contents\n    }\n  }\n"): (typeof documents)["\n  mutation updateBoard {\n    updateBoard(\n      boardId: \"671e27735413b3002914e0e4\"\n      password: \"1234\"\n      updateBoardInput: { title: \"zzz1234\", contents: \"zzz1234\" }\n    ) {\n      _id\n      writer\n      title\n      contents\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchUserLoggedIn {\n    fetchUserLoggedIn {\n      _id\n      email\n      name\n    }\n  }\n"): (typeof documents)["\n  query fetchUserLoggedIn {\n    fetchUserLoggedIn {\n      _id\n      email\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation loginUser($email: String!, $password: String!) {\n    loginUser(email: $email, password: $password) {\n      accessToken\n    }\n  }\n"): (typeof documents)["\n  mutation loginUser($email: String!, $password: String!) {\n    loginUser(email: $email, password: $password) {\n      accessToken\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoards5($page: Int) {\n    fetchBoards(page: $page) {\n      _id\n      writer\n      title\n      contents\n    }\n  }\n"): (typeof documents)["\n  query fetchBoards5($page: Int) {\n    fetchBoards(page: $page) {\n      _id\n      writer\n      title\n      contents\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoards2 {\n    fetchBoards {\n      _id\n      writer\n      title\n    }\n  }\n"): (typeof documents)["\n  query fetchBoards2 {\n    fetchBoards {\n      _id\n      writer\n      title\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;