import { useState, useEffect } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchMovies } from "../../services/movieService";
import { type Movie } from "../../types/movie";
import { type MoviesResponse } from "../../services/movieService";

import toast, { Toaster } from "react-hot-toast";

import css from'./App.module.css'
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import Pagination from "../Pagination/Pagination";


export default function App() {
 const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { data, isLoading, isError, isSuccess } = useQuery<MoviesResponse>({
    queryKey: ["movies", searchQuery, page],
    queryFn: () => fetchMovies(searchQuery, page),
    enabled: searchQuery !== "",
    placeholderData: keepPreviousData,
    retry: 1,
  });

 useEffect(() => {
   if (isSuccess && data?.results.length === 0 && searchQuery !== "") {
     toast.error("No movies found for your request.");
   }
 }, [data, searchQuery, isSuccess]);

  const handleSearch = (query: string) => {
    if (query.trim() === "") {
      toast.error("Please enter a search term");
      return;
    }
    setSearchQuery(query);
    setPage(1);
  };

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  const totalPages = data?.total_pages || 0;
  const movies = data?.results || [];

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />

      {isError && <ErrorMessage />}

      {isLoading && <Loader />}

      {isSuccess && (
        <>
          {movies.length > 0 && (
            <MovieGrid movies={movies} onSelect={handleSelectMovie} />
          )}

          {totalPages > 1 && (
            <Pagination
              pageCount={totalPages > 500 ? 500 : totalPages}
              forcePage={page}
              onPageChange={(nextPage: number) => setPage(nextPage)}
            />
          )}
        </>
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}

      <Toaster position="top-center" />
    </div>
  );
}