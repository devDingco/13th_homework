export interface IformList {
  writerContents?: string;
  productContents?: string;
}

export interface ReactQuillBoxProps {
  id: string;
  title?: React.ReactNode;
  name?: string;
  onChange: (value: string) => void;
  readonly?: boolean;
  placeholder?: string;
  defaultValue?: string;
}
