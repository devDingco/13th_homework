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
    "\n  query FetchBoardComments($page: Int, $boardId: ID!) {\n    fetchBoardComments(page: $page, boardId: $boardId) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n      updatedAt\n    }\n  }\n": types.FetchBoardCommentsDocument,
    "\n  mutation CreateBoardComment(\n    $createBoardCommentInput: CreateBoardCommentInput!\n    $boardId: ID!\n  ) {\n    createBoardComment(\n      createBoardCommentInput: $createBoardCommentInput\n      boardId: $boardId\n    ) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n": types.CreateBoardCommentDocument,
    "\n  mutation CommentEditSuccess(\n    $boardCommentId: ID!\n    $updateBoardCommentInput: UpdateBoardCommentInput!\n    $password: String!\n  ) {\n    updateBoardComment(\n      boardCommentId: $boardCommentId\n      updateBoardCommentInput: $updateBoardCommentInput\n      password: $password\n    ) {\n      _id\n      contents\n      rating\n      updatedAt\n      createdAt\n    }\n  }\n": types.CommentEditSuccessDocument,
    "\n  query fetchBoard($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      likeCount\n      dislikeCount\n      images\n      user {\n        _id\n        email\n        name\n        picture\n      }\n      boardAddress{\n        zipcode\n        address\n        addressDetail\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n": types.FetchBoardDocument,
    "\n    query fetchBoards(\n      $endDate: DateTime\n      $startDate: DateTime\n      $search: String\n      $page: Int\n    ){\n        fetchBoards (\n          endDate: $endDate\n          startDate: $startDate\n          search: $search\n          page: $page\n        ){\n            _id\n            writer\n            title\n            contents\n            youtubeUrl\n            likeCount\n            dislikeCount\n            images\n            createdAt\n            updatedAt\n            deletedAt\n        }\n    }\n": types.FetchBoardsDocument,
    "\n  query fetchBoardsCount {\n    fetchBoardsCount\n  }\n": types.FetchBoardsCountDocument,
    "\n  mutation deleteBoard($boardId: ID!) {\n    deleteBoard(boardId: $boardId)\n  }\n": types.DeleteBoardDocument,
    "\n  query FetchBoardsCountDate(\n    $endDate: DateTime\n    $startDate: DateTime\n    $search: String\n  ) {\n    fetchBoardsCount(endDate: $endDate, startDate: $startDate, search: $search)\n  }\n": types.FetchBoardsCountDateDocument,
    "\n    query fetchBoardSearch($mypage: Int, $mysearch: String) {\n        fetchBoards(page: $mypage, search: $mysearch) {\n        _id\n        writer\n        title\n        contents\n     }\n   }\n": types.FetchBoardSearchDocument,
    "\n  mutation createBoard($createBoardInput: CreateBoardInput!) {\n    createBoard(createBoardInput: $createBoardInput) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      likeCount\n      images\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n": types.CreateBoardDocument,
    "\n  mutation updateBoard(\n    $updateBoardInput: UpdateBoardInput!\n    $password: String\n    $boardId: ID!\n  ) {\n    updateBoard(\n      updateBoardInput: $updateBoardInput\n      password: $password\n      boardId: $boardId\n    ) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      likeCount\n      dislikeCount\n      images\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n": types.UpdateBoardDocument,
    "\n   mutation uploadFile($file: Upload!) {\n     uploadFile(file: $file) {\n       url\n     }\n   }\n": types.UploadFileDocument,
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
export function graphql(source: "\n  query FetchBoardComments($page: Int, $boardId: ID!) {\n    fetchBoardComments(page: $page, boardId: $boardId) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query FetchBoardComments($page: Int, $boardId: ID!) {\n    fetchBoardComments(page: $page, boardId: $boardId) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateBoardComment(\n    $createBoardCommentInput: CreateBoardCommentInput!\n    $boardId: ID!\n  ) {\n    createBoardComment(\n      createBoardCommentInput: $createBoardCommentInput\n      boardId: $boardId\n    ) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"): (typeof documents)["\n  mutation CreateBoardComment(\n    $createBoardCommentInput: CreateBoardCommentInput!\n    $boardId: ID!\n  ) {\n    createBoardComment(\n      createBoardCommentInput: $createBoardCommentInput\n      boardId: $boardId\n    ) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CommentEditSuccess(\n    $boardCommentId: ID!\n    $updateBoardCommentInput: UpdateBoardCommentInput!\n    $password: String!\n  ) {\n    updateBoardComment(\n      boardCommentId: $boardCommentId\n      updateBoardCommentInput: $updateBoardCommentInput\n      password: $password\n    ) {\n      _id\n      contents\n      rating\n      updatedAt\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  mutation CommentEditSuccess(\n    $boardCommentId: ID!\n    $updateBoardCommentInput: UpdateBoardCommentInput!\n    $password: String!\n  ) {\n    updateBoardComment(\n      boardCommentId: $boardCommentId\n      updateBoardCommentInput: $updateBoardCommentInput\n      password: $password\n    ) {\n      _id\n      contents\n      rating\n      updatedAt\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoard($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      likeCount\n      dislikeCount\n      images\n      user {\n        _id\n        email\n        name\n        picture\n      }\n      boardAddress{\n        zipcode\n        address\n        addressDetail\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"): (typeof documents)["\n  query fetchBoard($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      likeCount\n      dislikeCount\n      images\n      user {\n        _id\n        email\n        name\n        picture\n      }\n      boardAddress{\n        zipcode\n        address\n        addressDetail\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query fetchBoards(\n      $endDate: DateTime\n      $startDate: DateTime\n      $search: String\n      $page: Int\n    ){\n        fetchBoards (\n          endDate: $endDate\n          startDate: $startDate\n          search: $search\n          page: $page\n        ){\n            _id\n            writer\n            title\n            contents\n            youtubeUrl\n            likeCount\n            dislikeCount\n            images\n            createdAt\n            updatedAt\n            deletedAt\n        }\n    }\n"): (typeof documents)["\n    query fetchBoards(\n      $endDate: DateTime\n      $startDate: DateTime\n      $search: String\n      $page: Int\n    ){\n        fetchBoards (\n          endDate: $endDate\n          startDate: $startDate\n          search: $search\n          page: $page\n        ){\n            _id\n            writer\n            title\n            contents\n            youtubeUrl\n            likeCount\n            dislikeCount\n            images\n            createdAt\n            updatedAt\n            deletedAt\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoardsCount {\n    fetchBoardsCount\n  }\n"): (typeof documents)["\n  query fetchBoardsCount {\n    fetchBoardsCount\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteBoard($boardId: ID!) {\n    deleteBoard(boardId: $boardId)\n  }\n"): (typeof documents)["\n  mutation deleteBoard($boardId: ID!) {\n    deleteBoard(boardId: $boardId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FetchBoardsCountDate(\n    $endDate: DateTime\n    $startDate: DateTime\n    $search: String\n  ) {\n    fetchBoardsCount(endDate: $endDate, startDate: $startDate, search: $search)\n  }\n"): (typeof documents)["\n  query FetchBoardsCountDate(\n    $endDate: DateTime\n    $startDate: DateTime\n    $search: String\n  ) {\n    fetchBoardsCount(endDate: $endDate, startDate: $startDate, search: $search)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query fetchBoardSearch($mypage: Int, $mysearch: String) {\n        fetchBoards(page: $mypage, search: $mysearch) {\n        _id\n        writer\n        title\n        contents\n     }\n   }\n"): (typeof documents)["\n    query fetchBoardSearch($mypage: Int, $mysearch: String) {\n        fetchBoards(page: $mypage, search: $mysearch) {\n        _id\n        writer\n        title\n        contents\n     }\n   }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createBoard($createBoardInput: CreateBoardInput!) {\n    createBoard(createBoardInput: $createBoardInput) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      likeCount\n      images\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"): (typeof documents)["\n  mutation createBoard($createBoardInput: CreateBoardInput!) {\n    createBoard(createBoardInput: $createBoardInput) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      likeCount\n      images\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateBoard(\n    $updateBoardInput: UpdateBoardInput!\n    $password: String\n    $boardId: ID!\n  ) {\n    updateBoard(\n      updateBoardInput: $updateBoardInput\n      password: $password\n      boardId: $boardId\n    ) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      likeCount\n      dislikeCount\n      images\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"): (typeof documents)["\n  mutation updateBoard(\n    $updateBoardInput: UpdateBoardInput!\n    $password: String\n    $boardId: ID!\n  ) {\n    updateBoard(\n      updateBoardInput: $updateBoardInput\n      password: $password\n      boardId: $boardId\n    ) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      likeCount\n      dislikeCount\n      images\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n   mutation uploadFile($file: Upload!) {\n     uploadFile(file: $file) {\n       url\n     }\n   }\n"): (typeof documents)["\n   mutation uploadFile($file: Upload!) {\n     uploadFile(file: $file) {\n       url\n     }\n   }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;