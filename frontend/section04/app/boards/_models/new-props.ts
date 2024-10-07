export interface IButtonProps {
  value: string;
  disabled?: boolean;
}

export interface IInputFormTextProps {
  title:
    | "author"
    | "password"
    | "title"
    | "content"
    | "address"
    | "youtube"
    | "photo";
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}
