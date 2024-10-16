"use client";
import { useState, useEffect } from "react";
import MovieItem from "@/components/openapis-list/openapis-item";
import { Pagination } from "antd";
import { MovieData } from "@/components/openapis-list/types";

export default function MovieList() {
  const [moviePage, setMoviePage] = useState<number>(1);
  const [movieData, setMovieData] = useState<MovieData | null>(null);
  const imageDateLoad = async (moviePage: number) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/trending/movie/day?language=ko-KR&page=${moviePage}`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
        },
      }
    );
    const data = await res.json();
    setMovieData(data);
    console.log(data);
  };

  useEffect(() => {
    imageDateLoad(moviePage);
  }, [moviePage]);

  return (
    <>
      <div className="grid grid-cols-4 gap-8">
        {movieData?.results.map((movie) => (
          <MovieItem key={movie.id} movie={movie} />
        ))}
      </div>
      <Pagination
        defaultCurrent={movieData?.page}
        total={movieData?.total_pages}
        defaultPageSize={20}
        align="center"
        showSizeChanger={false}
        onChange={(page) => {
          setMoviePage(page);
        }}
      />
    </>
  );
}
