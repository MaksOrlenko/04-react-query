import axios from "axios";
import { type Movie } from "../types/movie";

export interface MoviesResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
  page: number;
}

const ACCESS_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const movieInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    Accept: "application/json",
  },
});

export const fetchMovies = async (
  query: string,
  page: number = 1,
): Promise<MoviesResponse> => {
  const response = await movieInstance.get<MoviesResponse>("/search/movie", {
    params: {
      query: query,
      include_adult: false,
      language: "en-US",
      page: page,
    },
  });
  return response.data;
};