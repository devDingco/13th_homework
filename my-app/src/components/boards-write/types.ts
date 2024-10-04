interface IBoardsWriteProps {
  isEdit: boolean;
  isActive?: boolean;
  data?: any;
}

interface IInput {
  writer: string;
  password: string;
  title: string;
  contents: string;
}

interface IupdateVariables {
  title?: string;
  contents?: string;
}

export type { IBoardsWriteProps, IInput, IupdateVariables };
