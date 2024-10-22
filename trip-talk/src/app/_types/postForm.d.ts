interface PostFormType {
  type: 'ADD' | 'EDIT';
  contents?: string;
  title?: string;
  writer?: string;
  youtubeUrl?: string;
  boardAddress?: {
    address: string;
    addressDetail: string;
    createdAt: Date;
    updatedAt: Date;
    zipcode: string;
    __typename: string;
  };
  images?: string[];
}
