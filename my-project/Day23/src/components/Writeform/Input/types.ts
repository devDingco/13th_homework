interface IProps {
  id: "writer" | "password" | "title";
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  type?: string;
  errorMessage: "visible" | "hidden";
}

export type { IProps };
