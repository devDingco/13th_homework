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
    "\n  query fetchBoards(\n    $page: Int\n    $search: String\n    $startDate: DateTime\n    $endDate: DateTime\n  ) {\n    fetchBoards(\n      page: $page\n      search: $search\n      startDate: $startDate\n      endDate: $endDate\n    ) {\n      _id\n      writer\n      title\n      createdAt\n    }\n  }\n": types.FetchBoardsDocument,
    "\n  query fetchBoardsCount(\n    $search: String\n    $startDate: DateTime\n    $endDate: DateTime\n  ) {\n    fetchBoardsCount(search: $search, startDate: $startDate, endDate: $endDate)\n  }\n": types.FetchBoardsCountDocument,
    "\n  mutation createBoard($createBoardInput: CreateBoardInput!) {\n    createBoard(createBoardInput: $createBoardInput) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      likeCount\n      dislikeCount\n      images\n      boardAddress {\n        address\n        zipcode\n        addressDetail\n      }\n      user {\n        _id\n        email\n        name\n        picture\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n": types.CreateBoardDocument,
    "\n  query fetchBoard($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      likeCount\n      dislikeCount\n      images\n      boardAddress {\n        address\n        zipcode\n        addressDetail\n      }\n      user {\n        _id\n        email\n        name\n        picture\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n": types.FetchBoardDocument,
    "\n  mutation updateBoard(\n    $updateBoardInput: UpdateBoardInput!\n    $password: String\n    $boardId: ID!\n  ) {\n    updateBoard(\n      updateBoardInput: $updateBoardInput\n      password: $password\n      boardId: $boardId\n    ) {\n      _id\n    }\n  }\n": types.UpdateBoardDocument,
    "\n  mutation deleteBoard($id: ID!) {\n    deleteBoard(boardId: $id)\n  }\n": types.DeleteBoardDocument,
    "\n  query fetchBoardComments($page: Int, $boardId: ID!) {\n    fetchBoardComments(page: $page, boardId: $boardId) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n": types.FetchBoardCommentsDocument,
    "\n  mutation createBoardComment(\n    $createBoardCommentInput: CreateBoardCommentInput!\n    $boardId: ID!\n  ) {\n    createBoardComment(\n      createBoardCommentInput: $createBoardCommentInput\n      boardId: $boardId\n    ) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n": types.CreateBoardCommentDocument,
    "\n  mutation updateBoardComment(\n    $updateBoardCommentInput: UpdateBoardCommentInput!\n    $password: String\n    $boardCommentId: ID!\n  ) {\n    updateBoardComment(\n      updateBoardCommentInput: $updateBoardCommentInput\n      password: $password\n      boardCommentId: $boardCommentId\n    ) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n": types.UpdateBoardCommentDocument,
    "\n  mutation uploadFile($file: Upload!) {\n    uploadFile(file: $file) {\n      url\n    }\n  }\n": types.UploadFileDocument,
    "\n  query fetchTravelproducts($isSoldout: Boolean, $search: String, $page: Int) {\n    fetchTravelproducts(isSoldout: $isSoldout, search: $search, page: $page) {\n      _id\n      name\n      remarks\n      tags\n      price\n      images\n      seller {\n        name\n        picture\n      }\n      pickedCount\n    }\n  }\n": types.FetchTravelproductsDocument,
    "\n  query fetchTravelproduct($travelproductId: ID!) {\n    fetchTravelproduct(travelproductId: $travelproductId) {\n      _id\n      name\n      remarks\n      contents\n      price\n      tags\n      images\n      pickedCount\n      travelproductAddress {\n        zipcode\n        address\n        addressDetail\n        lat\n        lng\n        deletedAt\n      }\n      seller {\n        name\n        picture\n        deletedAt\n      }\n      soldAt\n      createdAt\n      updatedAt\n    }\n  }\n": types.FetchTravelproductDocument,
    "\n  mutation createTravelProduct(\n    $createTravelproductInput: CreateTravelproductInput!\n  ) {\n    createTravelproduct(createTravelproductInput: $createTravelproductInput) {\n      _id\n    }\n  }\n": types.CreateTravelProductDocument,
    "\n  mutation updateTravelproduct(\n    $updateTravelproductInput: UpdateTravelproductInput!\n    $travelproductId: ID!\n  ) {\n    updateTravelproduct(\n      updateTravelproductInput: $updateTravelproductInput\n      travelproductId: $travelproductId\n    ) {\n      _id\n    }\n  }\n": types.UpdateTravelproductDocument,
    "\n  query fetchTravelproductQuestions($page: Int, $travelproductId: ID!) {\n    fetchTravelproductQuestions(\n      page: $page\n      travelproductId: $travelproductId\n    ) {\n      _id\n      contents\n      user {\n        name\n        picture\n      }\n      createdAt\n      updatedAt\n    }\n  }\n": types.FetchTravelproductQuestionsDocument,
    "\n  mutation createTravelproductQuestion(\n    $createTravelproductQuestionInput: CreateTravelproductQuestionInput!\n    $travelproductId: ID!\n  ) {\n    createTravelproductQuestion(\n      createTravelproductQuestionInput: $createTravelproductQuestionInput\n      travelproductId: $travelproductId\n    ) {\n      _id\n    }\n  }\n": types.CreateTravelproductQuestionDocument,
    "\n  mutation updateTravelproductQuestion(\n    $updateTravelproductQuestionInput: UpdateTravelproductQuestionInput!\n    $travelproductQuestionId: ID!\n  ) {\n    updateTravelproductQuestion(\n      updateTravelproductQuestionInput: $updateTravelproductQuestionInput\n      travelproductQuestionId: $travelproductQuestionId\n    ) {\n      _id\n    }\n  }\n": types.UpdateTravelproductQuestionDocument,
    "\n  mutation deleteTravelproductQuestion($travelproductQuestionId: ID!) {\n    deleteTravelproductQuestion(\n      travelproductQuestionId: $travelproductQuestionId\n    )\n  }\n": types.DeleteTravelproductQuestionDocument,
    "\n  query fetchTravelproductQuestionAnswers(\n    $page: Int\n    $travelproductQuestionId: ID!\n  ) {\n    fetchTravelproductQuestionAnswers(\n      page: $page\n      travelproductQuestionId: $travelproductQuestionId\n    ) {\n      _id\n      contents\n      user {\n        name\n      }\n      createdAt\n      updatedAt\n    }\n  }\n": types.FetchTravelproductQuestionAnswersDocument,
    "\n  mutation createTravelproductQuestionAnswer(\n    $createTravelproductQuestionAnswerInput: CreateTravelproductQuestionAnswerInput!\n    $travelproductQuestionId: ID!\n  ) {\n    createTravelproductQuestionAnswer(\n      createTravelproductQuestionAnswerInput: $createTravelproductQuestionAnswerInput\n      travelproductQuestionId: $travelproductQuestionId\n    ) {\n      _id\n    }\n  }\n": types.CreateTravelproductQuestionAnswerDocument,
    "\n  mutation updateTravelproductQuestionAnswer(\n    $updateTravelproductQuestionAnswerInput: UpdateTravelproductQuestionAnswerInput!\n    $travelproductQuestionAnswerId: ID!\n  ) {\n    updateTravelproductQuestionAnswer(\n      updateTravelproductQuestionAnswerInput: $updateTravelproductQuestionAnswerInput\n      travelproductQuestionAnswerId: $travelproductQuestionAnswerId\n    ) {\n      _id\n    }\n  }\n": types.UpdateTravelproductQuestionAnswerDocument,
    "\n  mutation deleteTravelproductQuestionAnswer(\n    $travelproductQuestionAnswerId: ID!\n  ) {\n    deleteTravelproductQuestionAnswer(\n      travelproductQuestionAnswerId: $travelproductQuestionAnswerId\n    )\n  }\n": types.DeleteTravelproductQuestionAnswerDocument,
    "\n  mutation toggleTravelproductPick($travelproductId: ID!) {\n    toggleTravelproductPick(travelproductId: $travelproductId)\n  }\n": types.ToggleTravelproductPickDocument,
    "\n  mutation createPointTransactionOfLoading($paymentId: ID!) {\n    createPointTransactionOfLoading(paymentId: $paymentId) {\n      _id\n      impUid\n      amount\n    }\n  }\n": types.CreatePointTransactionOfLoadingDocument,
    "\n  mutation createPointTransactionOfBuyingAndSelling($useritemId: ID!) {\n    createPointTransactionOfBuyingAndSelling(useritemId: $useritemId) {\n      _id\n    }\n  }\n": types.CreatePointTransactionOfBuyingAndSellingDocument,
    "\n  mutation restoreAccessToken {\n    restoreAccessToken {\n      accessToken\n    }\n  }\n": types.RestoreAccessTokenDocument,
    "\n  query fetchUserLoggedIn {\n    fetchUserLoggedIn {\n      _id\n      email\n      name\n      picture\n      userPoint {\n        amount\n      }\n    }\n  }\n": types.FetchUserLoggedInDocument,
    "\n  mutation loginUser($email: String!, $password: String!) {\n    loginUser(email: $email, password: $password) {\n      accessToken\n    }\n  }\n": types.LoginUserDocument,
    "\n  mutation logoutUser {\n    logoutUser\n  }\n": types.LogoutUserDocument,
    "\n  mutation createUser($createUserInput: CreateUserInput!) {\n    createUser(createUserInput: $createUserInput) {\n      _id\n      email\n      createdAt\n    }\n  }\n": types.CreateUserDocument,
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
export function graphql(source: "\n  query fetchBoards(\n    $page: Int\n    $search: String\n    $startDate: DateTime\n    $endDate: DateTime\n  ) {\n    fetchBoards(\n      page: $page\n      search: $search\n      startDate: $startDate\n      endDate: $endDate\n    ) {\n      _id\n      writer\n      title\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query fetchBoards(\n    $page: Int\n    $search: String\n    $startDate: DateTime\n    $endDate: DateTime\n  ) {\n    fetchBoards(\n      page: $page\n      search: $search\n      startDate: $startDate\n      endDate: $endDate\n    ) {\n      _id\n      writer\n      title\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoardsCount(\n    $search: String\n    $startDate: DateTime\n    $endDate: DateTime\n  ) {\n    fetchBoardsCount(search: $search, startDate: $startDate, endDate: $endDate)\n  }\n"): (typeof documents)["\n  query fetchBoardsCount(\n    $search: String\n    $startDate: DateTime\n    $endDate: DateTime\n  ) {\n    fetchBoardsCount(search: $search, startDate: $startDate, endDate: $endDate)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createBoard($createBoardInput: CreateBoardInput!) {\n    createBoard(createBoardInput: $createBoardInput) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      likeCount\n      dislikeCount\n      images\n      boardAddress {\n        address\n        zipcode\n        addressDetail\n      }\n      user {\n        _id\n        email\n        name\n        picture\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"): (typeof documents)["\n  mutation createBoard($createBoardInput: CreateBoardInput!) {\n    createBoard(createBoardInput: $createBoardInput) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      likeCount\n      dislikeCount\n      images\n      boardAddress {\n        address\n        zipcode\n        addressDetail\n      }\n      user {\n        _id\n        email\n        name\n        picture\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoard($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      likeCount\n      dislikeCount\n      images\n      boardAddress {\n        address\n        zipcode\n        addressDetail\n      }\n      user {\n        _id\n        email\n        name\n        picture\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"): (typeof documents)["\n  query fetchBoard($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      likeCount\n      dislikeCount\n      images\n      boardAddress {\n        address\n        zipcode\n        addressDetail\n      }\n      user {\n        _id\n        email\n        name\n        picture\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateBoard(\n    $updateBoardInput: UpdateBoardInput!\n    $password: String\n    $boardId: ID!\n  ) {\n    updateBoard(\n      updateBoardInput: $updateBoardInput\n      password: $password\n      boardId: $boardId\n    ) {\n      _id\n    }\n  }\n"): (typeof documents)["\n  mutation updateBoard(\n    $updateBoardInput: UpdateBoardInput!\n    $password: String\n    $boardId: ID!\n  ) {\n    updateBoard(\n      updateBoardInput: $updateBoardInput\n      password: $password\n      boardId: $boardId\n    ) {\n      _id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteBoard($id: ID!) {\n    deleteBoard(boardId: $id)\n  }\n"): (typeof documents)["\n  mutation deleteBoard($id: ID!) {\n    deleteBoard(boardId: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoardComments($page: Int, $boardId: ID!) {\n    fetchBoardComments(page: $page, boardId: $boardId) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"): (typeof documents)["\n  query fetchBoardComments($page: Int, $boardId: ID!) {\n    fetchBoardComments(page: $page, boardId: $boardId) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createBoardComment(\n    $createBoardCommentInput: CreateBoardCommentInput!\n    $boardId: ID!\n  ) {\n    createBoardComment(\n      createBoardCommentInput: $createBoardCommentInput\n      boardId: $boardId\n    ) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"): (typeof documents)["\n  mutation createBoardComment(\n    $createBoardCommentInput: CreateBoardCommentInput!\n    $boardId: ID!\n  ) {\n    createBoardComment(\n      createBoardCommentInput: $createBoardCommentInput\n      boardId: $boardId\n    ) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateBoardComment(\n    $updateBoardCommentInput: UpdateBoardCommentInput!\n    $password: String\n    $boardCommentId: ID!\n  ) {\n    updateBoardComment(\n      updateBoardCommentInput: $updateBoardCommentInput\n      password: $password\n      boardCommentId: $boardCommentId\n    ) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"): (typeof documents)["\n  mutation updateBoardComment(\n    $updateBoardCommentInput: UpdateBoardCommentInput!\n    $password: String\n    $boardCommentId: ID!\n  ) {\n    updateBoardComment(\n      updateBoardCommentInput: $updateBoardCommentInput\n      password: $password\n      boardCommentId: $boardCommentId\n    ) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation uploadFile($file: Upload!) {\n    uploadFile(file: $file) {\n      url\n    }\n  }\n"): (typeof documents)["\n  mutation uploadFile($file: Upload!) {\n    uploadFile(file: $file) {\n      url\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchTravelproducts($isSoldout: Boolean, $search: String, $page: Int) {\n    fetchTravelproducts(isSoldout: $isSoldout, search: $search, page: $page) {\n      _id\n      name\n      remarks\n      tags\n      price\n      images\n      seller {\n        name\n        picture\n      }\n      pickedCount\n    }\n  }\n"): (typeof documents)["\n  query fetchTravelproducts($isSoldout: Boolean, $search: String, $page: Int) {\n    fetchTravelproducts(isSoldout: $isSoldout, search: $search, page: $page) {\n      _id\n      name\n      remarks\n      tags\n      price\n      images\n      seller {\n        name\n        picture\n      }\n      pickedCount\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchTravelproduct($travelproductId: ID!) {\n    fetchTravelproduct(travelproductId: $travelproductId) {\n      _id\n      name\n      remarks\n      contents\n      price\n      tags\n      images\n      pickedCount\n      travelproductAddress {\n        zipcode\n        address\n        addressDetail\n        lat\n        lng\n        deletedAt\n      }\n      seller {\n        name\n        picture\n        deletedAt\n      }\n      soldAt\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query fetchTravelproduct($travelproductId: ID!) {\n    fetchTravelproduct(travelproductId: $travelproductId) {\n      _id\n      name\n      remarks\n      contents\n      price\n      tags\n      images\n      pickedCount\n      travelproductAddress {\n        zipcode\n        address\n        addressDetail\n        lat\n        lng\n        deletedAt\n      }\n      seller {\n        name\n        picture\n        deletedAt\n      }\n      soldAt\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createTravelProduct(\n    $createTravelproductInput: CreateTravelproductInput!\n  ) {\n    createTravelproduct(createTravelproductInput: $createTravelproductInput) {\n      _id\n    }\n  }\n"): (typeof documents)["\n  mutation createTravelProduct(\n    $createTravelproductInput: CreateTravelproductInput!\n  ) {\n    createTravelproduct(createTravelproductInput: $createTravelproductInput) {\n      _id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateTravelproduct(\n    $updateTravelproductInput: UpdateTravelproductInput!\n    $travelproductId: ID!\n  ) {\n    updateTravelproduct(\n      updateTravelproductInput: $updateTravelproductInput\n      travelproductId: $travelproductId\n    ) {\n      _id\n    }\n  }\n"): (typeof documents)["\n  mutation updateTravelproduct(\n    $updateTravelproductInput: UpdateTravelproductInput!\n    $travelproductId: ID!\n  ) {\n    updateTravelproduct(\n      updateTravelproductInput: $updateTravelproductInput\n      travelproductId: $travelproductId\n    ) {\n      _id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchTravelproductQuestions($page: Int, $travelproductId: ID!) {\n    fetchTravelproductQuestions(\n      page: $page\n      travelproductId: $travelproductId\n    ) {\n      _id\n      contents\n      user {\n        name\n        picture\n      }\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query fetchTravelproductQuestions($page: Int, $travelproductId: ID!) {\n    fetchTravelproductQuestions(\n      page: $page\n      travelproductId: $travelproductId\n    ) {\n      _id\n      contents\n      user {\n        name\n        picture\n      }\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createTravelproductQuestion(\n    $createTravelproductQuestionInput: CreateTravelproductQuestionInput!\n    $travelproductId: ID!\n  ) {\n    createTravelproductQuestion(\n      createTravelproductQuestionInput: $createTravelproductQuestionInput\n      travelproductId: $travelproductId\n    ) {\n      _id\n    }\n  }\n"): (typeof documents)["\n  mutation createTravelproductQuestion(\n    $createTravelproductQuestionInput: CreateTravelproductQuestionInput!\n    $travelproductId: ID!\n  ) {\n    createTravelproductQuestion(\n      createTravelproductQuestionInput: $createTravelproductQuestionInput\n      travelproductId: $travelproductId\n    ) {\n      _id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateTravelproductQuestion(\n    $updateTravelproductQuestionInput: UpdateTravelproductQuestionInput!\n    $travelproductQuestionId: ID!\n  ) {\n    updateTravelproductQuestion(\n      updateTravelproductQuestionInput: $updateTravelproductQuestionInput\n      travelproductQuestionId: $travelproductQuestionId\n    ) {\n      _id\n    }\n  }\n"): (typeof documents)["\n  mutation updateTravelproductQuestion(\n    $updateTravelproductQuestionInput: UpdateTravelproductQuestionInput!\n    $travelproductQuestionId: ID!\n  ) {\n    updateTravelproductQuestion(\n      updateTravelproductQuestionInput: $updateTravelproductQuestionInput\n      travelproductQuestionId: $travelproductQuestionId\n    ) {\n      _id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteTravelproductQuestion($travelproductQuestionId: ID!) {\n    deleteTravelproductQuestion(\n      travelproductQuestionId: $travelproductQuestionId\n    )\n  }\n"): (typeof documents)["\n  mutation deleteTravelproductQuestion($travelproductQuestionId: ID!) {\n    deleteTravelproductQuestion(\n      travelproductQuestionId: $travelproductQuestionId\n    )\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchTravelproductQuestionAnswers(\n    $page: Int\n    $travelproductQuestionId: ID!\n  ) {\n    fetchTravelproductQuestionAnswers(\n      page: $page\n      travelproductQuestionId: $travelproductQuestionId\n    ) {\n      _id\n      contents\n      user {\n        name\n      }\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query fetchTravelproductQuestionAnswers(\n    $page: Int\n    $travelproductQuestionId: ID!\n  ) {\n    fetchTravelproductQuestionAnswers(\n      page: $page\n      travelproductQuestionId: $travelproductQuestionId\n    ) {\n      _id\n      contents\n      user {\n        name\n      }\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createTravelproductQuestionAnswer(\n    $createTravelproductQuestionAnswerInput: CreateTravelproductQuestionAnswerInput!\n    $travelproductQuestionId: ID!\n  ) {\n    createTravelproductQuestionAnswer(\n      createTravelproductQuestionAnswerInput: $createTravelproductQuestionAnswerInput\n      travelproductQuestionId: $travelproductQuestionId\n    ) {\n      _id\n    }\n  }\n"): (typeof documents)["\n  mutation createTravelproductQuestionAnswer(\n    $createTravelproductQuestionAnswerInput: CreateTravelproductQuestionAnswerInput!\n    $travelproductQuestionId: ID!\n  ) {\n    createTravelproductQuestionAnswer(\n      createTravelproductQuestionAnswerInput: $createTravelproductQuestionAnswerInput\n      travelproductQuestionId: $travelproductQuestionId\n    ) {\n      _id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateTravelproductQuestionAnswer(\n    $updateTravelproductQuestionAnswerInput: UpdateTravelproductQuestionAnswerInput!\n    $travelproductQuestionAnswerId: ID!\n  ) {\n    updateTravelproductQuestionAnswer(\n      updateTravelproductQuestionAnswerInput: $updateTravelproductQuestionAnswerInput\n      travelproductQuestionAnswerId: $travelproductQuestionAnswerId\n    ) {\n      _id\n    }\n  }\n"): (typeof documents)["\n  mutation updateTravelproductQuestionAnswer(\n    $updateTravelproductQuestionAnswerInput: UpdateTravelproductQuestionAnswerInput!\n    $travelproductQuestionAnswerId: ID!\n  ) {\n    updateTravelproductQuestionAnswer(\n      updateTravelproductQuestionAnswerInput: $updateTravelproductQuestionAnswerInput\n      travelproductQuestionAnswerId: $travelproductQuestionAnswerId\n    ) {\n      _id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteTravelproductQuestionAnswer(\n    $travelproductQuestionAnswerId: ID!\n  ) {\n    deleteTravelproductQuestionAnswer(\n      travelproductQuestionAnswerId: $travelproductQuestionAnswerId\n    )\n  }\n"): (typeof documents)["\n  mutation deleteTravelproductQuestionAnswer(\n    $travelproductQuestionAnswerId: ID!\n  ) {\n    deleteTravelproductQuestionAnswer(\n      travelproductQuestionAnswerId: $travelproductQuestionAnswerId\n    )\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation toggleTravelproductPick($travelproductId: ID!) {\n    toggleTravelproductPick(travelproductId: $travelproductId)\n  }\n"): (typeof documents)["\n  mutation toggleTravelproductPick($travelproductId: ID!) {\n    toggleTravelproductPick(travelproductId: $travelproductId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createPointTransactionOfLoading($paymentId: ID!) {\n    createPointTransactionOfLoading(paymentId: $paymentId) {\n      _id\n      impUid\n      amount\n    }\n  }\n"): (typeof documents)["\n  mutation createPointTransactionOfLoading($paymentId: ID!) {\n    createPointTransactionOfLoading(paymentId: $paymentId) {\n      _id\n      impUid\n      amount\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createPointTransactionOfBuyingAndSelling($useritemId: ID!) {\n    createPointTransactionOfBuyingAndSelling(useritemId: $useritemId) {\n      _id\n    }\n  }\n"): (typeof documents)["\n  mutation createPointTransactionOfBuyingAndSelling($useritemId: ID!) {\n    createPointTransactionOfBuyingAndSelling(useritemId: $useritemId) {\n      _id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation restoreAccessToken {\n    restoreAccessToken {\n      accessToken\n    }\n  }\n"): (typeof documents)["\n  mutation restoreAccessToken {\n    restoreAccessToken {\n      accessToken\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchUserLoggedIn {\n    fetchUserLoggedIn {\n      _id\n      email\n      name\n      picture\n      userPoint {\n        amount\n      }\n    }\n  }\n"): (typeof documents)["\n  query fetchUserLoggedIn {\n    fetchUserLoggedIn {\n      _id\n      email\n      name\n      picture\n      userPoint {\n        amount\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation loginUser($email: String!, $password: String!) {\n    loginUser(email: $email, password: $password) {\n      accessToken\n    }\n  }\n"): (typeof documents)["\n  mutation loginUser($email: String!, $password: String!) {\n    loginUser(email: $email, password: $password) {\n      accessToken\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation logoutUser {\n    logoutUser\n  }\n"): (typeof documents)["\n  mutation logoutUser {\n    logoutUser\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createUser($createUserInput: CreateUserInput!) {\n    createUser(createUserInput: $createUserInput) {\n      _id\n      email\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  mutation createUser($createUserInput: CreateUserInput!) {\n    createUser(createUserInput: $createUserInput) {\n      _id\n      email\n      createdAt\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;