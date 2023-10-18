const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_PATH = "https://api.themoviedb.org/3";

export interface ISearch {
  adult: boolean;
  backdrop_path: string;
  id: number;
  // movie - title / tv - name
  title?: string;
  name?: string;
  original_language: string;
  original_title?: string;
  original_name?: string;
  overview: string;
  poster_path: string;
  media_type: "movie" | "tv";
  genre_ids: number[] | [];
  popularity: number;
  // movie - release_date / tv - first_air_date
  release_date?: string;
  first_air_date?: string;
  video?: boolean;
  vote_average: number;
  vote_count: number;
  origin_country?: string[] | []; // tv
  known_for?: ISearch[]; // if searching person
}

/* Movies - Now playing */
/* Movies - Upcoming */
export interface IGetMovieResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: ISearch[];
  total_pages: number;
  total_results: number;
}

export interface ISearchMultiResult {
  page: number;
  results: ISearch[];
  total_pages: number;
  total_results: number;
}

export interface IGetTvTopRated {
  page: number;
  results: ISearch[];
  total_pages: number;
  total_results: number;
}

// Movie - details
interface IGetDetailsGenres {
  id: number;
  name: string;
}

interface IGetDetailProductionCompanies {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

interface IGetDetailProductionCountries {
  iso_3166_1: string;
  name: string;
}

interface IGetDetailSpokenLanguages {
  english_name: string;
  iso_639_1: string;
  name: string;
}

/* Movie - Credits */
interface IGetMovieCreditsCast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id?: number;
  character?: string;
  credit_id: string;
  order?: number;
  department?: string;
  job?: string;
}

/* Movie, TV - Recommendations */
/* Movie, TV - Trending*/
/* Movie - Popular */
/* Movie - Top rated */
/* TV - On The Air */
export interface IGetRecommendAndTrend {
  page: number;
  results: ISearch[] | [];
  total_pages: number;
  total_results: number;
  success?: boolean;
}

/* TV - detail */
interface ITvCreatedBy {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string;
}

interface ITvEpisode {
  air_date: string;
  episode_number: number;
  episode_type: string;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string | null;
  vote_average: number;
  vote_count: number;
}

interface ITvSeasons {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
}

/* Movie, TV - detail */
export interface IItemDetail {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection?: {} | null;
  budget?: number;
  created_by?: ITvCreatedBy[] | [];
  episode_run_time?: number[] | [];
  first_air_date?: string;
  genres: IGetDetailsGenres[];
  homepage: string;
  id: number;
  imdb_id?: string;
  in_production?: boolean;
  languages?: string[] | [];
  last_air_date?: string;
  last_episode_to_air?: ITvEpisode;
  name?: string;
  next_episode_to_air?: ITvEpisode;
  networks?: IGetDetailProductionCompanies[] | [];
  number_of_episodes?: number;
  number_of_seasons?: number;
  origin_country?: string[] | [];
  original_language: string;
  original_name?: string;
  original_title?: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: IGetDetailProductionCompanies[] | [];
  production_countries: IGetDetailProductionCountries[] | [];
  release_date?: string;
  revenue?: number;
  runtime?: number;
  seasons?: ITvSeasons[] | [];
  spoken_languages: IGetDetailSpokenLanguages[] | [];
  status: string;
  tagline: string;
  title?: string;
  type?: string;
  video?: boolean;
  vote_average: number;
  vote_count: number;
  success?: boolean;
}

/* Movie, TV - credit */
export interface IItemCredit {
  cast: IGetMovieCreditsCast[] | [];
  crew?: IGetMovieCreditsCast[] | [];
  id: number;
  success?: boolean;
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

// Get popular movies
export async function getPopularMovies() {
  return await (
    await fetch(
      `${BASE_PATH}/movie/popular?language=ko-KR&page=1&region=KR`,
      options
    )
  ).json();
}

// Get trending movies
export async function getTrendingMovies() {
  return await (
    await fetch(`${BASE_PATH}/trending/movie/day?language=ko-KR`, options)
  ).json();
}

// Get top rated movies
export async function getTopRatedMovies() {
  return await (
    await fetch(
      `${BASE_PATH}/movie/top_rated?language=ko-KR&page=1&region=KR`,
      options
    )
  ).json();
}

// Get upcoming movies
export async function getUpcomingMovies() {
  return await (
    await fetch(
      `${BASE_PATH}/movie/upcoming?language=ko-KR&page=1&region=KR`,
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
// Get trending TV (TV shows main page)
export async function getTrendingTv() {
  return await (
    await fetch(`${BASE_PATH}/trending/tv/day?language=ko-KR`, options)
  ).json();
}

// Get top rated TV
export async function getTopRatedTv() {
  return await (
    await fetch(`${BASE_PATH}/tv/top_rated?language=ko-KR&page=1`, options)
  ).json();
}

// Get on the air TV
export async function getOnTheAirTv() {
  return await (
    await fetch(`${BASE_PATH}/tv/on_the_air?language=ko-KR&page=1`, options)
  ).json();
}

/* Details */
// Get details
export async function getItemDetail(mediaType: "movie" | "tv", itemId: number) {
  return await (
    await fetch(`${BASE_PATH}/${mediaType}/${itemId}?language=ko-KR`, options)
  ).json();
}

// Get credits
export async function getItemCredit(mediaType: "movie" | "tv", itemId: number) {
  return await (
    await fetch(
      `${BASE_PATH}/${mediaType}/${itemId}/credits?language=ko-KR`,
      options
    )
  ).json();
}

// Get recommendations
export async function getItemRecommendation(
  mediaType: "movie" | "tv",
  itemId: number
) {
  return await (
    await fetch(
      `${BASE_PATH}/${mediaType}/${itemId}/recommendations?language=ko-KR&page=1`,
      options
    )
  ).json();
}

// if TV, get episode of seasons
export interface IGetTvEpisode {
  _id: string;
  air_date: string;
  episodes: ITvEpisode[] | [];
  name: string;
  overview: string;
  id: number;
  poster_path: string;
  season_number: number;
  vote_average: number;
  success?: boolean;
}

export async function getTvEpisode(tvId: number, seasonNumber: number) {
  return await (
    await fetch(
      `${BASE_PATH}/tv/${tvId}/season/${seasonNumber}?language=ko-KR`,
      options
    )
  ).json();
}

/* Video */
interface IVideoResults {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

export interface IGetVideo {
  id: number;
  results: IVideoResults[] | [];
  success?: boolean;
}

// Get video URL of item
export async function getVideo(itemId: number, mediaType: "movie" | "tv") {
  return await (
    await fetch(
      `${BASE_PATH}/${mediaType}/${itemId}/videos?language=ko-KR`,
      options
    )
  ).json();
}
