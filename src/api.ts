const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_PATH = "https://api.themoviedb.org/3";

interface IMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
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
  media_type: string;
  genre_ids: number[] | [];
  popularity: number;
  // movie - release_date / tv - first_air_date
  release_date?: string;
  first_air_date?: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  origin_country?: string[] | []; // tv
  known_for?: ISearch[]; // if Person
}

export interface ISearchMultiResult {
  page: number;
  results: ISearch[];
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

// Get movies now playing
export async function getMovies() {
  return await (
    await fetch(
      `${BASE_PATH}/movie/now_playing?language=ko-KR&page=1&region=KR`,
      options
    )
  ).json();
}

// Multi search (movies, TV shows, people, etc.)
export async function searchMulti(keyword: string) {
  return await (
    await fetch(
      `${BASE_PATH}/search/multi?query=${keyword}&include_adult=false&language=ko-KR&page=1`,
      options
    )
  ).json();
}
