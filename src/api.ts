const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_PATH = "https://api.themoviedb.org/3";

interface IMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[] | [];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface IGetMovieResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export interface ISearch {
  adult: boolean;
  backdrop_path: string;
  id: number;
  // movie - title / tv - name
  title?: string;
  name?: string;
  original_title?: string;
  original_name?: string;
  original_language: string;
  overview: string;
  poster_path: string;
  media_type?: string;
  genre_ids: number[] | [];
  popularity: number;
  // movie - release_date / tv - first_air_date
  release_date?: string;
  first_air_date?: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  origin_country?: string[] | []; // tv
  known_for?: ISearch[]; // if searching person
}

export interface ISearchMultiResult {
  page: number;
  results: ISearch[];
  total_pages: number;
  total_results: number;
}

interface ITvShow {
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[] | [];
  id: number;
  name: string;
  origin_country: string[] | [];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

export interface IGetTvShows {
  page: number;
  results: ITvShow[];
  total_pages: number;
  total_results: number;
}

// Get Movie's details
interface IGetMovieDetailsGenres {
  id: number;
  name: string;
}

interface IGetMovieDetailProductionCompanies {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

interface IGetMovieDetailProductionCountries {
  iso_3166_1: string;
  name: string;
}

interface IGetMovieDetailSpokenLanguages {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface IGetMovieDetails {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: {} | null;
  budget: number;
  genres: IGetMovieDetailsGenres[] | [];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: IGetMovieDetailProductionCompanies[] | [];
  production_countries: IGetMovieDetailProductionCountries[] | [];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: IGetMovieDetailSpokenLanguages[] | [];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

/* Movie's Credits */
interface IGetMovieCreditsCast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface IGetMovieCredits {
  id: number;
  cast: IGetMovieCreditsCast[] | [];
}

/* Movie's Recommendations */
export interface IGetMovieRecommendations {
  page: number;
  results: ISearch[] | [];
  total_pages: number;
  total_results: number;
}

// API options
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

/* Movies */
// Get movies Now playing
export async function getMovies() {
  return await (
    await fetch(
      `${BASE_PATH}/movie/now_playing?language=ko-KR&page=1&region=KR`,
      options
    )
  ).json();
}

// Get movie's details
export async function getMovieDetail(movieId: number) {
  return await (
    await fetch(`${BASE_PATH}/movie/${movieId}?language=ko-KR`, options)
  ).json();
}

// Get movie's credits
export async function getMovieCredit(movieId: number) {
  return await (
    await fetch(`${BASE_PATH}/movie/${movieId}/credits?language=ko-KR`, options)
  ).json();
}

// Get movie's recommendations
export async function getMovieRecommendation(movieId: number) {
  return await (
    await fetch(
      `${BASE_PATH}/movie/${movieId}/recommendations?language=ko-KR&page=1`,
      options
    )
  ).json();
}

/* Search */
// Multi search (movies, TV shows, people, etc.)
export async function searchMulti(keyword: string) {
  return await (
    await fetch(
      `${BASE_PATH}/search/multi?query=${keyword}&include_adult=false&language=ko-KR&page=1`,
      options
    )
  ).json();
}

/* TV Shows */
// TV shows : Top Rated (TV shows main page)
export async function getTvShowsTopRated() {
  return await (
    await fetch(`${BASE_PATH}/tv/top_rated?language=ko-KR&page=1`, options)
  ).json();
}
