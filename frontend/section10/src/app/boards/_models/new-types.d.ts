// newForm - inputValue
// interface IInputValue {
//   author: string;
//   password: string;
//   title: string;
//   content: string;
//   [key: string]: string;
// }
interface IInputValue {
  author: string | null | undefined;
  password: string;
  title: string | undefined;
  content: string | undefined;
}

// new - props
interface INewFormProps {
  isEdit?: boolean;
}
interface IButtonProps {
  value: "cancel" | "register" | "edit";
  disabled?: boolean;
  onClick?: () => void;
}

interface IInputFormTextProps {
  title:
    | "author"
    | "password"
    | "title"
    | "content"
    | "addressNum"
    | "addressInput"
    | "addressDetail"
    | "youtube"
    | "photo"
    | "comment";
  value?: string;
  disabled?: boolean;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

// new - objects
interface IPlaceholderObj {
  author: string;
  password: string;
  title: string;
  content: string;
  addressNum: string;
  addressInput: string;
  addressDetail: string;
  youtube: string;
  photo: string;
  comment: string;
}

interface IButtonObj {
  cancel: string;
  register: string;
  edit: string;
}

interface GraphQLError {
  graphQLErrors?: { message: string }[];
}
