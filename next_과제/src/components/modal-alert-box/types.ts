export type IModalTypeAndContents<T extends string> = {
  [key in T]: {
    contents: string | JSX.Element;
    icon: JSX.Element;
    customFooter?: boolean;
  };
};

export type IModalTypeName =
  | "login_confirm"
  | "login_check_stay"
  | "delete_password_check"
  | "success"
  | "error"
  | "required"
  | "delete_check";
