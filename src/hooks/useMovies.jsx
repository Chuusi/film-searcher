import { useCallback, useRef, useState } from 'react';
//import withResult from '../mock/withResult.response.json'
//import withoutResult from '../mock/withoutResult.response.json'
import { fetchMovies } from '../service/movie.service';


export function useMovies ({search}) {
    const [responseMovies, setResponseMovies] = useState([]);
    const lastSearch = useRef(search);
    const [loading, setLoading] = useState(false)


    
    const getMovies = useCallback(async({search}) => {
        if (lastSearch.current == search) return
        lastSearch.current = search;
        setLoading(true)
        const newMovies = await fetchMovies({search});
        setResponseMovies(newMovies)
        setLoading(false)
    },[])

    return {movies: responseMovies, getMovies, loading}
}



