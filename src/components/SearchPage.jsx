import { MovieApi } from "./MovieApi.js"
import "../stylesheets/SearchBar.css"
import { useState } from "react"

function ElementResults( { results } ) {
    const setDefaultImage= (e) => {
        e.target.src = "../assets/img-load-failed.svg"

    }

    return (
        <>
        <div className="container-results">
            {results.map((result, index) => (
                <div key={index}>
                    <img className="img-search" src={MovieApi.getImage(result.poster_path)} onError={setDefaultImage}></img>
                    <h2>{result.media_type == 'movie' || result.media_type == 'collection' ? result.title :
                                            result.media_type == 'tv' ? result.name : result.name}</h2>
                    <div>⭐{result.vote_average}</div>
                </div>
            ))}
        </div>
        </>
    );

}

function SearchPage() {
    const [results, setResults] = useState([]);
    const [inputValue, setInputValue] = useState('');

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
            
            <div className="results-container">
            <ElementResults results={results} />
            </div>
        </div>

        </>
    )
}


export default SearchPage