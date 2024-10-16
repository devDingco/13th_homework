export interface Movie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string;
}

export interface MovieData {
  results: Movie[];
  page: number;
  total_pages: number;
}
