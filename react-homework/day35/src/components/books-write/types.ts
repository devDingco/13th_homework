import { DocumentData } from "firebase/firestore";

interface Book {
  title?: string;
  author?: string;
  rating?: number;
  plot?: string;
  review?: string;
}

export interface IBooksWriteProps {
  isEdit: boolean;
  data?: DocumentData | null;
  bookId?: string;
}
