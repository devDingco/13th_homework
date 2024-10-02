interface PostFormType {
  type: 'ADD' | 'EDIT';
  contents?: string;
  title?: string;
  writer?: string;
}
