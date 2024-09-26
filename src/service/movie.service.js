import withoutResult from "../mock/withoutResult.response.json";

const API_KEY = "";
const API_FILM_URL = `http://www.omdbapi.com/?apikey=${API_KEY}&s=`;

export function fetchMovies({ search }) {
    if (search === "") return null;
    if (search) {
        return fetch(API_FILM_URL + search)
            .then((res) => res.json())
            .then((json) => {
                const movies = json.Search;
                const mappedMovies = movies?.map((movie) => ({
                    id: movie.imdbID,
                    title: movie.Title,
                    year: movie.Year,
                    poster: movie.Poster,
                }));
                return mappedMovies;
            });
    } else {
        return withoutResult;
    }
}
