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
    "\n  mutation LoginUser($email: String!, $password: String!) {\n    loginUser(email: $email, password: $password) {\n      accessToken\n    }\n  }\n": types.LoginUserDocument,
    "\n  mutation createUser($name: String!, $email: String!, $password: String!) {\n    createUser(\n      createUserInput: { name: $name, email: $email, password: $password }\n    ) {\n      _id\n    }\n  }\n": types.CreateUserDocument,
    "\n  query FetchTravelProduct($travelproductId: ID!) {\n    fetchTravelproduct(travelproductId: $travelproductId) {\n      _id\n      name\n      remarks\n      contents\n      price\n      tags\n      images\n      pickedCount\n      travelproductAddress {\n        zipcode\n        address\n        addressDetail\n        lat\n        lng\n        deletedAt\n      }\n      buyer {\n        picture\n        deletedAt\n      }\n      seller {\n        _id\n        email\n        name\n        picture\n        deletedAt\n      }\n      soldAt\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n": types.FetchTravelProductDocument,
    "\n  mutation toggleTravelproductPick($travelproductId: ID!) {\n    toggleTravelproductPick(travelproductId: $travelproductId)\n  }\n": types.ToggleTravelproductPickDocument,
    "\n  mutation createPointTransactionOfBuyingAndSelling($useritemId: ID!) {\n    createPointTransactionOfBuyingAndSelling(useritemId: $useritemId) {\n      _id\n      name\n      remarks\n      contents\n    }\n  }\n": types.CreatePointTransactionOfBuyingAndSellingDocument,
    "\n  query FetchTravelProducts($isSoldout: Boolean, $search: String, $page: Int) {\n    fetchTravelproducts(isSoldout: $isSoldout, search: $search, page: $page) {\n      _id\n      name\n      price\n      images\n      tags\n      contents\n      seller {\n        name\n        picture\n      }\n    }\n  }\n": types.FetchTravelProductsDocument,
    "\n  query FetchBoardComments($boardId: ID!, $page: Int) {\n    fetchBoardComments(page: $page, boardId: $boardId) {\n      _id\n      writer\n      contents\n      rating\n      user {\n        picture\n        deletedAt\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n": types.FetchBoardCommentsDocument,
    "\n    mutation updateBoardComment(\n      $updateBoardCommentInput: UpdateBoardCommentInput!\n      $password: String!\n      $boardCommentId: ID!\n    ) {\n      updateBoardComment(\n        updateBoardCommentInput: $updateBoardCommentInput\n        password: $password\n        boardCommentId: $boardCommentId\n      ) {\n        _id\n        contents\n        rating\n      }\n    }\n  ": types.UpdateBoardCommentDocument,
    "\n  mutation CreateBoardComment(\n    $boardId: ID!\n    $writer: String\n    $password: String\n    $contents: String!\n    $rating: Float!\n  ) {\n    createBoardComment(\n      boardId: $boardId\n      createBoardCommentInput: {\n        writer: $writer\n        password: $password\n        contents: $contents\n        rating: $rating\n      }\n    ) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n": types.CreateBoardCommentDocument,
    "\n  query fetchBoard($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      likeCount\n      dislikeCount\n      images\n      boardAddress {\n        _id\n        zipcode\n        address\n        addressDetail\n        createdAt\n        updatedAt\n        deletedAt\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n": types.FetchBoardDocument,
    "\n  query fetchBoards(\n    $mypage: Int\n    $endDate: DateTime\n    $startDate: DateTime\n    $search: String\n  ) {\n    fetchBoards(\n      page: $mypage\n      endDate: $endDate\n      startDate: $startDate\n      search: $search\n    ) {\n      _id\n      writer\n      title\n      images\n      contents\n      createdAt\n    }\n  }\n": types.FetchBoardsDocument,
    "\n  mutation deleteBoard($boardId: ID!) {\n    deleteBoard(boardId: $boardId)\n  }\n": types.DeleteBoardDocument,
    "\n  query fetchBoardsCount {\n    fetchBoardsCount\n  }\n": types.FetchBoardsCountDocument,
    "\n  query fetchBoardsWithSearch($currentPage: Int, $search: String) {\n    fetchBoards(page: $currentPage, search: $search) {\n      _id\n      writer\n      title\n      contents\n      createdAt\n    }\n  }\n": types.FetchBoardsWithSearchDocument,
    "\n  mutation createBoard($createBoardInput: CreateBoardInput!) {\n    createBoard(createBoardInput: $createBoardInput) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      likeCount\n      dislikeCount\n      images\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      user {\n        _id\n        name\n        email\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n": types.CreateBoardDocument,
    "\n  mutation updateBoard(\n    $updateBoardInput: UpdateBoardInput!\n    $password: String\n    $boardId: ID!\n  ) {\n    updateBoard(\n      updateBoardInput: $updateBoardInput\n      password: $password\n      boardId: $boardId\n    ) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      likeCount\n      dislikeCount\n      images\n      boardAddress {\n        _id\n        zipcode\n        address\n      }\n      user {\n        _id\n        email\n        name\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n": types.UpdateBoardDocument,
    "\n  mutation uploadFile($file: Upload!) {\n    uploadFile(file: $file) {\n      url\n    }\n  }\n": types.UploadFileDocument,
    "\n  query fetchTravelproductQuestionAnswers(\n    $page: Int!\n    $travelproductQuestionId: ID!\n  ) {\n    fetchTravelproductQuestionAnswers(\n      page: $page\n      travelproductQuestionId: $travelproductQuestionId\n    ) {\n      _id\n      contents\n      user {\n        _id\n        name\n        email\n        picture\n      }\n      createdAt\n      updatedAt\n    }\n  }\n": types.FetchTravelproductQuestionAnswersDocument,
    "\n  mutation createTravelproductQuestionAnswer(\n    $input: CreateTravelproductQuestionAnswerInput!\n    $travelproductQuestionId: ID!\n  ) {\n    createTravelproductQuestionAnswer(\n      createTravelproductQuestionAnswerInput: $input\n      travelproductQuestionId: $travelproductQuestionId\n    ) {\n      _id\n    }\n  }\n": types.CreateTravelproductQuestionAnswerDocument,
    "\n  mutation updateTravelproductQuestionAnswer(\n    $input: UpdateTravelproductQuestionAnswerInput!\n    $travelproductQuestionAnswerId: ID!\n  ) {\n    updateTravelproductQuestionAnswer(\n      updateTravelproductQuestionAnswerInput: $input\n      travelproductQuestionAnswerId: $travelproductQuestionAnswerId\n    ) {\n      _id\n    }\n  }\n": types.UpdateTravelproductQuestionAnswerDocument,
    "\n  mutation deleteTravelproductQuestionAnswer(\n    $travelproductQuestionAnswerId: ID!\n  ) {\n    deleteTravelproductQuestionAnswer(\n      travelproductQuestionAnswerId: $travelproductQuestionAnswerId\n    )\n  }\n": types.DeleteTravelproductQuestionAnswerDocument,
    "\n  mutation createTravelproductQuestion(\n    $input: CreateTravelproductQuestionInput!\n    $travelproductId: ID!\n  ) {\n    createTravelproductQuestion(\n      createTravelproductQuestionInput: $input\n      travelproductId: $travelproductId\n    ) {\n      _id\n    }\n  }\n": types.CreateTravelproductQuestionDocument,
    "\n  query fetchTravelproductQuestions($page: Int!, $travelproductId: ID!) {\n    fetchTravelproductQuestions(\n      page: $page\n      travelproductId: $travelproductId\n    ) {\n      _id\n      contents\n      user {\n        _id\n        name\n        email\n        picture\n      }\n      createdAt\n      updatedAt\n    }\n  }\n": types.FetchTravelproductQuestionsDocument,
    "\n  mutation updateTravelproductQuestion(\n    $input: UpdateTravelproductQuestionInput!\n    $commentId: ID!\n  ) {\n    updateTravelproductQuestion(\n      updateTravelproductQuestionInput: $input\n      travelproductQuestionId: $commentId\n    ) {\n      _id\n      contents\n      updatedAt\n    }\n  }\n": types.UpdateTravelproductQuestionDocument,
    "\n  mutation deleteTravelproductQuestion($travelproductQuestionId: ID!) {\n    deleteTravelproductQuestion(\n      travelproductQuestionId: $travelproductQuestionId\n    )\n  }\n": types.DeleteTravelproductQuestionDocument,
    "\n  mutation createTravelproduct($input: CreateTravelproductInput!) {\n    createTravelproduct(createTravelproductInput: $input) {\n      _id\n    }\n  }\n": types.CreateTravelproductDocument,
    "\n  query FetchTravelProduct2($travelproductId: ID!) {\n    fetchTravelproduct(travelproductId: $travelproductId) {\n      _id\n      name\n      remarks\n      contents\n      price\n      tags\n      images\n      travelproductAddress {\n        zipcode\n        address\n        addressDetail\n      }\n    }\n  }\n": types.FetchTravelProduct2Document,
    "\n  mutation updateTravelproduct(\n    $updateTravelproductInput: UpdateTravelproductInput!\n    $travelproductId: ID!\n  ) {\n    updateTravelproduct(\n      updateTravelproductInput: $updateTravelproductInput\n      travelproductId: $travelproductId\n    ) {\n      _id\n    }\n  }\n": types.UpdateTravelproductDocument,
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
export function graphql(source: "\n  mutation LoginUser($email: String!, $password: String!) {\n    loginUser(email: $email, password: $password) {\n      accessToken\n    }\n  }\n"): (typeof documents)["\n  mutation LoginUser($email: String!, $password: String!) {\n    loginUser(email: $email, password: $password) {\n      accessToken\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createUser($name: String!, $email: String!, $password: String!) {\n    createUser(\n      createUserInput: { name: $name, email: $email, password: $password }\n    ) {\n      _id\n    }\n  }\n"): (typeof documents)["\n  mutation createUser($name: String!, $email: String!, $password: String!) {\n    createUser(\n      createUserInput: { name: $name, email: $email, password: $password }\n    ) {\n      _id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FetchTravelProduct($travelproductId: ID!) {\n    fetchTravelproduct(travelproductId: $travelproductId) {\n      _id\n      name\n      remarks\n      contents\n      price\n      tags\n      images\n      pickedCount\n      travelproductAddress {\n        zipcode\n        address\n        addressDetail\n        lat\n        lng\n        deletedAt\n      }\n      buyer {\n        picture\n        deletedAt\n      }\n      seller {\n        _id\n        email\n        name\n        picture\n        deletedAt\n      }\n      soldAt\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"): (typeof documents)["\n  query FetchTravelProduct($travelproductId: ID!) {\n    fetchTravelproduct(travelproductId: $travelproductId) {\n      _id\n      name\n      remarks\n      contents\n      price\n      tags\n      images\n      pickedCount\n      travelproductAddress {\n        zipcode\n        address\n        addressDetail\n        lat\n        lng\n        deletedAt\n      }\n      buyer {\n        picture\n        deletedAt\n      }\n      seller {\n        _id\n        email\n        name\n        picture\n        deletedAt\n      }\n      soldAt\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation toggleTravelproductPick($travelproductId: ID!) {\n    toggleTravelproductPick(travelproductId: $travelproductId)\n  }\n"): (typeof documents)["\n  mutation toggleTravelproductPick($travelproductId: ID!) {\n    toggleTravelproductPick(travelproductId: $travelproductId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createPointTransactionOfBuyingAndSelling($useritemId: ID!) {\n    createPointTransactionOfBuyingAndSelling(useritemId: $useritemId) {\n      _id\n      name\n      remarks\n      contents\n    }\n  }\n"): (typeof documents)["\n  mutation createPointTransactionOfBuyingAndSelling($useritemId: ID!) {\n    createPointTransactionOfBuyingAndSelling(useritemId: $useritemId) {\n      _id\n      name\n      remarks\n      contents\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FetchTravelProducts($isSoldout: Boolean, $search: String, $page: Int) {\n    fetchTravelproducts(isSoldout: $isSoldout, search: $search, page: $page) {\n      _id\n      name\n      price\n      images\n      tags\n      contents\n      seller {\n        name\n        picture\n      }\n    }\n  }\n"): (typeof documents)["\n  query FetchTravelProducts($isSoldout: Boolean, $search: String, $page: Int) {\n    fetchTravelproducts(isSoldout: $isSoldout, search: $search, page: $page) {\n      _id\n      name\n      price\n      images\n      tags\n      contents\n      seller {\n        name\n        picture\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FetchBoardComments($boardId: ID!, $page: Int) {\n    fetchBoardComments(page: $page, boardId: $boardId) {\n      _id\n      writer\n      contents\n      rating\n      user {\n        picture\n        deletedAt\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"): (typeof documents)["\n  query FetchBoardComments($boardId: ID!, $page: Int) {\n    fetchBoardComments(page: $page, boardId: $boardId) {\n      _id\n      writer\n      contents\n      rating\n      user {\n        picture\n        deletedAt\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation updateBoardComment(\n      $updateBoardCommentInput: UpdateBoardCommentInput!\n      $password: String!\n      $boardCommentId: ID!\n    ) {\n      updateBoardComment(\n        updateBoardCommentInput: $updateBoardCommentInput\n        password: $password\n        boardCommentId: $boardCommentId\n      ) {\n        _id\n        contents\n        rating\n      }\n    }\n  "): (typeof documents)["\n    mutation updateBoardComment(\n      $updateBoardCommentInput: UpdateBoardCommentInput!\n      $password: String!\n      $boardCommentId: ID!\n    ) {\n      updateBoardComment(\n        updateBoardCommentInput: $updateBoardCommentInput\n        password: $password\n        boardCommentId: $boardCommentId\n      ) {\n        _id\n        contents\n        rating\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateBoardComment(\n    $boardId: ID!\n    $writer: String\n    $password: String\n    $contents: String!\n    $rating: Float!\n  ) {\n    createBoardComment(\n      boardId: $boardId\n      createBoardCommentInput: {\n        writer: $writer\n        password: $password\n        contents: $contents\n        rating: $rating\n      }\n    ) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"): (typeof documents)["\n  mutation CreateBoardComment(\n    $boardId: ID!\n    $writer: String\n    $password: String\n    $contents: String!\n    $rating: Float!\n  ) {\n    createBoardComment(\n      boardId: $boardId\n      createBoardCommentInput: {\n        writer: $writer\n        password: $password\n        contents: $contents\n        rating: $rating\n      }\n    ) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoard($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      likeCount\n      dislikeCount\n      images\n      boardAddress {\n        _id\n        zipcode\n        address\n        addressDetail\n        createdAt\n        updatedAt\n        deletedAt\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"): (typeof documents)["\n  query fetchBoard($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      likeCount\n      dislikeCount\n      images\n      boardAddress {\n        _id\n        zipcode\n        address\n        addressDetail\n        createdAt\n        updatedAt\n        deletedAt\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoards(\n    $mypage: Int\n    $endDate: DateTime\n    $startDate: DateTime\n    $search: String\n  ) {\n    fetchBoards(\n      page: $mypage\n      endDate: $endDate\n      startDate: $startDate\n      search: $search\n    ) {\n      _id\n      writer\n      title\n      images\n      contents\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query fetchBoards(\n    $mypage: Int\n    $endDate: DateTime\n    $startDate: DateTime\n    $search: String\n  ) {\n    fetchBoards(\n      page: $mypage\n      endDate: $endDate\n      startDate: $startDate\n      search: $search\n    ) {\n      _id\n      writer\n      title\n      images\n      contents\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteBoard($boardId: ID!) {\n    deleteBoard(boardId: $boardId)\n  }\n"): (typeof documents)["\n  mutation deleteBoard($boardId: ID!) {\n    deleteBoard(boardId: $boardId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoardsCount {\n    fetchBoardsCount\n  }\n"): (typeof documents)["\n  query fetchBoardsCount {\n    fetchBoardsCount\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoardsWithSearch($currentPage: Int, $search: String) {\n    fetchBoards(page: $currentPage, search: $search) {\n      _id\n      writer\n      title\n      contents\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query fetchBoardsWithSearch($currentPage: Int, $search: String) {\n    fetchBoards(page: $currentPage, search: $search) {\n      _id\n      writer\n      title\n      contents\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createBoard($createBoardInput: CreateBoardInput!) {\n    createBoard(createBoardInput: $createBoardInput) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      likeCount\n      dislikeCount\n      images\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      user {\n        _id\n        name\n        email\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"): (typeof documents)["\n  mutation createBoard($createBoardInput: CreateBoardInput!) {\n    createBoard(createBoardInput: $createBoardInput) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      likeCount\n      dislikeCount\n      images\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      user {\n        _id\n        name\n        email\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateBoard(\n    $updateBoardInput: UpdateBoardInput!\n    $password: String\n    $boardId: ID!\n  ) {\n    updateBoard(\n      updateBoardInput: $updateBoardInput\n      password: $password\n      boardId: $boardId\n    ) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      likeCount\n      dislikeCount\n      images\n      boardAddress {\n        _id\n        zipcode\n        address\n      }\n      user {\n        _id\n        email\n        name\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"): (typeof documents)["\n  mutation updateBoard(\n    $updateBoardInput: UpdateBoardInput!\n    $password: String\n    $boardId: ID!\n  ) {\n    updateBoard(\n      updateBoardInput: $updateBoardInput\n      password: $password\n      boardId: $boardId\n    ) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      likeCount\n      dislikeCount\n      images\n      boardAddress {\n        _id\n        zipcode\n        address\n      }\n      user {\n        _id\n        email\n        name\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation uploadFile($file: Upload!) {\n    uploadFile(file: $file) {\n      url\n    }\n  }\n"): (typeof documents)["\n  mutation uploadFile($file: Upload!) {\n    uploadFile(file: $file) {\n      url\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchTravelproductQuestionAnswers(\n    $page: Int!\n    $travelproductQuestionId: ID!\n  ) {\n    fetchTravelproductQuestionAnswers(\n      page: $page\n      travelproductQuestionId: $travelproductQuestionId\n    ) {\n      _id\n      contents\n      user {\n        _id\n        name\n        email\n        picture\n      }\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query fetchTravelproductQuestionAnswers(\n    $page: Int!\n    $travelproductQuestionId: ID!\n  ) {\n    fetchTravelproductQuestionAnswers(\n      page: $page\n      travelproductQuestionId: $travelproductQuestionId\n    ) {\n      _id\n      contents\n      user {\n        _id\n        name\n        email\n        picture\n      }\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createTravelproductQuestionAnswer(\n    $input: CreateTravelproductQuestionAnswerInput!\n    $travelproductQuestionId: ID!\n  ) {\n    createTravelproductQuestionAnswer(\n      createTravelproductQuestionAnswerInput: $input\n      travelproductQuestionId: $travelproductQuestionId\n    ) {\n      _id\n    }\n  }\n"): (typeof documents)["\n  mutation createTravelproductQuestionAnswer(\n    $input: CreateTravelproductQuestionAnswerInput!\n    $travelproductQuestionId: ID!\n  ) {\n    createTravelproductQuestionAnswer(\n      createTravelproductQuestionAnswerInput: $input\n      travelproductQuestionId: $travelproductQuestionId\n    ) {\n      _id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateTravelproductQuestionAnswer(\n    $input: UpdateTravelproductQuestionAnswerInput!\n    $travelproductQuestionAnswerId: ID!\n  ) {\n    updateTravelproductQuestionAnswer(\n      updateTravelproductQuestionAnswerInput: $input\n      travelproductQuestionAnswerId: $travelproductQuestionAnswerId\n    ) {\n      _id\n    }\n  }\n"): (typeof documents)["\n  mutation updateTravelproductQuestionAnswer(\n    $input: UpdateTravelproductQuestionAnswerInput!\n    $travelproductQuestionAnswerId: ID!\n  ) {\n    updateTravelproductQuestionAnswer(\n      updateTravelproductQuestionAnswerInput: $input\n      travelproductQuestionAnswerId: $travelproductQuestionAnswerId\n    ) {\n      _id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteTravelproductQuestionAnswer(\n    $travelproductQuestionAnswerId: ID!\n  ) {\n    deleteTravelproductQuestionAnswer(\n      travelproductQuestionAnswerId: $travelproductQuestionAnswerId\n    )\n  }\n"): (typeof documents)["\n  mutation deleteTravelproductQuestionAnswer(\n    $travelproductQuestionAnswerId: ID!\n  ) {\n    deleteTravelproductQuestionAnswer(\n      travelproductQuestionAnswerId: $travelproductQuestionAnswerId\n    )\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createTravelproductQuestion(\n    $input: CreateTravelproductQuestionInput!\n    $travelproductId: ID!\n  ) {\n    createTravelproductQuestion(\n      createTravelproductQuestionInput: $input\n      travelproductId: $travelproductId\n    ) {\n      _id\n    }\n  }\n"): (typeof documents)["\n  mutation createTravelproductQuestion(\n    $input: CreateTravelproductQuestionInput!\n    $travelproductId: ID!\n  ) {\n    createTravelproductQuestion(\n      createTravelproductQuestionInput: $input\n      travelproductId: $travelproductId\n    ) {\n      _id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchTravelproductQuestions($page: Int!, $travelproductId: ID!) {\n    fetchTravelproductQuestions(\n      page: $page\n      travelproductId: $travelproductId\n    ) {\n      _id\n      contents\n      user {\n        _id\n        name\n        email\n        picture\n      }\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query fetchTravelproductQuestions($page: Int!, $travelproductId: ID!) {\n    fetchTravelproductQuestions(\n      page: $page\n      travelproductId: $travelproductId\n    ) {\n      _id\n      contents\n      user {\n        _id\n        name\n        email\n        picture\n      }\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateTravelproductQuestion(\n    $input: UpdateTravelproductQuestionInput!\n    $commentId: ID!\n  ) {\n    updateTravelproductQuestion(\n      updateTravelproductQuestionInput: $input\n      travelproductQuestionId: $commentId\n    ) {\n      _id\n      contents\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation updateTravelproductQuestion(\n    $input: UpdateTravelproductQuestionInput!\n    $commentId: ID!\n  ) {\n    updateTravelproductQuestion(\n      updateTravelproductQuestionInput: $input\n      travelproductQuestionId: $commentId\n    ) {\n      _id\n      contents\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteTravelproductQuestion($travelproductQuestionId: ID!) {\n    deleteTravelproductQuestion(\n      travelproductQuestionId: $travelproductQuestionId\n    )\n  }\n"): (typeof documents)["\n  mutation deleteTravelproductQuestion($travelproductQuestionId: ID!) {\n    deleteTravelproductQuestion(\n      travelproductQuestionId: $travelproductQuestionId\n    )\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createTravelproduct($input: CreateTravelproductInput!) {\n    createTravelproduct(createTravelproductInput: $input) {\n      _id\n    }\n  }\n"): (typeof documents)["\n  mutation createTravelproduct($input: CreateTravelproductInput!) {\n    createTravelproduct(createTravelproductInput: $input) {\n      _id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FetchTravelProduct2($travelproductId: ID!) {\n    fetchTravelproduct(travelproductId: $travelproductId) {\n      _id\n      name\n      remarks\n      contents\n      price\n      tags\n      images\n      travelproductAddress {\n        zipcode\n        address\n        addressDetail\n      }\n    }\n  }\n"): (typeof documents)["\n  query FetchTravelProduct2($travelproductId: ID!) {\n    fetchTravelproduct(travelproductId: $travelproductId) {\n      _id\n      name\n      remarks\n      contents\n      price\n      tags\n      images\n      travelproductAddress {\n        zipcode\n        address\n        addressDetail\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateTravelproduct(\n    $updateTravelproductInput: UpdateTravelproductInput!\n    $travelproductId: ID!\n  ) {\n    updateTravelproduct(\n      updateTravelproductInput: $updateTravelproductInput\n      travelproductId: $travelproductId\n    ) {\n      _id\n    }\n  }\n"): (typeof documents)["\n  mutation updateTravelproduct(\n    $updateTravelproductInput: UpdateTravelproductInput!\n    $travelproductId: ID!\n  ) {\n    updateTravelproduct(\n      updateTravelproductInput: $updateTravelproductInput\n      travelproductId: $travelproductId\n    ) {\n      _id\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;