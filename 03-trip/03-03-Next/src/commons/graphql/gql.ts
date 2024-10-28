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
    "\n    mutation createBoard($createBoardInput: CreateBoardInput!) {\n        createBoard(createBoardInput: $createBoardInput) {\n            _id\n            writer\n            title\n            contents\n            youtubeUrl\n            boardAddress {\n                zipcode\n                address\n                addressDetail\n            }\n            images\n            createdAt\n        }\n    }\n": types.CreateBoardDocument,
    "\n    query fetchBoard($boardId: ID!) {\n        fetchBoard(boardId: $boardId) {\n            _id\n            writer\n            title\n            contents\n            youtubeUrl\n            boardAddress {\n                zipcode\n                address\n                addressDetail\n            }\n            images\n            createdAt\n            updatedAt\n        }\n    }\n": types.FetchBoardDocument,
    "\n    query fetchBoards($page: Int, $search: String) {\n        fetchBoards(page: $page, search: $search) {\n            _id\n            writer\n            title\n            contents\n            createdAt\n            updatedAt\n        }\n    }\n": types.FetchBoardsDocument,
    "\n    query fetchBoardsCount {\n        fetchBoardsCount\n    }\n": types.FetchBoardsCountDocument,
    "\n    mutation updateBoard(\n        $boardId: ID!\n        $password: String\n        $updateBoardInput: UpdateBoardInput!\n    ) {\n        updateBoard(\n            boardId: $boardId\n            password: $password\n            updateBoardInput: $updateBoardInput\n        ) {\n            _id\n            writer\n            title\n            contents\n            youtubeUrl\n            boardAddress {\n                zipcode\n                address\n                addressDetail\n            }\n            images\n            updatedAt\n        }\n    }\n": types.UpdateBoardDocument,
    "\n    mutation deleteBoard($boardId: ID!) {\n        deleteBoard(boardId: $boardId)\n    }\n": types.DeleteBoardDocument,
    "\n    mutation createBoardComment(\n        $boardId: ID!\n        $createBoardCommentInput: CreateBoardCommentInput!\n    ) {\n        createBoardComment(\n            boardId: $boardId\n            createBoardCommentInput: $createBoardCommentInput\n        ) {\n            _id\n            writer\n            contents\n            rating\n            createdAt\n        }\n    }\n": types.CreateBoardCommentDocument,
    "\n    query fetchBoardComments($page: Int, $boardId: ID!) {\n        fetchBoardComments(page: $page, boardId: $boardId) {\n            _id\n            writer\n            contents\n            rating\n            createdAt\n        }\n    }\n": types.FetchBoardCommentsDocument,
    "\n    mutation updateBoardComment(\n        $boardCommentId: ID!\n        $password: String\n        $updateBoardCommentInput: UpdateBoardCommentInput!\n    ) {\n        updateBoardComment(\n            boardCommentId: $boardCommentId\n            password: $password\n            updateBoardCommentInput: $updateBoardCommentInput\n        ) {\n            _id\n            writer\n            contents\n            rating\n            createdAt\n            updatedAt\n        }\n    }\n": types.UpdateBoardCommentDocument,
    "\n    mutation uploadFile($file: Upload!) {\n        uploadFile(file: $file) {\n            _id\n            url\n            size\n            createdAt\n        }\n    }\n": types.UploadFileDocument,
    "\n    mutation createUser($createUserInput: CreateUserInput!) {\n        createUser(createUserInput: $createUserInput) {\n            _id\n            email\n            name\n            createdAt\n        }\n    }\n": types.CreateUserDocument,
    "\n    mutation loginUser($email: String!, $password: String!) {\n        loginUser(email: \"\", password: \"\") {\n            accessToken\n        }\n    }\n": types.LoginUserDocument,
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
export function graphql(source: "\n    mutation createBoard($createBoardInput: CreateBoardInput!) {\n        createBoard(createBoardInput: $createBoardInput) {\n            _id\n            writer\n            title\n            contents\n            youtubeUrl\n            boardAddress {\n                zipcode\n                address\n                addressDetail\n            }\n            images\n            createdAt\n        }\n    }\n"): (typeof documents)["\n    mutation createBoard($createBoardInput: CreateBoardInput!) {\n        createBoard(createBoardInput: $createBoardInput) {\n            _id\n            writer\n            title\n            contents\n            youtubeUrl\n            boardAddress {\n                zipcode\n                address\n                addressDetail\n            }\n            images\n            createdAt\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query fetchBoard($boardId: ID!) {\n        fetchBoard(boardId: $boardId) {\n            _id\n            writer\n            title\n            contents\n            youtubeUrl\n            boardAddress {\n                zipcode\n                address\n                addressDetail\n            }\n            images\n            createdAt\n            updatedAt\n        }\n    }\n"): (typeof documents)["\n    query fetchBoard($boardId: ID!) {\n        fetchBoard(boardId: $boardId) {\n            _id\n            writer\n            title\n            contents\n            youtubeUrl\n            boardAddress {\n                zipcode\n                address\n                addressDetail\n            }\n            images\n            createdAt\n            updatedAt\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query fetchBoards($page: Int, $search: String) {\n        fetchBoards(page: $page, search: $search) {\n            _id\n            writer\n            title\n            contents\n            createdAt\n            updatedAt\n        }\n    }\n"): (typeof documents)["\n    query fetchBoards($page: Int, $search: String) {\n        fetchBoards(page: $page, search: $search) {\n            _id\n            writer\n            title\n            contents\n            createdAt\n            updatedAt\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query fetchBoardsCount {\n        fetchBoardsCount\n    }\n"): (typeof documents)["\n    query fetchBoardsCount {\n        fetchBoardsCount\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation updateBoard(\n        $boardId: ID!\n        $password: String\n        $updateBoardInput: UpdateBoardInput!\n    ) {\n        updateBoard(\n            boardId: $boardId\n            password: $password\n            updateBoardInput: $updateBoardInput\n        ) {\n            _id\n            writer\n            title\n            contents\n            youtubeUrl\n            boardAddress {\n                zipcode\n                address\n                addressDetail\n            }\n            images\n            updatedAt\n        }\n    }\n"): (typeof documents)["\n    mutation updateBoard(\n        $boardId: ID!\n        $password: String\n        $updateBoardInput: UpdateBoardInput!\n    ) {\n        updateBoard(\n            boardId: $boardId\n            password: $password\n            updateBoardInput: $updateBoardInput\n        ) {\n            _id\n            writer\n            title\n            contents\n            youtubeUrl\n            boardAddress {\n                zipcode\n                address\n                addressDetail\n            }\n            images\n            updatedAt\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation deleteBoard($boardId: ID!) {\n        deleteBoard(boardId: $boardId)\n    }\n"): (typeof documents)["\n    mutation deleteBoard($boardId: ID!) {\n        deleteBoard(boardId: $boardId)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation createBoardComment(\n        $boardId: ID!\n        $createBoardCommentInput: CreateBoardCommentInput!\n    ) {\n        createBoardComment(\n            boardId: $boardId\n            createBoardCommentInput: $createBoardCommentInput\n        ) {\n            _id\n            writer\n            contents\n            rating\n            createdAt\n        }\n    }\n"): (typeof documents)["\n    mutation createBoardComment(\n        $boardId: ID!\n        $createBoardCommentInput: CreateBoardCommentInput!\n    ) {\n        createBoardComment(\n            boardId: $boardId\n            createBoardCommentInput: $createBoardCommentInput\n        ) {\n            _id\n            writer\n            contents\n            rating\n            createdAt\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query fetchBoardComments($page: Int, $boardId: ID!) {\n        fetchBoardComments(page: $page, boardId: $boardId) {\n            _id\n            writer\n            contents\n            rating\n            createdAt\n        }\n    }\n"): (typeof documents)["\n    query fetchBoardComments($page: Int, $boardId: ID!) {\n        fetchBoardComments(page: $page, boardId: $boardId) {\n            _id\n            writer\n            contents\n            rating\n            createdAt\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation updateBoardComment(\n        $boardCommentId: ID!\n        $password: String\n        $updateBoardCommentInput: UpdateBoardCommentInput!\n    ) {\n        updateBoardComment(\n            boardCommentId: $boardCommentId\n            password: $password\n            updateBoardCommentInput: $updateBoardCommentInput\n        ) {\n            _id\n            writer\n            contents\n            rating\n            createdAt\n            updatedAt\n        }\n    }\n"): (typeof documents)["\n    mutation updateBoardComment(\n        $boardCommentId: ID!\n        $password: String\n        $updateBoardCommentInput: UpdateBoardCommentInput!\n    ) {\n        updateBoardComment(\n            boardCommentId: $boardCommentId\n            password: $password\n            updateBoardCommentInput: $updateBoardCommentInput\n        ) {\n            _id\n            writer\n            contents\n            rating\n            createdAt\n            updatedAt\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation uploadFile($file: Upload!) {\n        uploadFile(file: $file) {\n            _id\n            url\n            size\n            createdAt\n        }\n    }\n"): (typeof documents)["\n    mutation uploadFile($file: Upload!) {\n        uploadFile(file: $file) {\n            _id\n            url\n            size\n            createdAt\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation createUser($createUserInput: CreateUserInput!) {\n        createUser(createUserInput: $createUserInput) {\n            _id\n            email\n            name\n            createdAt\n        }\n    }\n"): (typeof documents)["\n    mutation createUser($createUserInput: CreateUserInput!) {\n        createUser(createUserInput: $createUserInput) {\n            _id\n            email\n            name\n            createdAt\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation loginUser($email: String!, $password: String!) {\n        loginUser(email: \"\", password: \"\") {\n            accessToken\n        }\n    }\n"): (typeof documents)["\n    mutation loginUser($email: String!, $password: String!) {\n        loginUser(email: \"\", password: \"\") {\n            accessToken\n        }\n    }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;