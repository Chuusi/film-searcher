/* eslint-disable react/prop-types */
function ListOfMovies ({movies}) {
    return (
        <ul className="movies">
            {movies.map(movie => (
                <li key={movie.id} className="film-card">
                    <h3>{movie.title}</h3>
                    <p>{movie.year}</p>
                    <img src={movie.poster} alt={"Poster from " + movie.title} />
                </li>
            ))}
        </ul>
    )
}

function NoMoviesResults () {
    return (
        <p>No se encontraron películas</p>
    )
}

export function Movies ({ movies }) {

    const hasMovies = movies?.length > 0;

    return (
        hasMovies
        ? <ListOfMovies movies={movies}/>
        : <NoMoviesResults />
    )
}