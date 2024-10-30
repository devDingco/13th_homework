export interface ItagInputProps {
  title: string;
  required?: boolean;
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  tags: string[];
}
