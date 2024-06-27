import { MovieApi } from "./MovieApi.js"
import "../stylesheets/SearchBar.css"
import { useEffect, useState } from "react"

const genres = await MovieApi.getGenres();

function ElementResults( { results } ) {
    return (
        <>
        <div className="container-results">
            {results.map((result, index) => (
                <div key={index}>
                    <img className="img-search" src={MovieApi.getImage(result.poster_path)}></img>
                    <h2>{result.media_type == 'movie' || result.media_type == 'collection' ? result.title :
                                            result.media_type == 'tv' ? result.name : result.name}</h2>
                    <div>⭐{result.vote_average}</div>
                </div>
            ))}
        </div>
        </>
    );

}

function Genre( { name, onClickHandler }){
    return (
        <button onClick={onClickHandler}>{name}
        </button>
    )
}

function SearchPage() {
    const [results, setResults] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [genresFilter, setGenresFilter] = useState([]);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch(inputValue);
        }
    };

    const handleSearch = async (value) => {
        const results = await MovieApi.searchByKeyword(value);
        setResults(results);
    };

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const filterSearch = (genreId) => {
        if (genresFilter.includes(genreId)) {
            const tempGenres = genresFilter.filter(id => id !== genreId);
            setGenresFilter(tempGenres);
        } else {
            const tempGenres = [...genresFilter, genreId];
            setGenresFilter(tempGenres);
        }
    };

    useEffect(() => {
        const filteredResults = results.filter(show => {
            show.genre_ids.some(genre => { genresFilter.includes(genre.id)})}
        );
        setResults(filteredResults);
    }, [genresFilter]);

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
                <Genre key={genre.id} name={genre.name} onClickHandler={() => filterSearch(genre.id)}/>
            ))}
            
        </div>

        </>
    )
}


export default SearchPage