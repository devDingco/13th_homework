interface IButtonProps {
  value: "cancel" | "register";
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
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}
