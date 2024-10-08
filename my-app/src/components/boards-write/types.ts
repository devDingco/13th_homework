import {
  CreateBoardMutation,
  FetchBoardQuery,
} from "@/commons/graphql/graphql";

export interface IBoardsWriteProps {
  isEdit: boolean;
  // 이렇게 하는게 맞겠져?
  data?: CreateBoardMutation | FetchBoardQuery; // 두 가지 타입 모두 허용
  styles: Record<string, string>;
}
