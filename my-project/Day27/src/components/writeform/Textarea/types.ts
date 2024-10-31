interface IProps {
  id: "contents";
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  errorMessage: "visible" | "hidden";
  defaultValue?: string;
}

export type { IProps };
