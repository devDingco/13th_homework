interface Book {
  title?: string;
  author?: string;
  rating?: number;
  plot?: string;
  review?: string;
}

export interface IBooksWriteProps {
  isEdit: boolean;
  data?: Book;
  bookId?: string;
}
