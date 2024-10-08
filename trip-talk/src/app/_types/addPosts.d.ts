interface PostsType {
  username: string;
  userpw: string;
  userTitle: string;
  usercontent: string;
  userAdress?: string;
  userAdressDetail?: string;
  userAdressNum?: string;
  youtubeLink?: string;
}

interface RequiredType {
  username: string | null;
  userpw: string | null;
  userTitle: string | null;
  usercontent: string | null;
  // commentContent: string | null;
}
