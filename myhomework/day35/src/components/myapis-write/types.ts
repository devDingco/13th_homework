export interface IMyApisWrite {
  id: string;
  writer: string;
  contents: string;
  title: string;
}

export interface IMyApisWriteProps {
  isEdit: boolean;
}
