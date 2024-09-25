interface PostsType {
  username: string;
  userpw: string;
  userTitle: string;
  usercontent: string;
  userAdress?: string | null;
  userAdressDetail?: string | null;
  userAdressNum?: string | null;
  youtubeLink?: string | null;
}

interface RequiredType {
  username: string | null;
  userpw: string | null;
  userTitle: string | null;
  usercontent: string | null;
}
