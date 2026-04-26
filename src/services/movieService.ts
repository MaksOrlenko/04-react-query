import axios from "axios";
import { type Movie } from "../types/movie";

export interface MoviesResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
  page: number;
}

const ACCESS_TOKEN = import.meta.env.VITE_TMDB_API_KEY;

const movieInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    Accept: "application/json",
  },
});

export const fetchMovies = async (
  query: string,
  page: number = 1
): Promise<MoviesResponse> => {
  const response = await movieInstance.get("/search/movie", {
    params: {
      query,
      page,
      include_adult: false,
      language: "en-US",
    },
  });

  return response.data;
};