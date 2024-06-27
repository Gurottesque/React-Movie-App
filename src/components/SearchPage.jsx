import { MovieApi } from "./MovieApi.js"
import "../stylesheets/SearchBar.css"
import { useEffect, useState } from "react"

function ElementResults({ results }) {
    return (
        <div className="container-results">
            {results.map((result) => (
                <div key={result.id}>
                    <img className="img-search" src={MovieApi.getImage(result.poster_path)} alt={result.title || result.name}></img>
                    <h2>{result.media_type === 'movie' || result.media_type === 'collection' ? result.title : result.name}</h2>
                    <div>⭐{result.vote_average}</div>
                </div>
            ))}
        </div>
    );
}

function Genre({ name, onClickHandler }) {
    return (
        <button onClick={onClickHandler}>{name}</button>
    )
}

function SearchPage() {
    const [results, setResults] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [genresFilter, setGenresFilter] = useState([]);
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        async function fetchGenres() {
            const genres = await MovieApi.getGenres();
            setGenres(genres);
        }
        fetchGenres();
    }, []);

    useEffect(() => {
        handleSearch(inputValue);
    }, [genresFilter]);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch(inputValue);
        }
    };

    const handleSearch = async (queryString) => {
        if (genresFilter.length === 0) {
            const results = await MovieApi.searchAPI('search/multi', { query: queryString });
            setResults(results);
        } else {
            const results = await MovieApi.searchAPI('discover/movie', { with_genres: genresFilter.join(',') });
            setResults(results);
        }
    };

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const filterSearch = (genreId) => {
        setGenresFilter(prev => 
            prev.includes(genreId) ? prev.filter(id => id !== genreId) : [...prev, genreId]
        );
    };

    return (
        <>
            <div className='search-bar'>
                <button className="select-showtypes">
                </button>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Buscar..."
                />
            </div>
            <div className="results-container">
                <ElementResults results={results} />
            </div>
            <div className="filters">
                {genres.map((genre) => (
                    <Genre key={genre.id} name={genre.name} onClickHandler={() => filterSearch(genre.id)} />
                ))}
            </div>
        </>
    );
}

export default SearchPage;