export interface IUseModalType {
  type:
    | "commentDeletePasswordCheck"
    | "commentNewSubmit"
    | "commentEditSubmit"
    | "deleteCommentSuccess"
    | "commentEditPasswordRequired"
    | "commentEditPasswordError"
    | "boardEditSubmit"
    | "boardEditPasswordError"
    | "ErrorUnknown"
    | "boardNewRequired"
    | "boardNewSubmit"
    | "productQuestionEdit";
}

export type IModalTypeAndContents = {
  [key in IUseModalType["type"]]: {
    contents: string | JSX.Element;
    icon: JSX.Element;
    customFooter?: boolean;
  };
};
