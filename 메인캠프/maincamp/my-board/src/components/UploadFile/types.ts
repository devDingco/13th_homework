export interface IUploadImage {
  imageUrls: string[];
  onUpdateImageUrls: (updatedUrls: string[]) => void;
}
