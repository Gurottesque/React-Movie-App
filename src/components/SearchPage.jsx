import { MovieApi } from "./MovieApi.js"
import "../stylesheets/SearchBar.css"
import { useState } from "react"

function ElementResults( { title, rate, entityType, imgPath } ) {
    
    return (
        <>
            <div className="element-title">{title}</div>
            <div className="element-rate">{rate}</div>
            <div className="entityType">{entityType}</div>
            <img className="img-result" src={ MovieApi.getImage(imgPath) }></img>
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
            
        </div>

        <div className="search-page-results">
            {results.map( r =>{
                <ElementResults 
            }
            )}
        </div>
        </>
    );
}


export default SearchPage