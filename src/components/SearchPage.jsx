import { MovieApi } from "./MovieApi.js"
import "../stylesheets/SearchBar.css"
import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
function ElementResults({ results, isFilterActive }) {


    return (
        <div className="container-results">
            {results.map((result) => (

                <Link to={`/details/${result.media_type || 'movie'}/${result.id}`} >
                    <div key={result.id}>
                        <img className="img-search" src={MovieApi.getImage(result.poster_path)} alt={result.title || result.name}></img>
                        {isFilterActive ?  <h2>{result.title}</h2>
                                        : <h2>{result.media_type === 'movie' || result.media_type === 'collection' ? result.title : result.name}</h2> }
                        <div>⭐{result.vote_average}</div>
                    </div>
                </Link>

            ))}
        </div>
    );

}

function Genre({ name, onClickHandler }) {

    const [isSelected, setisSelected] = useState(false)
    return (
        <button style={{backgroundColor: isSelected ? 'green' : 'black' }}onClick={() => {onClickHandler(); setisSelected(!isSelected)}}>{name}</button>
    )
}

const useSearch = (initialQuery) => {
    const [results, setResults] = useState([]);
    const [inputValue, setInputValue] = useState(initialQuery);
    const [genresFilter, setGenresFilter] = useState([]);
    const [isFilterActive, setIsFilterActive] = useState(false);

    const handleSearch = async (queryString) => {
        if (genresFilter.length === 0) {
            const results = await MovieApi.searchAPI('search/multi', { query: queryString });
            setResults(results);
        } else {
            const results = await MovieApi.searchAPI('discover/movie', { with_genres: genresFilter.join(',') });
            setResults(results);
        }
    };

    useEffect(() => {
        handleSearch(inputValue);
    }, [genresFilter, initialQuery]);

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch(inputValue);
        }
    };

    const filterSearch = (genreId) => {
        setGenresFilter(prev => 
            prev.includes(genreId) ? prev.filter(id => id !== genreId) : [...prev, genreId]
        );
        setIsFilterActive(true);
    };

    return {
        results,
        inputValue,
        handleChange,
        handleKeyDown,
        filterSearch,
        isFilterActive
    };
};


const useGenres = () => {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        async function fetchGenres() {
            const genres = await MovieApi.getGenres();
            setGenres(genres);
        }
        fetchGenres();
    }, []);

    return genres;
};


function SearchPage() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query');

    const {
        results,
        inputValue,
        handleChange,
        handleKeyDown,
        filterSearch,
        isFilterActive
    } = useSearch(query);

    const genres = useGenres();

    return (
        <>
            <div className='search-bar busquedaSec'>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Buscar..."
                />
            </div>
            <div className="results-container">
                <ElementResults results={results} isFilterActive={isFilterActive}/>
            </div>
            <div className="filters">
                {genres.map((genre) => (
                    <Genre key={genre.id} name={genre.name} onClickHandler={() => filterSearch(genre.id)}  />
                ))}
            </div>
        </>
    );
}


export default SearchPage;