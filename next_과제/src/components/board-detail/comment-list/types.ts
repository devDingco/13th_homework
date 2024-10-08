export interface IcommentItemBox {
  starCountBox?: boolean;
  reply?: boolean;
  user: {
    img: string;
    name: string;
  };
  starCount?: number;
}
