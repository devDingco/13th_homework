import { Card } from "antd";
import Image from "next/image";
import styles from "@/components/openapis-list/openapis-item/styles.module.scss";
import { Movie } from "@/components/openapis-list/types";
import Link from "next/link";
const { Meta } = Card;

export default function MovieItem(props: { movie: Movie }) {
  const { movie } = props;

  return (
    <Link href={`https://www.themoviedb.org/movie/${movie.id}`} target="_blank">
      <Card
        id={styles.movieItem}
        hoverable
        style={{ width: 300 }}
        cover={
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width="500"
            height="750"
            style={{ width: "100%", height: "auto", objectFit: "cover" }}
          />
        }
      >
        <Meta
          title={movie.title}
          description={
            movie.overview === "" ? "상세정보가 없습니다." : movie.overview
          }
        />
      </Card>
    </Link>
  );
}
