interface IProps {
  id: "contents";
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  errorMessage: "visible" | "hidden";
}

export type { IProps };
