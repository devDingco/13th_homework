export interface ImageStore {
  imageMap: { [key: string]: string };
  setImage: (id: string, url: string) => void;
}
