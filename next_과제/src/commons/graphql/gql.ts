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
    "\n  mutation createUser($createUserInput: CreateUserInput!) {\n    createUser(createUserInput: $createUserInput) {\n      _id\n      email\n      name\n    }\n  }\n": types.CreateUserDocument,
    "\n  mutation loginUser($password: String!, $email: String!) {\n    loginUser(password: $password, email: $email) {\n      accessToken\n    }\n  }\n": types.LoginUserDocument,
    "\n  mutation logoutUser {\n    logoutUser\n  }\n": types.LogoutUserDocument,
    "\n  mutation restoreAccessToken {\n    restoreAccessToken {\n      accessToken\n    }\n  }\n": types.RestoreAccessTokenDocument,
    "\n  query fetchBoardComments($page: Int, $boardId: ID!) {\n    fetchBoardComments(page: $page, boardId: $boardId) {\n      _id\n      writer\n      contents\n      rating\n      user {\n        _id\n        email\n        name\n        picture\n        # userPoint\n        # createdAt\n        # updatedAt\n        # deletedAt\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n": types.FetchBoardCommentsDocument,
    "\n  mutation deleteBoardComment($password: String, $boardCommentId: ID!) {\n    deleteBoardComment(password: $password, boardCommentId: $boardCommentId)\n  }\n": types.DeleteBoardCommentDocument,
    "\n  mutation updateBoardComment(\n    $updateBoardCommentInput: UpdateBoardCommentInput!\n    $password: String\n    $boardCommentId: ID!\n  ) {\n    updateBoardComment(\n      updateBoardCommentInput: $updateBoardCommentInput\n      password: $password\n      boardCommentId: $boardCommentId\n    ) {\n      _id\n    }\n  }\n": types.UpdateBoardCommentDocument,
    "\n  mutation createBoardComment(\n    $createBoardCommentInput: CreateBoardCommentInput!\n    $boardId: ID!\n  ) {\n    createBoardComment(\n      createBoardCommentInput: $createBoardCommentInput\n      boardId: $boardId\n    ) {\n      _id\n      writer\n      contents\n      rating\n      # user {\n      #   picture\n      #   email\n      #   name\n      # }\n      # createdAt\n      # updatedAt\n      # deletedAt\n    }\n  }\n": types.CreateBoardCommentDocument,
    "\n  query fetchBoardDetail($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      images\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      user {\n        picture\n        deletedAt\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n": types.FetchBoardDetailDocument,
    "\n  query fetchBoardsList(\n    $endDate: DateTime\n    $startDate: DateTime\n    $search: String\n    $page: Int\n  ) {\n    fetchBoards(\n      endDate: $endDate\n      startDate: $startDate\n      search: $search\n      page: $page\n    ) {\n      _id\n      writer\n      title\n      createdAt\n      images\n      youtubeUrl\n    }\n  }\n": types.FetchBoardsListDocument,
    "\n  mutation deleteBoard($boardId: ID!) {\n    deleteBoard(boardId: $boardId)\n  }\n": types.DeleteBoardDocument,
    "\n  query fetchBoardsCount(\n    $endDate: DateTime\n    $startDate: DateTime\n    $search: String\n  ) {\n    fetchBoardsCount(endDate: $endDate, startDate: $startDate, search: $search)\n  }\n": types.FetchBoardsCountDocument,
    "\n  mutation createBoard($createBoardInput: CreateBoardInput!) {\n    createBoard(createBoardInput: $createBoardInput) {\n      _id\n    }\n  }\n": types.CreateBoardDocument,
    "\n  mutation uploadFile($file: Upload!) {\n    uploadFile(file: $file) {\n      _id\n      url\n    }\n  }\n": types.UploadFileDocument,
    "\n  mutation updateBoard(\n    $updateBoardInput: UpdateBoardInput!\n    $password: String\n    $boardId: ID!\n  ) {\n    updateBoard(\n      updateBoardInput: $updateBoardInput\n      password: $password\n      boardId: $boardId\n    ) {\n      _id\n    }\n  }\n": types.UpdateBoardDocument,
    "\n  query fetchBoard($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      likeCount\n      dislikeCount\n      images\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      user {\n        picture\n        deletedAt\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n": types.FetchBoardDocument,
    "\n  mutation LogoutUser {\n    logoutUser\n  }\n": types.LogoutUserDocument,
    "\n  query fetchBoardsOfTheBest {\n    fetchBoardsOfTheBest {\n      _id\n      title\n      images\n      user {\n        picture\n        name\n      }\n      writer\n      createdAt\n      likeCount\n    }\n  }\n": types.FetchBoardsOfTheBestDocument,
    "\n  query fetchBoardLikeCount($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      likeCount\n      dislikeCount\n    }\n  }\n": types.FetchBoardLikeCountDocument,
    "\n  mutation likeBoard($boardId: ID!) {\n    likeBoard(boardId: $boardId)\n  }\n": types.LikeBoardDocument,
    "\n  mutation dislikeBoard($boardId: ID!) {\n    dislikeBoard(boardId: $boardId)\n  }\n": types.DislikeBoardDocument,
    "\n  query fetchUserLoggedIn {\n    fetchUserLoggedIn {\n      _id\n      email\n      name\n      picture\n      userPoint {\n        _id\n        amount\n        # user\n        createdAt\n        updatedAt\n        deletedAt\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n": types.FetchUserLoggedInDocument,
    "\n  mutation resetUserPassword($password: String!) {\n    resetUserPassword(password: $password)\n  }\n": types.ResetUserPasswordDocument,
    "\n  query fetchTravelproductsIPicked($search: String, $page: Int) {\n    fetchTravelproductsIPicked(search: $search, page: $page) {\n      _id\n      name\n      price\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n": types.FetchTravelproductsIPickedDocument,
    "\n  query fetchTravelproductsCountIPicked {\n    fetchTravelproductsCountIPicked\n  }\n": types.FetchTravelproductsCountIPickedDocument,
    "\n  query fetchPointTransactionsOfAll($search: String, $page: Int) {\n    fetchPointTransactionsOfBuying(search: $search, page: $page) {\n      _id\n      impUid\n      amount\n      balance\n      status\n      statusDetail\n      # travelproduct {\n      #   _id\n      #   name\n      #   remarks\n      #   contents\n      #   price\n      #   tags\n      #}\n      user {\n        name\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n    fetchPointTransactionsOfLoading(search: $search, page: $page) {\n      _id\n      impUid\n      amount\n      balance\n      status\n      statusDetail\n      # travelproduct {\n      #   _id\n      #   name\n      #   remarks\n      #   contents\n      #   price\n      #   tags\n      #}\n      user {\n        name\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n    fetchPointTransactionsOfSelling(search: $search, page: $page) {\n      _id\n      impUid\n      amount\n      balance\n      status\n      statusDetail\n      # travelproduct {\n      #   _id\n      #   name\n      #   remarks\n      #   contents\n      #   price\n      #   tags\n      #}\n      user {\n        name\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n": types.FetchPointTransactionsOfAllDocument,
    "\n  query fetchPointTransactionsCountOfAll {\n    fetchPointTransactionsCountOfBuying\n    fetchPointTransactionsCountOfLoading\n    fetchPointTransactionsCountOfSelling\n  }\n": types.FetchPointTransactionsCountOfAllDocument,
    "\n  query fetchPointTransactionsOfBuying($search: String, $page: Int) {\n    fetchPointTransactionsOfBuying(search: $search, page: $page) {\n      _id\n      impUid\n      amount\n      balance\n      status\n      statusDetail\n      # travelproduct {\n      #   _id\n      #   name\n      #   remarks\n      #   contents\n      #   price\n      #   tags\n      #}\n      user {\n        name\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n": types.FetchPointTransactionsOfBuyingDocument,
    "\n  query fetchPointTransactionsCountOfBuying {\n    fetchPointTransactionsCountOfBuying\n  }\n": types.FetchPointTransactionsCountOfBuyingDocument,
    "\n  query fetchPointTransactionsOfLoading($search: String, $page: Int) {\n    fetchPointTransactionsOfLoading(search: $search, page: $page) {\n      _id\n      impUid\n      amount\n      balance\n      status\n      statusDetail\n      # travelproduct {\n      #   _id\n      #   name\n      #   remarks\n      #   contents\n      #   price\n      #   tags\n      #}\n      user {\n        name\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n": types.FetchPointTransactionsOfLoadingDocument,
    "\n  query fetchPointTransactionsCountOfLoading {\n    fetchPointTransactionsCountOfLoading\n  }\n": types.FetchPointTransactionsCountOfLoadingDocument,
    "\n  query fetchPointTransactionsOfSelling($search: String, $page: Int) {\n    fetchPointTransactionsOfSelling(search: $search, page: $page) {\n      _id\n      impUid\n      amount\n      balance\n      status\n      statusDetail\n      # travelproduct {\n      #   _id\n      #   name\n      #   remarks\n      #   contents\n      #   price\n      #   tags\n      #}\n      user {\n        name\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n": types.FetchPointTransactionsOfSellingDocument,
    "\n  query fetchPointTransactionsCountOfSelling {\n    fetchPointTransactionsCountOfSelling\n  }\n": types.FetchPointTransactionsCountOfSellingDocument,
    "\n  mutation createPointTransactionOfBuyingAndSelling($useritemId: ID!) {\n    createPointTransactionOfBuyingAndSelling(useritemId: $useritemId) {\n      _id\n    }\n  }\n": types.CreatePointTransactionOfBuyingAndSellingDocument,
    "\n  mutation deleteTravelproductQuestionAnswer(\n    $travelproductQuestionAnswerId: ID!\n  ) {\n    deleteTravelproductQuestionAnswer(\n      travelproductQuestionAnswerId: $travelproductQuestionAnswerId\n    )\n  }\n": types.DeleteTravelproductQuestionAnswerDocument,
    "\n  query fetchTravelproductQuestionAnswers(\n    $page: Int\n    $travelproductQuestionId: ID!\n  ) {\n    fetchTravelproductQuestionAnswers(\n      page: $page\n      travelproductQuestionId: $travelproductQuestionId\n    ) {\n      _id\n      contents\n      user {\n        _id\n        name\n        picture\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n": types.FetchTravelproductQuestionAnswersDocument,
    "\n  mutation createTravelproductQuestionAnswer(\n    $createTravelproductQuestionAnswerInput: CreateTravelproductQuestionAnswerInput!\n    $travelproductQuestionId: ID!\n  ) {\n    createTravelproductQuestionAnswer(\n      createTravelproductQuestionAnswerInput: $createTravelproductQuestionAnswerInput\n      travelproductQuestionId: $travelproductQuestionId\n    ) {\n      _id\n    }\n  }\n": types.CreateTravelproductQuestionAnswerDocument,
    "\n  mutation updateTravelproductQuestionAnswer(\n    $updateTravelproductQuestionAnswerInput: UpdateTravelproductQuestionAnswerInput!\n    $travelproductQuestionAnswerId: ID!\n  ) {\n    updateTravelproductQuestionAnswer(\n      updateTravelproductQuestionAnswerInput: $updateTravelproductQuestionAnswerInput\n      travelproductQuestionAnswerId: $travelproductQuestionAnswerId\n    ) {\n      _id\n    }\n  }\n": types.UpdateTravelproductQuestionAnswerDocument,
    "\n  mutation deleteTravelproductQuestion($travelproductQuestionId: ID!) {\n    deleteTravelproductQuestion(\n      travelproductQuestionId: $travelproductQuestionId\n    )\n  }\n": types.DeleteTravelproductQuestionDocument,
    "\n  query fetchTravelproductQuestions($page: Int, $travelproductId: ID!) {\n    fetchTravelproductQuestions(\n      page: $page\n      travelproductId: $travelproductId\n    ) {\n      _id\n      contents\n      user {\n        _id\n        name\n        picture\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n": types.FetchTravelproductQuestionsDocument,
    "\n  query fetchTravelproductOfMine {\n    fetchUserLoggedIn {\n      _id\n    }\n  }\n": types.FetchTravelproductOfMineDocument,
    "\n  mutation createTravelproductQuestion(\n    $createTravelproductQuestionInput: CreateTravelproductQuestionInput!\n    $travelproductId: ID!\n  ) {\n    createTravelproductQuestion(\n      createTravelproductQuestionInput: $createTravelproductQuestionInput\n      travelproductId: $travelproductId\n    ) {\n      _id\n    }\n  }\n": types.CreateTravelproductQuestionDocument,
    "\n  mutation updateTravelproductQuestion(\n    $updateTravelproductQuestionInput: UpdateTravelproductQuestionInput!\n    $travelproductQuestionId: ID!\n  ) {\n    updateTravelproductQuestion(\n      updateTravelproductQuestionInput: $updateTravelproductQuestionInput\n      travelproductQuestionId: $travelproductQuestionId\n    ) {\n      _id\n    }\n  }\n": types.UpdateTravelproductQuestionDocument,
    "\n  query fetchTravelproductDetail($travelproductId: ID!) {\n    fetchTravelproduct(travelproductId: $travelproductId) {\n      _id\n      name\n      remarks\n      contents\n      tags\n      images\n      pickedCount\n      price\n      seller {\n        _id\n        name\n        picture\n      }\n      travelproductAddress {\n        zipcode\n        address\n        addressDetail\n        lat\n        lng\n      }\n    }\n  }\n": types.FetchTravelproductDetailDocument,
    "\n  mutation toggleTravelproductPick($travelproductId: ID!) {\n    toggleTravelproductPick(travelproductId: $travelproductId)\n  }\n": types.ToggleTravelproductPickDocument,
    "\n  query fetchTravelproducts($isSoldout: Boolean, $search: String, $page: Int) {\n    fetchTravelproducts(isSoldout: $isSoldout, search: $search, page: $page) {\n      _id\n      name\n      remarks\n      contents\n      price\n      tags\n      images\n      pickedCount\n      # travelproductAddress\n      # buyer\n      seller {\n        name\n        picture\n      }\n      soldAt\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n": types.FetchTravelproductsDocument,
    "\n  query fetchTravelproductsOfTheBest {\n    fetchTravelproductsOfTheBest {\n      _id\n      name\n      remarks\n      price\n      tags\n      images\n      pickedCount\n      soldAt\n      deletedAt\n    }\n  }\n": types.FetchTravelproductsOfTheBestDocument,
    "\n  mutation createTravelproduct(\n    $createTravelproductInput: CreateTravelproductInput!\n  ) {\n    createTravelproduct(createTravelproductInput: $createTravelproductInput) {\n      _id\n    }\n  }\n": types.CreateTravelproductDocument,
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
export function graphql(source: "\n  mutation createUser($createUserInput: CreateUserInput!) {\n    createUser(createUserInput: $createUserInput) {\n      _id\n      email\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation createUser($createUserInput: CreateUserInput!) {\n    createUser(createUserInput: $createUserInput) {\n      _id\n      email\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation loginUser($password: String!, $email: String!) {\n    loginUser(password: $password, email: $email) {\n      accessToken\n    }\n  }\n"): (typeof documents)["\n  mutation loginUser($password: String!, $email: String!) {\n    loginUser(password: $password, email: $email) {\n      accessToken\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation logoutUser {\n    logoutUser\n  }\n"): (typeof documents)["\n  mutation logoutUser {\n    logoutUser\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation restoreAccessToken {\n    restoreAccessToken {\n      accessToken\n    }\n  }\n"): (typeof documents)["\n  mutation restoreAccessToken {\n    restoreAccessToken {\n      accessToken\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoardComments($page: Int, $boardId: ID!) {\n    fetchBoardComments(page: $page, boardId: $boardId) {\n      _id\n      writer\n      contents\n      rating\n      user {\n        _id\n        email\n        name\n        picture\n        # userPoint\n        # createdAt\n        # updatedAt\n        # deletedAt\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"): (typeof documents)["\n  query fetchBoardComments($page: Int, $boardId: ID!) {\n    fetchBoardComments(page: $page, boardId: $boardId) {\n      _id\n      writer\n      contents\n      rating\n      user {\n        _id\n        email\n        name\n        picture\n        # userPoint\n        # createdAt\n        # updatedAt\n        # deletedAt\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteBoardComment($password: String, $boardCommentId: ID!) {\n    deleteBoardComment(password: $password, boardCommentId: $boardCommentId)\n  }\n"): (typeof documents)["\n  mutation deleteBoardComment($password: String, $boardCommentId: ID!) {\n    deleteBoardComment(password: $password, boardCommentId: $boardCommentId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateBoardComment(\n    $updateBoardCommentInput: UpdateBoardCommentInput!\n    $password: String\n    $boardCommentId: ID!\n  ) {\n    updateBoardComment(\n      updateBoardCommentInput: $updateBoardCommentInput\n      password: $password\n      boardCommentId: $boardCommentId\n    ) {\n      _id\n    }\n  }\n"): (typeof documents)["\n  mutation updateBoardComment(\n    $updateBoardCommentInput: UpdateBoardCommentInput!\n    $password: String\n    $boardCommentId: ID!\n  ) {\n    updateBoardComment(\n      updateBoardCommentInput: $updateBoardCommentInput\n      password: $password\n      boardCommentId: $boardCommentId\n    ) {\n      _id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createBoardComment(\n    $createBoardCommentInput: CreateBoardCommentInput!\n    $boardId: ID!\n  ) {\n    createBoardComment(\n      createBoardCommentInput: $createBoardCommentInput\n      boardId: $boardId\n    ) {\n      _id\n      writer\n      contents\n      rating\n      # user {\n      #   picture\n      #   email\n      #   name\n      # }\n      # createdAt\n      # updatedAt\n      # deletedAt\n    }\n  }\n"): (typeof documents)["\n  mutation createBoardComment(\n    $createBoardCommentInput: CreateBoardCommentInput!\n    $boardId: ID!\n  ) {\n    createBoardComment(\n      createBoardCommentInput: $createBoardCommentInput\n      boardId: $boardId\n    ) {\n      _id\n      writer\n      contents\n      rating\n      # user {\n      #   picture\n      #   email\n      #   name\n      # }\n      # createdAt\n      # updatedAt\n      # deletedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoardDetail($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      images\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      user {\n        picture\n        deletedAt\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"): (typeof documents)["\n  query fetchBoardDetail($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      images\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      user {\n        picture\n        deletedAt\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoardsList(\n    $endDate: DateTime\n    $startDate: DateTime\n    $search: String\n    $page: Int\n  ) {\n    fetchBoards(\n      endDate: $endDate\n      startDate: $startDate\n      search: $search\n      page: $page\n    ) {\n      _id\n      writer\n      title\n      createdAt\n      images\n      youtubeUrl\n    }\n  }\n"): (typeof documents)["\n  query fetchBoardsList(\n    $endDate: DateTime\n    $startDate: DateTime\n    $search: String\n    $page: Int\n  ) {\n    fetchBoards(\n      endDate: $endDate\n      startDate: $startDate\n      search: $search\n      page: $page\n    ) {\n      _id\n      writer\n      title\n      createdAt\n      images\n      youtubeUrl\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteBoard($boardId: ID!) {\n    deleteBoard(boardId: $boardId)\n  }\n"): (typeof documents)["\n  mutation deleteBoard($boardId: ID!) {\n    deleteBoard(boardId: $boardId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoardsCount(\n    $endDate: DateTime\n    $startDate: DateTime\n    $search: String\n  ) {\n    fetchBoardsCount(endDate: $endDate, startDate: $startDate, search: $search)\n  }\n"): (typeof documents)["\n  query fetchBoardsCount(\n    $endDate: DateTime\n    $startDate: DateTime\n    $search: String\n  ) {\n    fetchBoardsCount(endDate: $endDate, startDate: $startDate, search: $search)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createBoard($createBoardInput: CreateBoardInput!) {\n    createBoard(createBoardInput: $createBoardInput) {\n      _id\n    }\n  }\n"): (typeof documents)["\n  mutation createBoard($createBoardInput: CreateBoardInput!) {\n    createBoard(createBoardInput: $createBoardInput) {\n      _id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation uploadFile($file: Upload!) {\n    uploadFile(file: $file) {\n      _id\n      url\n    }\n  }\n"): (typeof documents)["\n  mutation uploadFile($file: Upload!) {\n    uploadFile(file: $file) {\n      _id\n      url\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateBoard(\n    $updateBoardInput: UpdateBoardInput!\n    $password: String\n    $boardId: ID!\n  ) {\n    updateBoard(\n      updateBoardInput: $updateBoardInput\n      password: $password\n      boardId: $boardId\n    ) {\n      _id\n    }\n  }\n"): (typeof documents)["\n  mutation updateBoard(\n    $updateBoardInput: UpdateBoardInput!\n    $password: String\n    $boardId: ID!\n  ) {\n    updateBoard(\n      updateBoardInput: $updateBoardInput\n      password: $password\n      boardId: $boardId\n    ) {\n      _id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoard($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      likeCount\n      dislikeCount\n      images\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      user {\n        picture\n        deletedAt\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"): (typeof documents)["\n  query fetchBoard($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      likeCount\n      dislikeCount\n      images\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      user {\n        picture\n        deletedAt\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation LogoutUser {\n    logoutUser\n  }\n"): (typeof documents)["\n  mutation LogoutUser {\n    logoutUser\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoardsOfTheBest {\n    fetchBoardsOfTheBest {\n      _id\n      title\n      images\n      user {\n        picture\n        name\n      }\n      writer\n      createdAt\n      likeCount\n    }\n  }\n"): (typeof documents)["\n  query fetchBoardsOfTheBest {\n    fetchBoardsOfTheBest {\n      _id\n      title\n      images\n      user {\n        picture\n        name\n      }\n      writer\n      createdAt\n      likeCount\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoardLikeCount($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      likeCount\n      dislikeCount\n    }\n  }\n"): (typeof documents)["\n  query fetchBoardLikeCount($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      likeCount\n      dislikeCount\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation likeBoard($boardId: ID!) {\n    likeBoard(boardId: $boardId)\n  }\n"): (typeof documents)["\n  mutation likeBoard($boardId: ID!) {\n    likeBoard(boardId: $boardId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation dislikeBoard($boardId: ID!) {\n    dislikeBoard(boardId: $boardId)\n  }\n"): (typeof documents)["\n  mutation dislikeBoard($boardId: ID!) {\n    dislikeBoard(boardId: $boardId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchUserLoggedIn {\n    fetchUserLoggedIn {\n      _id\n      email\n      name\n      picture\n      userPoint {\n        _id\n        amount\n        # user\n        createdAt\n        updatedAt\n        deletedAt\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"): (typeof documents)["\n  query fetchUserLoggedIn {\n    fetchUserLoggedIn {\n      _id\n      email\n      name\n      picture\n      userPoint {\n        _id\n        amount\n        # user\n        createdAt\n        updatedAt\n        deletedAt\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation resetUserPassword($password: String!) {\n    resetUserPassword(password: $password)\n  }\n"): (typeof documents)["\n  mutation resetUserPassword($password: String!) {\n    resetUserPassword(password: $password)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchTravelproductsIPicked($search: String, $page: Int) {\n    fetchTravelproductsIPicked(search: $search, page: $page) {\n      _id\n      name\n      price\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"): (typeof documents)["\n  query fetchTravelproductsIPicked($search: String, $page: Int) {\n    fetchTravelproductsIPicked(search: $search, page: $page) {\n      _id\n      name\n      price\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchTravelproductsCountIPicked {\n    fetchTravelproductsCountIPicked\n  }\n"): (typeof documents)["\n  query fetchTravelproductsCountIPicked {\n    fetchTravelproductsCountIPicked\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchPointTransactionsOfAll($search: String, $page: Int) {\n    fetchPointTransactionsOfBuying(search: $search, page: $page) {\n      _id\n      impUid\n      amount\n      balance\n      status\n      statusDetail\n      # travelproduct {\n      #   _id\n      #   name\n      #   remarks\n      #   contents\n      #   price\n      #   tags\n      #}\n      user {\n        name\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n    fetchPointTransactionsOfLoading(search: $search, page: $page) {\n      _id\n      impUid\n      amount\n      balance\n      status\n      statusDetail\n      # travelproduct {\n      #   _id\n      #   name\n      #   remarks\n      #   contents\n      #   price\n      #   tags\n      #}\n      user {\n        name\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n    fetchPointTransactionsOfSelling(search: $search, page: $page) {\n      _id\n      impUid\n      amount\n      balance\n      status\n      statusDetail\n      # travelproduct {\n      #   _id\n      #   name\n      #   remarks\n      #   contents\n      #   price\n      #   tags\n      #}\n      user {\n        name\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"): (typeof documents)["\n  query fetchPointTransactionsOfAll($search: String, $page: Int) {\n    fetchPointTransactionsOfBuying(search: $search, page: $page) {\n      _id\n      impUid\n      amount\n      balance\n      status\n      statusDetail\n      # travelproduct {\n      #   _id\n      #   name\n      #   remarks\n      #   contents\n      #   price\n      #   tags\n      #}\n      user {\n        name\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n    fetchPointTransactionsOfLoading(search: $search, page: $page) {\n      _id\n      impUid\n      amount\n      balance\n      status\n      statusDetail\n      # travelproduct {\n      #   _id\n      #   name\n      #   remarks\n      #   contents\n      #   price\n      #   tags\n      #}\n      user {\n        name\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n    fetchPointTransactionsOfSelling(search: $search, page: $page) {\n      _id\n      impUid\n      amount\n      balance\n      status\n      statusDetail\n      # travelproduct {\n      #   _id\n      #   name\n      #   remarks\n      #   contents\n      #   price\n      #   tags\n      #}\n      user {\n        name\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchPointTransactionsCountOfAll {\n    fetchPointTransactionsCountOfBuying\n    fetchPointTransactionsCountOfLoading\n    fetchPointTransactionsCountOfSelling\n  }\n"): (typeof documents)["\n  query fetchPointTransactionsCountOfAll {\n    fetchPointTransactionsCountOfBuying\n    fetchPointTransactionsCountOfLoading\n    fetchPointTransactionsCountOfSelling\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchPointTransactionsOfBuying($search: String, $page: Int) {\n    fetchPointTransactionsOfBuying(search: $search, page: $page) {\n      _id\n      impUid\n      amount\n      balance\n      status\n      statusDetail\n      # travelproduct {\n      #   _id\n      #   name\n      #   remarks\n      #   contents\n      #   price\n      #   tags\n      #}\n      user {\n        name\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"): (typeof documents)["\n  query fetchPointTransactionsOfBuying($search: String, $page: Int) {\n    fetchPointTransactionsOfBuying(search: $search, page: $page) {\n      _id\n      impUid\n      amount\n      balance\n      status\n      statusDetail\n      # travelproduct {\n      #   _id\n      #   name\n      #   remarks\n      #   contents\n      #   price\n      #   tags\n      #}\n      user {\n        name\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchPointTransactionsCountOfBuying {\n    fetchPointTransactionsCountOfBuying\n  }\n"): (typeof documents)["\n  query fetchPointTransactionsCountOfBuying {\n    fetchPointTransactionsCountOfBuying\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchPointTransactionsOfLoading($search: String, $page: Int) {\n    fetchPointTransactionsOfLoading(search: $search, page: $page) {\n      _id\n      impUid\n      amount\n      balance\n      status\n      statusDetail\n      # travelproduct {\n      #   _id\n      #   name\n      #   remarks\n      #   contents\n      #   price\n      #   tags\n      #}\n      user {\n        name\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"): (typeof documents)["\n  query fetchPointTransactionsOfLoading($search: String, $page: Int) {\n    fetchPointTransactionsOfLoading(search: $search, page: $page) {\n      _id\n      impUid\n      amount\n      balance\n      status\n      statusDetail\n      # travelproduct {\n      #   _id\n      #   name\n      #   remarks\n      #   contents\n      #   price\n      #   tags\n      #}\n      user {\n        name\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchPointTransactionsCountOfLoading {\n    fetchPointTransactionsCountOfLoading\n  }\n"): (typeof documents)["\n  query fetchPointTransactionsCountOfLoading {\n    fetchPointTransactionsCountOfLoading\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchPointTransactionsOfSelling($search: String, $page: Int) {\n    fetchPointTransactionsOfSelling(search: $search, page: $page) {\n      _id\n      impUid\n      amount\n      balance\n      status\n      statusDetail\n      # travelproduct {\n      #   _id\n      #   name\n      #   remarks\n      #   contents\n      #   price\n      #   tags\n      #}\n      user {\n        name\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"): (typeof documents)["\n  query fetchPointTransactionsOfSelling($search: String, $page: Int) {\n    fetchPointTransactionsOfSelling(search: $search, page: $page) {\n      _id\n      impUid\n      amount\n      balance\n      status\n      statusDetail\n      # travelproduct {\n      #   _id\n      #   name\n      #   remarks\n      #   contents\n      #   price\n      #   tags\n      #}\n      user {\n        name\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchPointTransactionsCountOfSelling {\n    fetchPointTransactionsCountOfSelling\n  }\n"): (typeof documents)["\n  query fetchPointTransactionsCountOfSelling {\n    fetchPointTransactionsCountOfSelling\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createPointTransactionOfBuyingAndSelling($useritemId: ID!) {\n    createPointTransactionOfBuyingAndSelling(useritemId: $useritemId) {\n      _id\n    }\n  }\n"): (typeof documents)["\n  mutation createPointTransactionOfBuyingAndSelling($useritemId: ID!) {\n    createPointTransactionOfBuyingAndSelling(useritemId: $useritemId) {\n      _id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteTravelproductQuestionAnswer(\n    $travelproductQuestionAnswerId: ID!\n  ) {\n    deleteTravelproductQuestionAnswer(\n      travelproductQuestionAnswerId: $travelproductQuestionAnswerId\n    )\n  }\n"): (typeof documents)["\n  mutation deleteTravelproductQuestionAnswer(\n    $travelproductQuestionAnswerId: ID!\n  ) {\n    deleteTravelproductQuestionAnswer(\n      travelproductQuestionAnswerId: $travelproductQuestionAnswerId\n    )\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchTravelproductQuestionAnswers(\n    $page: Int\n    $travelproductQuestionId: ID!\n  ) {\n    fetchTravelproductQuestionAnswers(\n      page: $page\n      travelproductQuestionId: $travelproductQuestionId\n    ) {\n      _id\n      contents\n      user {\n        _id\n        name\n        picture\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"): (typeof documents)["\n  query fetchTravelproductQuestionAnswers(\n    $page: Int\n    $travelproductQuestionId: ID!\n  ) {\n    fetchTravelproductQuestionAnswers(\n      page: $page\n      travelproductQuestionId: $travelproductQuestionId\n    ) {\n      _id\n      contents\n      user {\n        _id\n        name\n        picture\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"];
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
export function graphql(source: "\n  mutation deleteTravelproductQuestion($travelproductQuestionId: ID!) {\n    deleteTravelproductQuestion(\n      travelproductQuestionId: $travelproductQuestionId\n    )\n  }\n"): (typeof documents)["\n  mutation deleteTravelproductQuestion($travelproductQuestionId: ID!) {\n    deleteTravelproductQuestion(\n      travelproductQuestionId: $travelproductQuestionId\n    )\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchTravelproductQuestions($page: Int, $travelproductId: ID!) {\n    fetchTravelproductQuestions(\n      page: $page\n      travelproductId: $travelproductId\n    ) {\n      _id\n      contents\n      user {\n        _id\n        name\n        picture\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"): (typeof documents)["\n  query fetchTravelproductQuestions($page: Int, $travelproductId: ID!) {\n    fetchTravelproductQuestions(\n      page: $page\n      travelproductId: $travelproductId\n    ) {\n      _id\n      contents\n      user {\n        _id\n        name\n        picture\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchTravelproductOfMine {\n    fetchUserLoggedIn {\n      _id\n    }\n  }\n"): (typeof documents)["\n  query fetchTravelproductOfMine {\n    fetchUserLoggedIn {\n      _id\n    }\n  }\n"];
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
export function graphql(source: "\n  query fetchTravelproductDetail($travelproductId: ID!) {\n    fetchTravelproduct(travelproductId: $travelproductId) {\n      _id\n      name\n      remarks\n      contents\n      tags\n      images\n      pickedCount\n      price\n      seller {\n        _id\n        name\n        picture\n      }\n      travelproductAddress {\n        zipcode\n        address\n        addressDetail\n        lat\n        lng\n      }\n    }\n  }\n"): (typeof documents)["\n  query fetchTravelproductDetail($travelproductId: ID!) {\n    fetchTravelproduct(travelproductId: $travelproductId) {\n      _id\n      name\n      remarks\n      contents\n      tags\n      images\n      pickedCount\n      price\n      seller {\n        _id\n        name\n        picture\n      }\n      travelproductAddress {\n        zipcode\n        address\n        addressDetail\n        lat\n        lng\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation toggleTravelproductPick($travelproductId: ID!) {\n    toggleTravelproductPick(travelproductId: $travelproductId)\n  }\n"): (typeof documents)["\n  mutation toggleTravelproductPick($travelproductId: ID!) {\n    toggleTravelproductPick(travelproductId: $travelproductId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchTravelproducts($isSoldout: Boolean, $search: String, $page: Int) {\n    fetchTravelproducts(isSoldout: $isSoldout, search: $search, page: $page) {\n      _id\n      name\n      remarks\n      contents\n      price\n      tags\n      images\n      pickedCount\n      # travelproductAddress\n      # buyer\n      seller {\n        name\n        picture\n      }\n      soldAt\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"): (typeof documents)["\n  query fetchTravelproducts($isSoldout: Boolean, $search: String, $page: Int) {\n    fetchTravelproducts(isSoldout: $isSoldout, search: $search, page: $page) {\n      _id\n      name\n      remarks\n      contents\n      price\n      tags\n      images\n      pickedCount\n      # travelproductAddress\n      # buyer\n      seller {\n        name\n        picture\n      }\n      soldAt\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchTravelproductsOfTheBest {\n    fetchTravelproductsOfTheBest {\n      _id\n      name\n      remarks\n      price\n      tags\n      images\n      pickedCount\n      soldAt\n      deletedAt\n    }\n  }\n"): (typeof documents)["\n  query fetchTravelproductsOfTheBest {\n    fetchTravelproductsOfTheBest {\n      _id\n      name\n      remarks\n      price\n      tags\n      images\n      pickedCount\n      soldAt\n      deletedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createTravelproduct(\n    $createTravelproductInput: CreateTravelproductInput!\n  ) {\n    createTravelproduct(createTravelproductInput: $createTravelproductInput) {\n      _id\n    }\n  }\n"): (typeof documents)["\n  mutation createTravelproduct(\n    $createTravelproductInput: CreateTravelproductInput!\n  ) {\n    createTravelproduct(createTravelproductInput: $createTravelproductInput) {\n      _id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateTravelproduct(\n    $updateTravelproductInput: UpdateTravelproductInput!\n    $travelproductId: ID!\n  ) {\n    updateTravelproduct(\n      updateTravelproductInput: $updateTravelproductInput\n      travelproductId: $travelproductId\n    ) {\n      _id\n    }\n  }\n"): (typeof documents)["\n  mutation updateTravelproduct(\n    $updateTravelproductInput: UpdateTravelproductInput!\n    $travelproductId: ID!\n  ) {\n    updateTravelproduct(\n      updateTravelproductInput: $updateTravelproductInput\n      travelproductId: $travelproductId\n    ) {\n      _id\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;