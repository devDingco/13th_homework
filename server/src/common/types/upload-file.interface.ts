export interface uploadFile extends Express.Multer.File {
    location: string;
}
