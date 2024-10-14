import { TRecord } from "../types/components.type";

export const PLACEHOLDERS: TRecord = {
  writer: "작성자 명을 입력해 주세요.",
  password: "비밀번호를 입력해 주세요.",
  comment: "댓글을 입력해 주세요.",
  title: "제목을 입력해 주세요.",
  contents: "내용을 입력해 주세요.",
  zip_code: "01234",
  address: "주소를 입력해 주세요.",
  detail_address: "상세주소",
  url: "링크를 입력해 주세요.",
};

export const INPUT_CHILDREN: TRecord = {
  writer: "작성자",
  password: "비밀번호",
  title: "제목",
  zip_code: "주소",
  url: "유튜브 링크",
};

export const BUTTON: TRecord = {
  commit_submit: "댓글 등록",
  zip_code_search: "우편번호 검색",
  cancel: "취소",
  submit: "등록하기",
  list: "목록으로",
  edit: "수정하기",
  confirm: "확인",
};

export const BOARDS_WRITE: TRecord = {
  REQUIRED_FIELDS: "필수입력 사항 입니다",
};

export const COMMENT_FORM: TRecord = {
  NO_COMMENTS: "등록된 댓글이 없습니다.",
};
