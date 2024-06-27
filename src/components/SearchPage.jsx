import { MovieApi } from "./MovieApi.js"
import "../stylesheets/SearchBar.css"
import { useState } from "react"

const movies = await MovieApi.getUpcomingMovies()


function SearchResults( { title, image_path } ) {
    return (
        <>
            <div className="search-bar-result">
                <img className="img-result" src={ MovieApi.getImage(image_path) }></img>
                <div className="title">{title}</div>
            </div>
            <div className="separator"></div>
        </>

    )

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
        const results = await MovieApi.searchByKeyword(inputValue);
        setResults(results);
    };

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    return (
        <div className='search-bar'>
            <button className="select-showtypes">
            </button>
            <input
                type="text"
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="Ingresa tu búsqueda..."
            />
                {results.map(r => 
                    
                    <SearchResults name={r.name} 
                                     title={r.media_type == 'movie' || r.media_type == 'collection' ? r.title :
                                            r.media_type == 'tv' ? r.name : r.name}
                                     key={r.id}
                                     image_path={r.media_type == 'person' ? r.profile_path : r.poster_path }/>
                )}
        </div>
    );
}


export default SearchPage