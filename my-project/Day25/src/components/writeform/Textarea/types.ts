interface IProps {
  id: "contents";
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  errorMessage: "visible" | "hidden";
  value?: string;
}

export type { IProps };
