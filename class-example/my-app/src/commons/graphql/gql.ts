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
    "\nmutation createBoard06_03($mywriter: String, $mytitle: String, $mycontent: String) { \n\tcreateBoard (\n    writer: $mywriter\n    title: $mytitle\n    contents: $mycontent\n    \n  ) {\n    _id\n    number\n    message\n  } \n}\n": types.CreateBoard06_03Document,
    "\nmutation createBoard06_04($mywriter: String, $mytitle: String, $mycontent: String) { \n\tcreateBoard (\n    writer: $mywriter\n    title: $mytitle\n    contents: $mycontent\n    \n  ) {\n    _id\n    number\n    message\n  } \n}\n": types.CreateBoard06_04Document,
    "\nmutation createBoard06_05($mywriter: String, $mytitle: String, $mycontent: String) { \n\tcreateBoard (\n    writer: $mywriter\n    title: $mytitle\n    contents: $mycontent\n    \n  ) {\n    _id\n    number\n    message\n  } \n}\n": types.CreateBoard06_05Document,
    "\n  mutation createProduct($seller: String, $createProductInput: CreateProductInput!) {\n    createProduct(seller: $seller, createProductInput: $createProductInput) {\n      _id\n      number\n      message\n    }\n  }\n": types.CreateProductDocument,
    "\n    query fetchBoard($mynumber: Int) {\n    fetchBoard(number: $mynumber){\n        number\n        writer\n        title\n        contents\n    }\n    }\n": types.FetchBoardDocument,
    "\nmutation createBoard07_04($mywriter: String, $mytitle: String, $mycontent: String) { \n\tcreateBoard (\n    writer: $mywriter\n    title: $mytitle\n    contents: $mycontent\n    \n  ) {\n    _id\n    number\n    message\n  } \n}\n": types.CreateBoard07_04Document,
    "\n  mutation  deleteBoard($mynumber: Int){\n    deleteBoard(number: $mynumber){\n      _id\n      number\n      message\n      \n    }\n  }\n": types.DeleteBoardDocument,
    "\nmutation createBoard10_01($mywriter: String, $mytitle: String, $mycontent: String) { \n\tcreateBoard (\n    writer: $mywriter\n    title: $mytitle\n    contents: $mycontent\n    \n  ) {\n    _id\n    number\n    message\n  } \n}\n": types.CreateBoard10_01Document,
    "\n    query fetchBoards{\n    fetchBoards(page:1){\n        number\n        writer\n        title\n        contents\n    }\n    }\n": types.FetchBoardsDocument,
    "\n    mutation createBoard09_03($mywriter: String, $mytitle: String, $mycontents: String) { \n        createBoard (\n        writer: $mywriter\n        title: $mytitle\n        contents: $mycontents\n        \n    ) {\n        _id\n        number\n        message\n     } \n    }\n": types.CreateBoard09_03Document,
    "\n    mutation updateBoard($mynumber: Int, $mywriter: String, $mytitle: String, $mycontents: String) {\n        updateBoard(number: $mynumber, writer: $mywriter, title: $mytitle, contents: $mycontents) {\n            _id\n            number\n            message\n        }\n    }\n": types.UpdateBoardDocument,
    "\n    mutation createBoard09_04($mywriter: String, $mytitle: String, $mycontents: String) { \n        createBoard (\n        writer: $mywriter\n        title: $mytitle\n        contents: $mycontents\n        \n    ) {\n        _id\n        number\n        message\n     } \n    }\n": types.CreateBoard09_04Document,
    "\n    mutation createBoard($mywriter: String, $mytitle: String, $mycontents: String) { \n        createBoard (\n        writer: $mywriter\n        title: $mytitle\n        contents: $mycontents\n        \n    ) {\n        _id\n        number\n        message\n     } \n    }\n": types.CreateBoardDocument,
    "\n    mutation createBoard09_06($mywriter: String, $mytitle: String, $mycontents: String) { \n        createBoard (\n        writer: $mywriter\n        title: $mytitle\n        contents: $mycontents\n        \n    ) {\n        _id\n        number\n        message\n     } \n    }\n": types.CreateBoard09_06Document,
    "\n    mutation createBoard09_07($mywriter: String, $mytitle: String, $mycontents: String) { \n        createBoard (\n        writer: $mywriter\n        title: $mytitle\n        contents: $mycontents\n        \n    ) {\n        _id\n        number\n        message\n     } \n    }\n": types.CreateBoard09_07Document,
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
export function graphql(source: "\nmutation createBoard06_03($mywriter: String, $mytitle: String, $mycontent: String) { \n\tcreateBoard (\n    writer: $mywriter\n    title: $mytitle\n    contents: $mycontent\n    \n  ) {\n    _id\n    number\n    message\n  } \n}\n"): (typeof documents)["\nmutation createBoard06_03($mywriter: String, $mytitle: String, $mycontent: String) { \n\tcreateBoard (\n    writer: $mywriter\n    title: $mytitle\n    contents: $mycontent\n    \n  ) {\n    _id\n    number\n    message\n  } \n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation createBoard06_04($mywriter: String, $mytitle: String, $mycontent: String) { \n\tcreateBoard (\n    writer: $mywriter\n    title: $mytitle\n    contents: $mycontent\n    \n  ) {\n    _id\n    number\n    message\n  } \n}\n"): (typeof documents)["\nmutation createBoard06_04($mywriter: String, $mytitle: String, $mycontent: String) { \n\tcreateBoard (\n    writer: $mywriter\n    title: $mytitle\n    contents: $mycontent\n    \n  ) {\n    _id\n    number\n    message\n  } \n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation createBoard06_05($mywriter: String, $mytitle: String, $mycontent: String) { \n\tcreateBoard (\n    writer: $mywriter\n    title: $mytitle\n    contents: $mycontent\n    \n  ) {\n    _id\n    number\n    message\n  } \n}\n"): (typeof documents)["\nmutation createBoard06_05($mywriter: String, $mytitle: String, $mycontent: String) { \n\tcreateBoard (\n    writer: $mywriter\n    title: $mytitle\n    contents: $mycontent\n    \n  ) {\n    _id\n    number\n    message\n  } \n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createProduct($seller: String, $createProductInput: CreateProductInput!) {\n    createProduct(seller: $seller, createProductInput: $createProductInput) {\n      _id\n      number\n      message\n    }\n  }\n"): (typeof documents)["\n  mutation createProduct($seller: String, $createProductInput: CreateProductInput!) {\n    createProduct(seller: $seller, createProductInput: $createProductInput) {\n      _id\n      number\n      message\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query fetchBoard($mynumber: Int) {\n    fetchBoard(number: $mynumber){\n        number\n        writer\n        title\n        contents\n    }\n    }\n"): (typeof documents)["\n    query fetchBoard($mynumber: Int) {\n    fetchBoard(number: $mynumber){\n        number\n        writer\n        title\n        contents\n    }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation createBoard07_04($mywriter: String, $mytitle: String, $mycontent: String) { \n\tcreateBoard (\n    writer: $mywriter\n    title: $mytitle\n    contents: $mycontent\n    \n  ) {\n    _id\n    number\n    message\n  } \n}\n"): (typeof documents)["\nmutation createBoard07_04($mywriter: String, $mytitle: String, $mycontent: String) { \n\tcreateBoard (\n    writer: $mywriter\n    title: $mytitle\n    contents: $mycontent\n    \n  ) {\n    _id\n    number\n    message\n  } \n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation  deleteBoard($mynumber: Int){\n    deleteBoard(number: $mynumber){\n      _id\n      number\n      message\n      \n    }\n  }\n"): (typeof documents)["\n  mutation  deleteBoard($mynumber: Int){\n    deleteBoard(number: $mynumber){\n      _id\n      number\n      message\n      \n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation createBoard10_01($mywriter: String, $mytitle: String, $mycontent: String) { \n\tcreateBoard (\n    writer: $mywriter\n    title: $mytitle\n    contents: $mycontent\n    \n  ) {\n    _id\n    number\n    message\n  } \n}\n"): (typeof documents)["\nmutation createBoard10_01($mywriter: String, $mytitle: String, $mycontent: String) { \n\tcreateBoard (\n    writer: $mywriter\n    title: $mytitle\n    contents: $mycontent\n    \n  ) {\n    _id\n    number\n    message\n  } \n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query fetchBoards{\n    fetchBoards(page:1){\n        number\n        writer\n        title\n        contents\n    }\n    }\n"): (typeof documents)["\n    query fetchBoards{\n    fetchBoards(page:1){\n        number\n        writer\n        title\n        contents\n    }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation createBoard09_03($mywriter: String, $mytitle: String, $mycontents: String) { \n        createBoard (\n        writer: $mywriter\n        title: $mytitle\n        contents: $mycontents\n        \n    ) {\n        _id\n        number\n        message\n     } \n    }\n"): (typeof documents)["\n    mutation createBoard09_03($mywriter: String, $mytitle: String, $mycontents: String) { \n        createBoard (\n        writer: $mywriter\n        title: $mytitle\n        contents: $mycontents\n        \n    ) {\n        _id\n        number\n        message\n     } \n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation updateBoard($mynumber: Int, $mywriter: String, $mytitle: String, $mycontents: String) {\n        updateBoard(number: $mynumber, writer: $mywriter, title: $mytitle, contents: $mycontents) {\n            _id\n            number\n            message\n        }\n    }\n"): (typeof documents)["\n    mutation updateBoard($mynumber: Int, $mywriter: String, $mytitle: String, $mycontents: String) {\n        updateBoard(number: $mynumber, writer: $mywriter, title: $mytitle, contents: $mycontents) {\n            _id\n            number\n            message\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation createBoard09_04($mywriter: String, $mytitle: String, $mycontents: String) { \n        createBoard (\n        writer: $mywriter\n        title: $mytitle\n        contents: $mycontents\n        \n    ) {\n        _id\n        number\n        message\n     } \n    }\n"): (typeof documents)["\n    mutation createBoard09_04($mywriter: String, $mytitle: String, $mycontents: String) { \n        createBoard (\n        writer: $mywriter\n        title: $mytitle\n        contents: $mycontents\n        \n    ) {\n        _id\n        number\n        message\n     } \n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation createBoard($mywriter: String, $mytitle: String, $mycontents: String) { \n        createBoard (\n        writer: $mywriter\n        title: $mytitle\n        contents: $mycontents\n        \n    ) {\n        _id\n        number\n        message\n     } \n    }\n"): (typeof documents)["\n    mutation createBoard($mywriter: String, $mytitle: String, $mycontents: String) { \n        createBoard (\n        writer: $mywriter\n        title: $mytitle\n        contents: $mycontents\n        \n    ) {\n        _id\n        number\n        message\n     } \n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation createBoard09_06($mywriter: String, $mytitle: String, $mycontents: String) { \n        createBoard (\n        writer: $mywriter\n        title: $mytitle\n        contents: $mycontents\n        \n    ) {\n        _id\n        number\n        message\n     } \n    }\n"): (typeof documents)["\n    mutation createBoard09_06($mywriter: String, $mytitle: String, $mycontents: String) { \n        createBoard (\n        writer: $mywriter\n        title: $mytitle\n        contents: $mycontents\n        \n    ) {\n        _id\n        number\n        message\n     } \n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation createBoard09_07($mywriter: String, $mytitle: String, $mycontents: String) { \n        createBoard (\n        writer: $mywriter\n        title: $mytitle\n        contents: $mycontents\n        \n    ) {\n        _id\n        number\n        message\n     } \n    }\n"): (typeof documents)["\n    mutation createBoard09_07($mywriter: String, $mytitle: String, $mycontents: String) { \n        createBoard (\n        writer: $mywriter\n        title: $mytitle\n        contents: $mycontents\n        \n    ) {\n        _id\n        number\n        message\n     } \n    }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;