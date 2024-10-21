export interface ReactQuillBoxProps {
  id?: string;
  title?: React.ReactNode;
  name?: string;
  onChange?: (value: string) => void;
  readonly?: boolean;
  placeholder?: string;
  errormessage?: string;
  defaultValue?: string;
}
