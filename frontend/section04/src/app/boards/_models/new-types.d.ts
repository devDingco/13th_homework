// newForm - inputValue
interface IInputValue {
  author: string;
  password: string;
  title: string;
  content: string;
  [key: string]: string;
}

// new - props
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
    | "photo";
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
}

interface IButtonObj {
  cancel: string;
  register: string;
  edit: string;
}

interface GraphQLError {
  graphQLErrors?: { message: string }[];
}
