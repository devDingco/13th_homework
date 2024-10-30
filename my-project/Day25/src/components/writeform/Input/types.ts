interface IProps {
  id: "writer" | "password" | "title";
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  type?: string;
  errorMessage: "visible" | "hidden";
  value?: string;
}

export type { IProps };
