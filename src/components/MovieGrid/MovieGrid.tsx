import css from "./MovieGrid.module.css";
import { type Movie } from "../../types/movie";

interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

const DEFAULT_IMG =
  "https://dl-preview.csdnimg.cn/71105938/0004-8c5b530ef00c98f99e31917f6f59df5e_preview-wide.png";

export default function MovieGrid({ movies, onSelect }: MovieGridProps) {
  return (
    <ul className={css.grid}>
      {movies.map((movie) => (
        <li key={movie.id} className={css.item}>
          <div
            className={css.card}
            onClick={() => onSelect(movie)}
            role="button"
            tabIndex={0}
          >
            <img
              className={css.image}
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : DEFAULT_IMG
              }
              alt={movie.title}
              loading="lazy"
            />
            <div className={css.content}>
              <h2 className={css.title}>{movie.title}</h2>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}