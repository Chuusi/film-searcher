import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css'
import { Movies } from './components/movies';
import { useMovies } from './hooks/useMovies';
import debounce from 'just-debounce-it';



function useSearch () {
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const isFirstSearch = useRef(true);
  
  useEffect(() => {

    if(isFirstSearch.current){
      isFirstSearch.current = search === "";
      return
    }

    if(search === ""){
      setError("No se puede buscar una cadena vacía")
      return
    }

    if (search === '') {
      setError('No se puede buscar una película vacía')
      return
    }

    if (search.match(/^\d+$/)) {
      setError('No se puede buscar una película con un número')
      return
    }

    if (search.length < 3) {
      setError('La búsqueda debe tener al menos 3 caracteres')
      return
    }

    setError(null)
  
  },[search])

  return {search, setSearch, error}
}

function App() {
  
  const {search, setSearch, error} = useSearch();
  const {movies, getMovies, loading} = useMovies({search});
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((search) => {
      console.log(search);
      getMovies({search})
    },500)
  ,[])

  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies()

    //En caso de haber más de un input
    //! const fields = Object.fromEntries(new Window.FormData(event.target))
    /* const data = new window.FormData(event.target);
    const textQuery = data.get('query') */
  }

  const handleChange = (event) => {
    const newSearch = event.target.value;
    if(newSearch.startsWith(' ')) return
    setSearch(newSearch);
    debouncedSearch(newSearch)
  }
  
  return (
    <>
      <main>
        <h1>Film searcher</h1>
        <form className='film-form' onSubmit={handleSubmit}>
          <input onChange={handleChange} value={search} name="query" placeholder="Vaiana, Frozen..." type="text" />
          <button type='submit'>Buscar</button>
        </form>
        {error && <p>{error}</p>}
        {loading ? "CARGANDO..." : <Movies movies={movies}/>}
      </main>
    </>
  )
}

export default App
