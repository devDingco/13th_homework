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
    "\n\tquery fetchBoards($page: Int, $search: String) {\n\t\tfetchBoards(page: $page, search: $search) {\n\t\t\t_id\n\t\t\twriter\n\t\t\ttitle\n\t\t\tcontents\n\t\t\tyoutubeUrl\n\t\t\tlikeCount\n\t\t\tdislikeCount\n\t\t\timages\n\t\t\tcreatedAt\n\t\t\tupdatedAt\n\t\t\tdeletedAt\n\t\t}\n\t}\n": types.FetchBoardsDocument,
    "\n\tmutation toggleTravelproductPick($travelproductId: ID!) {\n\t\ttoggleTravelproductPick(travelproductId: $travelproductId)\n\t}\n": types.ToggleTravelproductPickDocument,
    "\n\tmutation createTravelproduct(\n\t\t$createTravelproductInput: CreateTravelproductInput!\n\t) {\n\t\tcreateTravelproduct(createTravelproductInput: $createTravelproductInput) {\n\t\t\t_id\n\t\t\tname\n\t\t\tremarks\n\t\t\tcontents\n\t\t\tprice\n\t\t\ttags\n\t\t\timages\n\t\t\tpickedCount\n\t\t\tbuyer {\n\t\t\t\t_id\n\t\t\t\temail\n\t\t\t\tname\n\t\t\t}\n\t\t\tseller {\n\t\t\t\t_id\n\t\t\t\temail\n\t\t\t\tname\n\t\t\t}\n\t\t\tsoldAt\n\t\t\tcreatedAt\n\t\t\tupdatedAt\n\t\t\tdeletedAt\n\t\t}\n\t}\n": types.CreateTravelproductDocument,
    "\n\tquery fetchTravelproduct($travelproductId: ID!) {\n\t\tfetchTravelproduct(travelproductId: $travelproductId) {\n\t\t\t_id\n\t\t\tname\n\t\t\tremarks\n\t\t\tcontents\n\t\t\tprice\n\t\t\ttags\n\t\t\timages\n\t\t\tpickedCount\n\t\t\tbuyer {\n\t\t\t\t_id\n\t\t\t\temail\n\t\t\t\tname\n\t\t\t}\n\t\t\tseller {\n\t\t\t\t_id\n\t\t\t\temail\n\t\t\t\tname\n\t\t\t}\n\t\t\tsoldAt\n\t\t\tcreatedAt\n\t\t\tupdatedAt\n\t\t\tdeletedAt\n\t\t}\n\t}\n": types.FetchTravelproductDocument,
    "\n\tmutation updateTravelproduct(\n\t\t$updateTravelproductInput: UpdateTravelproductInput!\n\t\t$travelproductId: ID!\n\t) {\n\t\tupdateTravelproduct(\n\t\t\tupdateTravelproductInput: $updateTravelproductInput\n\t\t\ttravelproductId: $travelproductId\n\t\t) {\n\t\t\t_id\n\t\t\tname\n\t\t\tremarks\n\t\t\tcontents\n\t\t\tprice\n\t\t\ttags\n\t\t\timages\n\t\t\tpickedCount\n\t\t\tsoldAt\n\t\t\tcreatedAt\n\t\t\tupdatedAt\n\t\t\tdeletedAt\n\t\t}\n\t}\n": types.UpdateTravelproductDocument,
    "\n\tmutation createPointTransactionOfBuyingAndSelling($useritemId: ID!) {\n\t\tcreatePointTransactionOfBuyingAndSelling(useritemId: $useritemId) {\n\t\t\t_id\n\t\t\tname\n\t\t\tremarks\n\t\t\tcontents\n\t\t\tprice\n\t\t\ttags\n\t\t\timages\n\t\t\tpickedCount\n\t\t\tsoldAt\n\t\t\tcreatedAt\n\t\t\tupdatedAt\n\t\t\tdeletedAt\n\t\t}\n\t}\n": types.CreatePointTransactionOfBuyingAndSellingDocument,
    "\n  query fetchBoardComments($page: Int, $boardId: ID!) {\n    fetchBoardComments(page: $page, boardId: $boardId) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n      updatedAt\n    }\n  }\n": types.FetchBoardCommentsDocument,
    "\n  mutation createBoardComment(\n    $createBoardCommentInput: CreateBoardCommentInput!\n    $boardId: ID!\n  ) {\n    createBoardComment(\n      createBoardCommentInput: $createBoardCommentInput\n      boardId: $boardId\n    ) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n      updatedAt\n    }\n  }\n": types.CreateBoardCommentDocument,
    "\n  mutation updateBoardComment(\n    $updateBoardCommentInput: UpdateBoardCommentInput!\n    $password: String\n    $boardCommentId: ID!\n  ) {\n    updateBoardComment(\n      updateBoardCommentInput: $updateBoardCommentInput\n      password: $password\n      boardCommentId: $boardCommentId\n    ) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n": types.UpdateBoardCommentDocument,
    "\n  query fetchBoard($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      likeCount\n      dislikeCount\n      images\n      boardAddress {\n        _id\n        zipcode\n        address\n        addressDetail\n        createdAt\n        updatedAt\n      }\n      user {\n        _id\n        email\n        name\n        picture\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n": types.FetchBoardDocument,
    "\n  mutation deleteBoard($boardId: ID!) {\n    deleteBoard(boardId: $boardId)\n  }\n": types.DeleteBoardDocument,
    "\n\tquery fetchBoardsCount(\n\t\t$search: String\n\t\t$endDate: DateTime\n\t\t$startDate: DateTime\n\t) {\n\t\tfetchBoardsCount(search: $search, endDate: $endDate, startDate: $startDate)\n\t}\n": types.FetchBoardsCountDocument,
    "\n  mutation createBoard($createBoardInput: CreateBoardInput!) {\n    createBoard(createBoardInput: $createBoardInput) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      likeCount\n      images\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n": types.CreateBoardDocument,
    "\n  mutation updateBoard(\n    $updateBoardInput: UpdateBoardInput!\n    $password: String\n    $boardId: ID!\n  ) {\n    updateBoard(\n      updateBoardInput: $updateBoardInput\n      password: $password\n      boardId: $boardId\n    ) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      likeCount\n      dislikeCount\n      images\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n": types.UpdateBoardDocument,
    "\n  mutation uploadFile($file: Upload!) {\n    uploadFile(file: $file) {\n      url\n    }\n  }\n": types.UploadFileDocument,
    "\n\tmutation loginUser($email: String!, $password: String!) {\n\t\tloginUser(email: $email, password: $password) {\n\t\t\taccessToken\n\t\t}\n\t}\n": types.LoginUserDocument,
    "\n\tquery fetchTravelproducts($isSoldout: Boolean, $search: String, $page: Int) {\n\t\tfetchTravelproducts(isSoldout: $isSoldout, search: $search, page: $page) {\n\t\t\t_id\n\t\t\tname\n\t\t\tremarks\n\t\t\tcontents\n\t\t}\n\t}\n": types.FetchTravelproductsDocument,
    "\n\tquery fetchTravelproductQuestions($page: Int, $travelproductId: ID!) {\n\t\tfetchTravelproductQuestions(\n\t\t\tpage: $page\n\t\t\ttravelproductId: $travelproductId\n\t\t) {\n\t\t\t_id\n\t\t\tcontents\n\t\t\tuser {\n\t\t\t\t_id\n\t\t\t\temail\n\t\t\t\tname\n\t\t\t}\n\t\t\tcreatedAt\n\t\t\tupdatedAt\n\t\t\tdeletedAt\n\t\t}\n\t}\n": types.FetchTravelproductQuestionsDocument,
    "\n\tmutation updateTravelproductQuestion(\n\t\t$updateTravelproductQuestionInput: UpdateTravelproductQuestionInput!\n\t\t$travelproductQuestionId: ID!\n\t) {\n\t\tupdateTravelproductQuestion(\n\t\t\tupdateTravelproductQuestionInput: $updateTravelproductQuestionInput\n\t\t\ttravelproductQuestionId: $travelproductQuestionId\n\t\t) {\n\t\t\t_id\n\t\t\tcontents\n\t\t\tuser {\n\t\t\t\t_id\n\t\t\t\tname\n\t\t\t\temail\n\t\t\t}\n\t\t\tupdatedAt\n\t\t}\n\t}\n": types.UpdateTravelproductQuestionDocument,
    "\n\tquery fetchUserLoggedIn {\n\t\tfetchUserLoggedIn {\n\t\t\t_id\n\t\t\temail\n\t\t\tname\n\t\t}\n\t}\n": types.FetchUserLoggedInDocument,
    "\n\tmutation createTravelproductQuestion(\n\t\t$createTravelproductQuestionInput: CreateTravelproductQuestionInput!\n\t\t$travelproductId: ID!\n\t) {\n\t\tcreateTravelproductQuestion(\n\t\t\tcreateTravelproductQuestionInput: $createTravelproductQuestionInput\n\t\t\ttravelproductId: $travelproductId\n\t\t) {\n\t\t\t__typename\n\t\t\t_id\n\t\t\tcontents\n\t\t\tuser {\n\t\t\t\t__typename\n\t\t\t\t_id\n\t\t\t\temail\n\t\t\t\tname\n\t\t\t\tcreatedAt\n\t\t\t\tupdatedAt\n\t\t\t}\n\t\t\tcreatedAt\n\t\t\tupdatedAt\n\t\t\tdeletedAt\n\t\t}\n\t}\n": types.CreateTravelproductQuestionDocument,
    "\n\tmutation createUser($createUserInput: CreateUserInput!) {\n\t\tcreateUser(createUserInput: $createUserInput) {\n\t\t\t_id\n\t\t\tcreatedAt\n\t\t\tupdatedAt\n\t\t}\n\t}\n": types.CreateUserDocument,
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
export function graphql(source: "\n\tquery fetchBoards($page: Int, $search: String) {\n\t\tfetchBoards(page: $page, search: $search) {\n\t\t\t_id\n\t\t\twriter\n\t\t\ttitle\n\t\t\tcontents\n\t\t\tyoutubeUrl\n\t\t\tlikeCount\n\t\t\tdislikeCount\n\t\t\timages\n\t\t\tcreatedAt\n\t\t\tupdatedAt\n\t\t\tdeletedAt\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery fetchBoards($page: Int, $search: String) {\n\t\tfetchBoards(page: $page, search: $search) {\n\t\t\t_id\n\t\t\twriter\n\t\t\ttitle\n\t\t\tcontents\n\t\t\tyoutubeUrl\n\t\t\tlikeCount\n\t\t\tdislikeCount\n\t\t\timages\n\t\t\tcreatedAt\n\t\t\tupdatedAt\n\t\t\tdeletedAt\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation toggleTravelproductPick($travelproductId: ID!) {\n\t\ttoggleTravelproductPick(travelproductId: $travelproductId)\n\t}\n"): (typeof documents)["\n\tmutation toggleTravelproductPick($travelproductId: ID!) {\n\t\ttoggleTravelproductPick(travelproductId: $travelproductId)\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation createTravelproduct(\n\t\t$createTravelproductInput: CreateTravelproductInput!\n\t) {\n\t\tcreateTravelproduct(createTravelproductInput: $createTravelproductInput) {\n\t\t\t_id\n\t\t\tname\n\t\t\tremarks\n\t\t\tcontents\n\t\t\tprice\n\t\t\ttags\n\t\t\timages\n\t\t\tpickedCount\n\t\t\tbuyer {\n\t\t\t\t_id\n\t\t\t\temail\n\t\t\t\tname\n\t\t\t}\n\t\t\tseller {\n\t\t\t\t_id\n\t\t\t\temail\n\t\t\t\tname\n\t\t\t}\n\t\t\tsoldAt\n\t\t\tcreatedAt\n\t\t\tupdatedAt\n\t\t\tdeletedAt\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation createTravelproduct(\n\t\t$createTravelproductInput: CreateTravelproductInput!\n\t) {\n\t\tcreateTravelproduct(createTravelproductInput: $createTravelproductInput) {\n\t\t\t_id\n\t\t\tname\n\t\t\tremarks\n\t\t\tcontents\n\t\t\tprice\n\t\t\ttags\n\t\t\timages\n\t\t\tpickedCount\n\t\t\tbuyer {\n\t\t\t\t_id\n\t\t\t\temail\n\t\t\t\tname\n\t\t\t}\n\t\t\tseller {\n\t\t\t\t_id\n\t\t\t\temail\n\t\t\t\tname\n\t\t\t}\n\t\t\tsoldAt\n\t\t\tcreatedAt\n\t\t\tupdatedAt\n\t\t\tdeletedAt\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery fetchTravelproduct($travelproductId: ID!) {\n\t\tfetchTravelproduct(travelproductId: $travelproductId) {\n\t\t\t_id\n\t\t\tname\n\t\t\tremarks\n\t\t\tcontents\n\t\t\tprice\n\t\t\ttags\n\t\t\timages\n\t\t\tpickedCount\n\t\t\tbuyer {\n\t\t\t\t_id\n\t\t\t\temail\n\t\t\t\tname\n\t\t\t}\n\t\t\tseller {\n\t\t\t\t_id\n\t\t\t\temail\n\t\t\t\tname\n\t\t\t}\n\t\t\tsoldAt\n\t\t\tcreatedAt\n\t\t\tupdatedAt\n\t\t\tdeletedAt\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery fetchTravelproduct($travelproductId: ID!) {\n\t\tfetchTravelproduct(travelproductId: $travelproductId) {\n\t\t\t_id\n\t\t\tname\n\t\t\tremarks\n\t\t\tcontents\n\t\t\tprice\n\t\t\ttags\n\t\t\timages\n\t\t\tpickedCount\n\t\t\tbuyer {\n\t\t\t\t_id\n\t\t\t\temail\n\t\t\t\tname\n\t\t\t}\n\t\t\tseller {\n\t\t\t\t_id\n\t\t\t\temail\n\t\t\t\tname\n\t\t\t}\n\t\t\tsoldAt\n\t\t\tcreatedAt\n\t\t\tupdatedAt\n\t\t\tdeletedAt\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation updateTravelproduct(\n\t\t$updateTravelproductInput: UpdateTravelproductInput!\n\t\t$travelproductId: ID!\n\t) {\n\t\tupdateTravelproduct(\n\t\t\tupdateTravelproductInput: $updateTravelproductInput\n\t\t\ttravelproductId: $travelproductId\n\t\t) {\n\t\t\t_id\n\t\t\tname\n\t\t\tremarks\n\t\t\tcontents\n\t\t\tprice\n\t\t\ttags\n\t\t\timages\n\t\t\tpickedCount\n\t\t\tsoldAt\n\t\t\tcreatedAt\n\t\t\tupdatedAt\n\t\t\tdeletedAt\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation updateTravelproduct(\n\t\t$updateTravelproductInput: UpdateTravelproductInput!\n\t\t$travelproductId: ID!\n\t) {\n\t\tupdateTravelproduct(\n\t\t\tupdateTravelproductInput: $updateTravelproductInput\n\t\t\ttravelproductId: $travelproductId\n\t\t) {\n\t\t\t_id\n\t\t\tname\n\t\t\tremarks\n\t\t\tcontents\n\t\t\tprice\n\t\t\ttags\n\t\t\timages\n\t\t\tpickedCount\n\t\t\tsoldAt\n\t\t\tcreatedAt\n\t\t\tupdatedAt\n\t\t\tdeletedAt\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation createPointTransactionOfBuyingAndSelling($useritemId: ID!) {\n\t\tcreatePointTransactionOfBuyingAndSelling(useritemId: $useritemId) {\n\t\t\t_id\n\t\t\tname\n\t\t\tremarks\n\t\t\tcontents\n\t\t\tprice\n\t\t\ttags\n\t\t\timages\n\t\t\tpickedCount\n\t\t\tsoldAt\n\t\t\tcreatedAt\n\t\t\tupdatedAt\n\t\t\tdeletedAt\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation createPointTransactionOfBuyingAndSelling($useritemId: ID!) {\n\t\tcreatePointTransactionOfBuyingAndSelling(useritemId: $useritemId) {\n\t\t\t_id\n\t\t\tname\n\t\t\tremarks\n\t\t\tcontents\n\t\t\tprice\n\t\t\ttags\n\t\t\timages\n\t\t\tpickedCount\n\t\t\tsoldAt\n\t\t\tcreatedAt\n\t\t\tupdatedAt\n\t\t\tdeletedAt\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoardComments($page: Int, $boardId: ID!) {\n    fetchBoardComments(page: $page, boardId: $boardId) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query fetchBoardComments($page: Int, $boardId: ID!) {\n    fetchBoardComments(page: $page, boardId: $boardId) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createBoardComment(\n    $createBoardCommentInput: CreateBoardCommentInput!\n    $boardId: ID!\n  ) {\n    createBoardComment(\n      createBoardCommentInput: $createBoardCommentInput\n      boardId: $boardId\n    ) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation createBoardComment(\n    $createBoardCommentInput: CreateBoardCommentInput!\n    $boardId: ID!\n  ) {\n    createBoardComment(\n      createBoardCommentInput: $createBoardCommentInput\n      boardId: $boardId\n    ) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateBoardComment(\n    $updateBoardCommentInput: UpdateBoardCommentInput!\n    $password: String\n    $boardCommentId: ID!\n  ) {\n    updateBoardComment(\n      updateBoardCommentInput: $updateBoardCommentInput\n      password: $password\n      boardCommentId: $boardCommentId\n    ) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"): (typeof documents)["\n  mutation updateBoardComment(\n    $updateBoardCommentInput: UpdateBoardCommentInput!\n    $password: String\n    $boardCommentId: ID!\n  ) {\n    updateBoardComment(\n      updateBoardCommentInput: $updateBoardCommentInput\n      password: $password\n      boardCommentId: $boardCommentId\n    ) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoard($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      likeCount\n      dislikeCount\n      images\n      boardAddress {\n        _id\n        zipcode\n        address\n        addressDetail\n        createdAt\n        updatedAt\n      }\n      user {\n        _id\n        email\n        name\n        picture\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"): (typeof documents)["\n  query fetchBoard($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      likeCount\n      dislikeCount\n      images\n      boardAddress {\n        _id\n        zipcode\n        address\n        addressDetail\n        createdAt\n        updatedAt\n      }\n      user {\n        _id\n        email\n        name\n        picture\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteBoard($boardId: ID!) {\n    deleteBoard(boardId: $boardId)\n  }\n"): (typeof documents)["\n  mutation deleteBoard($boardId: ID!) {\n    deleteBoard(boardId: $boardId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery fetchBoardsCount(\n\t\t$search: String\n\t\t$endDate: DateTime\n\t\t$startDate: DateTime\n\t) {\n\t\tfetchBoardsCount(search: $search, endDate: $endDate, startDate: $startDate)\n\t}\n"): (typeof documents)["\n\tquery fetchBoardsCount(\n\t\t$search: String\n\t\t$endDate: DateTime\n\t\t$startDate: DateTime\n\t) {\n\t\tfetchBoardsCount(search: $search, endDate: $endDate, startDate: $startDate)\n\t}\n"];
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
export function graphql(source: "\n  mutation uploadFile($file: Upload!) {\n    uploadFile(file: $file) {\n      url\n    }\n  }\n"): (typeof documents)["\n  mutation uploadFile($file: Upload!) {\n    uploadFile(file: $file) {\n      url\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation loginUser($email: String!, $password: String!) {\n\t\tloginUser(email: $email, password: $password) {\n\t\t\taccessToken\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation loginUser($email: String!, $password: String!) {\n\t\tloginUser(email: $email, password: $password) {\n\t\t\taccessToken\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery fetchTravelproducts($isSoldout: Boolean, $search: String, $page: Int) {\n\t\tfetchTravelproducts(isSoldout: $isSoldout, search: $search, page: $page) {\n\t\t\t_id\n\t\t\tname\n\t\t\tremarks\n\t\t\tcontents\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery fetchTravelproducts($isSoldout: Boolean, $search: String, $page: Int) {\n\t\tfetchTravelproducts(isSoldout: $isSoldout, search: $search, page: $page) {\n\t\t\t_id\n\t\t\tname\n\t\t\tremarks\n\t\t\tcontents\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery fetchTravelproductQuestions($page: Int, $travelproductId: ID!) {\n\t\tfetchTravelproductQuestions(\n\t\t\tpage: $page\n\t\t\ttravelproductId: $travelproductId\n\t\t) {\n\t\t\t_id\n\t\t\tcontents\n\t\t\tuser {\n\t\t\t\t_id\n\t\t\t\temail\n\t\t\t\tname\n\t\t\t}\n\t\t\tcreatedAt\n\t\t\tupdatedAt\n\t\t\tdeletedAt\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery fetchTravelproductQuestions($page: Int, $travelproductId: ID!) {\n\t\tfetchTravelproductQuestions(\n\t\t\tpage: $page\n\t\t\ttravelproductId: $travelproductId\n\t\t) {\n\t\t\t_id\n\t\t\tcontents\n\t\t\tuser {\n\t\t\t\t_id\n\t\t\t\temail\n\t\t\t\tname\n\t\t\t}\n\t\t\tcreatedAt\n\t\t\tupdatedAt\n\t\t\tdeletedAt\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation updateTravelproductQuestion(\n\t\t$updateTravelproductQuestionInput: UpdateTravelproductQuestionInput!\n\t\t$travelproductQuestionId: ID!\n\t) {\n\t\tupdateTravelproductQuestion(\n\t\t\tupdateTravelproductQuestionInput: $updateTravelproductQuestionInput\n\t\t\ttravelproductQuestionId: $travelproductQuestionId\n\t\t) {\n\t\t\t_id\n\t\t\tcontents\n\t\t\tuser {\n\t\t\t\t_id\n\t\t\t\tname\n\t\t\t\temail\n\t\t\t}\n\t\t\tupdatedAt\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation updateTravelproductQuestion(\n\t\t$updateTravelproductQuestionInput: UpdateTravelproductQuestionInput!\n\t\t$travelproductQuestionId: ID!\n\t) {\n\t\tupdateTravelproductQuestion(\n\t\t\tupdateTravelproductQuestionInput: $updateTravelproductQuestionInput\n\t\t\ttravelproductQuestionId: $travelproductQuestionId\n\t\t) {\n\t\t\t_id\n\t\t\tcontents\n\t\t\tuser {\n\t\t\t\t_id\n\t\t\t\tname\n\t\t\t\temail\n\t\t\t}\n\t\t\tupdatedAt\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery fetchUserLoggedIn {\n\t\tfetchUserLoggedIn {\n\t\t\t_id\n\t\t\temail\n\t\t\tname\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery fetchUserLoggedIn {\n\t\tfetchUserLoggedIn {\n\t\t\t_id\n\t\t\temail\n\t\t\tname\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation createTravelproductQuestion(\n\t\t$createTravelproductQuestionInput: CreateTravelproductQuestionInput!\n\t\t$travelproductId: ID!\n\t) {\n\t\tcreateTravelproductQuestion(\n\t\t\tcreateTravelproductQuestionInput: $createTravelproductQuestionInput\n\t\t\ttravelproductId: $travelproductId\n\t\t) {\n\t\t\t__typename\n\t\t\t_id\n\t\t\tcontents\n\t\t\tuser {\n\t\t\t\t__typename\n\t\t\t\t_id\n\t\t\t\temail\n\t\t\t\tname\n\t\t\t\tcreatedAt\n\t\t\t\tupdatedAt\n\t\t\t}\n\t\t\tcreatedAt\n\t\t\tupdatedAt\n\t\t\tdeletedAt\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation createTravelproductQuestion(\n\t\t$createTravelproductQuestionInput: CreateTravelproductQuestionInput!\n\t\t$travelproductId: ID!\n\t) {\n\t\tcreateTravelproductQuestion(\n\t\t\tcreateTravelproductQuestionInput: $createTravelproductQuestionInput\n\t\t\ttravelproductId: $travelproductId\n\t\t) {\n\t\t\t__typename\n\t\t\t_id\n\t\t\tcontents\n\t\t\tuser {\n\t\t\t\t__typename\n\t\t\t\t_id\n\t\t\t\temail\n\t\t\t\tname\n\t\t\t\tcreatedAt\n\t\t\t\tupdatedAt\n\t\t\t}\n\t\t\tcreatedAt\n\t\t\tupdatedAt\n\t\t\tdeletedAt\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation createUser($createUserInput: CreateUserInput!) {\n\t\tcreateUser(createUserInput: $createUserInput) {\n\t\t\t_id\n\t\t\tcreatedAt\n\t\t\tupdatedAt\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation createUser($createUserInput: CreateUserInput!) {\n\t\tcreateUser(createUserInput: $createUserInput) {\n\t\t\t_id\n\t\t\tcreatedAt\n\t\t\tupdatedAt\n\t\t}\n\t}\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;