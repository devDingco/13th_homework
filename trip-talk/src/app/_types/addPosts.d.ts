interface PostsType {
  username: string;
  userpw: string;
  userTitle: string;
  usercontent: string;
  userAddress?: string;
  userAddressDetail?: string;
  userAddressNum?: string;
  youtubeLink?: string;
  images?: string[];
}

interface RequiredType {
  username?: string | null;
  userpw?: string | null;
  userTitle?: string | null;
  usercontent?: string | null;
  commentContent?: string | null;
  commentUser?: string | null;
  commentPw?: string | null;
}
