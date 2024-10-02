export interface InputFormTextProps {
  title:
    | "author"
    | "password"
    | "title"
    | "content"
    | "address"
    | "youtube"
    | "photo";
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}
