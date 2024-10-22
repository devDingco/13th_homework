import Image from "next/image";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { formDate } from "@/utils/date";

export default function MovieList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_API_KEY}`,
    },
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
          options
        );
        const data = await response.json();
        console.log(data);
        setMovies(data.results);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className={styles.movie_list_body}>
      <div className={styles.header}>영화순위</div>
      <ul className={styles.movie_list_box}>
        {movies.map((movie, index) => (
          <li key={movie.id} className={styles.movie_item}>
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className={styles.movie_image}
              width={250}
              height={375}
              priority
            />
            <div>
              <div className={styles.movie_title}>
                {index + 1}. {movie.title}
              </div>
              <div className={styles.movie_release_date}>
                개봉일 {formDate(movie.release_date)}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
