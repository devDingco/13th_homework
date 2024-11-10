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
    "\n  query fetchUserLoggedIn {\n    fetchUserLoggedIn {\n      _id\n      email\n      name\n      picture\n    }\n  }\n": types.FetchUserLoggedInDocument,
    "\n  mutation resotreAccessToken {\n    restoreAccessToken {\n      accessToken\n    }\n  }\n": types.ResotreAccessTokenDocument,
    "\n  query fetchBoardComments($page: Int, $boardId: ID!) {\n    fetchBoardComments(page: $page, boardId: $boardId) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n    }\n  }\n": types.FetchBoardCommentsDocument,
    "\n  mutation createBoardComment(\n    $createBoardCommentInput: CreateBoardCommentInput!\n    $boardId: ID!\n  ) {\n    createBoardComment(\n      createBoardCommentInput: $createBoardCommentInput\n      boardId: $boardId\n    ) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n    }\n  }\n": types.CreateBoardCommentDocument,
    "\n  mutation updateBoardComment(\n    $updateBoardCommentInput: UpdateBoardCommentInput!\n    $password: String\n    $boardCommentId: ID!\n  ) {\n    updateBoardComment(\n      updateBoardCommentInput: $updateBoardCommentInput\n      password: $password\n      boardCommentId: $boardCommentId\n    ) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n      updatedAt\n    }\n  }\n": types.UpdateBoardCommentDocument,
    "\n  query fetchBoard($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      youtubeUrl\n      createdAt\n      images\n    }\n  }\n": types.FetchBoardDocument,
    "\n  query fetchBoardsCount(\n    $endDate: DateTime\n    $startDate: DateTime\n    $search: String\n  ) {\n    fetchBoardsCount(endDate: $endDate, startDate: $startDate, search: $search)\n  }\n": types.FetchBoardsCountDocument,
    "\n  query fetchBoards(\n    $endDate: DateTime\n    $startDate: DateTime\n    $mypage: Int\n    $search: String\n  ) {\n    fetchBoards(\n      endDate: $endDate\n      startDate: $startDate\n      page: $mypage\n      search: $search\n    ) {\n      _id\n      title\n      writer\n      createdAt\n    }\n  }\n": types.FetchBoardsDocument,
    "\n  mutation deleteBoard($boardId: ID!) {\n    deleteBoard(boardId: $boardId)\n  }\n": types.DeleteBoardDocument,
    "\n  # graphql 타입 지정\n  mutation createBoard($createBoardInput: CreateBoardInput!) {\n    # 전달할 변수\n    createBoard(createBoardInput: $createBoardInput) {\n      _id\n      writer\n      title\n      contents\n      createdAt\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      likeCount\n      dislikeCount\n      youtubeUrl\n      images\n    }\n  }\n": types.CreateBoardDocument,
    "\n  mutation updateBoard(\n    $updateBoardInput: UpdateBoardInput!\n    $password: String\n    $boardId: ID!\n  ) {\n    updateBoard(\n      updateBoardInput: $updateBoardInput\n      password: $password\n      boardId: $boardId\n    ) {\n      _id\n      writer\n      title\n      contents\n      createdAt\n    }\n  }\n": types.UpdateBoardDocument,
    "\n  mutation uploadFile($file: Upload!) {\n    uploadFile(file: $file) {\n      url\n    }\n  }\n": types.UploadFileDocument,
    "\n  mutation loginUser($email: String!, $password: String!) {\n    loginUser(email: $email, password: $password) {\n      accessToken\n    }\n  }\n": types.LoginUserDocument,
    "\n  query fetchTravelproduct($productId: ID!) {\n    fetchTravelproduct(travelproductId: $productId) {\n      _id\n      name\n      remarks\n      contents\n      price\n      tags\n      images\n      pickedCount\n      travelproductAddress {\n        zipcode\n        lat\n        lng\n      }\n      buyer {\n        _id\n      }\n      seller {\n        _id\n        name\n        picture\n      }\n      soldAt\n    }\n  }\n": types.FetchTravelproductDocument,
    "\n  mutation toggleTravelproductPick($travelproductId: ID!) {\n    toggleTravelproductPick(travelproductId: $travelproductId)\n  }\n": types.ToggleTravelproductPickDocument,
    "\n  query fetchTravelproductQuestions($page: Int, $travelproductId: ID!) {\n    fetchTravelproductQuestions(\n      page: $page\n      travelproductId: $travelproductId\n    ) {\n      _id\n      contents\n      user {\n        name\n      }\n      createdAt\n    }\n  }\n": types.FetchTravelproductQuestionsDocument,
    "\n  mutation createTravelproductQuestion(\n    $createTravelproductQuestionInput: CreateTravelproductQuestionInput!\n    $travelproductId: ID!\n  ) {\n    createTravelproductQuestion(\n      createTravelproductQuestionInput: $createTravelproductQuestionInput\n      travelproductId: $travelproductId\n    ) {\n      _id\n      contents\n      user {\n        name\n      }\n      createdAt\n    }\n  }\n": types.CreateTravelproductQuestionDocument,
    "\n  query fetchTravelproducts {\n    fetchTravelproducts {\n      _id\n      name\n      remarks\n      contents\n      price\n      tags\n\n      buyer {\n        name\n      }\n    }\n  }\n": types.FetchTravelproductsDocument,
    "\n  mutation createTravelproduct(\n    $createTravelproductInput: CreateTravelproductInput!\n  ) {\n    createTravelproduct(createTravelproductInput: $createTravelproductInput) {\n      _id\n      seller {\n        _id\n        name\n      }\n    }\n  }\n": types.CreateTravelproductDocument,
    "\n  mutation createUser($createUserInput: CreateUserInput!) {\n    createUser(createUserInput: $createUserInput) {\n      _id\n    }\n  }\n": types.CreateUserDocument,
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
export function graphql(source: "\n  query fetchUserLoggedIn {\n    fetchUserLoggedIn {\n      _id\n      email\n      name\n      picture\n    }\n  }\n"): (typeof documents)["\n  query fetchUserLoggedIn {\n    fetchUserLoggedIn {\n      _id\n      email\n      name\n      picture\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation resotreAccessToken {\n    restoreAccessToken {\n      accessToken\n    }\n  }\n"): (typeof documents)["\n  mutation resotreAccessToken {\n    restoreAccessToken {\n      accessToken\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoardComments($page: Int, $boardId: ID!) {\n    fetchBoardComments(page: $page, boardId: $boardId) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query fetchBoardComments($page: Int, $boardId: ID!) {\n    fetchBoardComments(page: $page, boardId: $boardId) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createBoardComment(\n    $createBoardCommentInput: CreateBoardCommentInput!\n    $boardId: ID!\n  ) {\n    createBoardComment(\n      createBoardCommentInput: $createBoardCommentInput\n      boardId: $boardId\n    ) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  mutation createBoardComment(\n    $createBoardCommentInput: CreateBoardCommentInput!\n    $boardId: ID!\n  ) {\n    createBoardComment(\n      createBoardCommentInput: $createBoardCommentInput\n      boardId: $boardId\n    ) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateBoardComment(\n    $updateBoardCommentInput: UpdateBoardCommentInput!\n    $password: String\n    $boardCommentId: ID!\n  ) {\n    updateBoardComment(\n      updateBoardCommentInput: $updateBoardCommentInput\n      password: $password\n      boardCommentId: $boardCommentId\n    ) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation updateBoardComment(\n    $updateBoardCommentInput: UpdateBoardCommentInput!\n    $password: String\n    $boardCommentId: ID!\n  ) {\n    updateBoardComment(\n      updateBoardCommentInput: $updateBoardCommentInput\n      password: $password\n      boardCommentId: $boardCommentId\n    ) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoard($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      youtubeUrl\n      createdAt\n      images\n    }\n  }\n"): (typeof documents)["\n  query fetchBoard($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      youtubeUrl\n      createdAt\n      images\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoardsCount(\n    $endDate: DateTime\n    $startDate: DateTime\n    $search: String\n  ) {\n    fetchBoardsCount(endDate: $endDate, startDate: $startDate, search: $search)\n  }\n"): (typeof documents)["\n  query fetchBoardsCount(\n    $endDate: DateTime\n    $startDate: DateTime\n    $search: String\n  ) {\n    fetchBoardsCount(endDate: $endDate, startDate: $startDate, search: $search)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoards(\n    $endDate: DateTime\n    $startDate: DateTime\n    $mypage: Int\n    $search: String\n  ) {\n    fetchBoards(\n      endDate: $endDate\n      startDate: $startDate\n      page: $mypage\n      search: $search\n    ) {\n      _id\n      title\n      writer\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query fetchBoards(\n    $endDate: DateTime\n    $startDate: DateTime\n    $mypage: Int\n    $search: String\n  ) {\n    fetchBoards(\n      endDate: $endDate\n      startDate: $startDate\n      page: $mypage\n      search: $search\n    ) {\n      _id\n      title\n      writer\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteBoard($boardId: ID!) {\n    deleteBoard(boardId: $boardId)\n  }\n"): (typeof documents)["\n  mutation deleteBoard($boardId: ID!) {\n    deleteBoard(boardId: $boardId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  # graphql 타입 지정\n  mutation createBoard($createBoardInput: CreateBoardInput!) {\n    # 전달할 변수\n    createBoard(createBoardInput: $createBoardInput) {\n      _id\n      writer\n      title\n      contents\n      createdAt\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      likeCount\n      dislikeCount\n      youtubeUrl\n      images\n    }\n  }\n"): (typeof documents)["\n  # graphql 타입 지정\n  mutation createBoard($createBoardInput: CreateBoardInput!) {\n    # 전달할 변수\n    createBoard(createBoardInput: $createBoardInput) {\n      _id\n      writer\n      title\n      contents\n      createdAt\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      likeCount\n      dislikeCount\n      youtubeUrl\n      images\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateBoard(\n    $updateBoardInput: UpdateBoardInput!\n    $password: String\n    $boardId: ID!\n  ) {\n    updateBoard(\n      updateBoardInput: $updateBoardInput\n      password: $password\n      boardId: $boardId\n    ) {\n      _id\n      writer\n      title\n      contents\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  mutation updateBoard(\n    $updateBoardInput: UpdateBoardInput!\n    $password: String\n    $boardId: ID!\n  ) {\n    updateBoard(\n      updateBoardInput: $updateBoardInput\n      password: $password\n      boardId: $boardId\n    ) {\n      _id\n      writer\n      title\n      contents\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation uploadFile($file: Upload!) {\n    uploadFile(file: $file) {\n      url\n    }\n  }\n"): (typeof documents)["\n  mutation uploadFile($file: Upload!) {\n    uploadFile(file: $file) {\n      url\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation loginUser($email: String!, $password: String!) {\n    loginUser(email: $email, password: $password) {\n      accessToken\n    }\n  }\n"): (typeof documents)["\n  mutation loginUser($email: String!, $password: String!) {\n    loginUser(email: $email, password: $password) {\n      accessToken\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchTravelproduct($productId: ID!) {\n    fetchTravelproduct(travelproductId: $productId) {\n      _id\n      name\n      remarks\n      contents\n      price\n      tags\n      images\n      pickedCount\n      travelproductAddress {\n        zipcode\n        lat\n        lng\n      }\n      buyer {\n        _id\n      }\n      seller {\n        _id\n        name\n        picture\n      }\n      soldAt\n    }\n  }\n"): (typeof documents)["\n  query fetchTravelproduct($productId: ID!) {\n    fetchTravelproduct(travelproductId: $productId) {\n      _id\n      name\n      remarks\n      contents\n      price\n      tags\n      images\n      pickedCount\n      travelproductAddress {\n        zipcode\n        lat\n        lng\n      }\n      buyer {\n        _id\n      }\n      seller {\n        _id\n        name\n        picture\n      }\n      soldAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation toggleTravelproductPick($travelproductId: ID!) {\n    toggleTravelproductPick(travelproductId: $travelproductId)\n  }\n"): (typeof documents)["\n  mutation toggleTravelproductPick($travelproductId: ID!) {\n    toggleTravelproductPick(travelproductId: $travelproductId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchTravelproductQuestions($page: Int, $travelproductId: ID!) {\n    fetchTravelproductQuestions(\n      page: $page\n      travelproductId: $travelproductId\n    ) {\n      _id\n      contents\n      user {\n        name\n      }\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query fetchTravelproductQuestions($page: Int, $travelproductId: ID!) {\n    fetchTravelproductQuestions(\n      page: $page\n      travelproductId: $travelproductId\n    ) {\n      _id\n      contents\n      user {\n        name\n      }\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createTravelproductQuestion(\n    $createTravelproductQuestionInput: CreateTravelproductQuestionInput!\n    $travelproductId: ID!\n  ) {\n    createTravelproductQuestion(\n      createTravelproductQuestionInput: $createTravelproductQuestionInput\n      travelproductId: $travelproductId\n    ) {\n      _id\n      contents\n      user {\n        name\n      }\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  mutation createTravelproductQuestion(\n    $createTravelproductQuestionInput: CreateTravelproductQuestionInput!\n    $travelproductId: ID!\n  ) {\n    createTravelproductQuestion(\n      createTravelproductQuestionInput: $createTravelproductQuestionInput\n      travelproductId: $travelproductId\n    ) {\n      _id\n      contents\n      user {\n        name\n      }\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchTravelproducts {\n    fetchTravelproducts {\n      _id\n      name\n      remarks\n      contents\n      price\n      tags\n\n      buyer {\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query fetchTravelproducts {\n    fetchTravelproducts {\n      _id\n      name\n      remarks\n      contents\n      price\n      tags\n\n      buyer {\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createTravelproduct(\n    $createTravelproductInput: CreateTravelproductInput!\n  ) {\n    createTravelproduct(createTravelproductInput: $createTravelproductInput) {\n      _id\n      seller {\n        _id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation createTravelproduct(\n    $createTravelproductInput: CreateTravelproductInput!\n  ) {\n    createTravelproduct(createTravelproductInput: $createTravelproductInput) {\n      _id\n      seller {\n        _id\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createUser($createUserInput: CreateUserInput!) {\n    createUser(createUserInput: $createUserInput) {\n      _id\n    }\n  }\n"): (typeof documents)["\n  mutation createUser($createUserInput: CreateUserInput!) {\n    createUser(createUserInput: $createUserInput) {\n      _id\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;