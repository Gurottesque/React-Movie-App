import { MovieApi } from "./MovieApi.js"
import "../stylesheets/SearchBar.css"
import { useState } from "react"

function ElementResults( { title, rate, entityType, imgPath } ) {

    console.log(title)
    
    return (
        <>
            <div>{title}</div>
            <div>{rate}</div>
            <div>{entityType}</div>
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
                <ElementResults name={r.name} 
                title={r.media_type == 'movie' || r.media_type == 'collection' ? r.title :
                       r.media_type == 'tv' ? r.name : r.name}
                key={r.id}
                imgPath={r.media_type == 'person' ? r.profile_path : r.poster_path }/>}
            )}
        </div>
        </>
    );
}


export default SearchPage