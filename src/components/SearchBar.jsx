import { MovieApi } from "./MovieApi.js"
import "../stylesheets/SearchBar.css"
import { useState } from "react"

function SearchBarPage({ title, imgPath }) {
    return (
        <>
            <div className="search-bar-result">
                <img className="img-result" src={ MovieApi.getImage(imgPath) }></img>
                <div className="title">{title}</div>
            </div>
            <div className="separator"></div>
        </>
    )
}

function SearchBar() {
    const [results, setResults] = useState([]);

    const saveInput = async (event) => {
        const inputValue = event.target.value;
        const results = await MovieApi.getData('/search/multi', '', {query: inputValue});
        const resultsFiltered = results.results.slice(0,5);
        setResults(resultsFiltered);
    };

    return (
        <div className='search-bar'>
            <button className="select-showtypes">

            </button>
            <input type="text" placeholder="Buscar en IMDb" onChange={saveInput}></input>
            <div className='results-searchbar'>

                {results.map(r => 
                    
                    <SearchBarPage name={r.name} 
                                     title={r.media_type == 'movie' || r.media_type == 'collection' ? r.title :
                                            r.media_type == 'tv' ? r.name : r.name}
                                     key={r.id}
                                     imgPath={r.media_type == 'person' ? r.profile_path : r.poster_path }/>
                )}

            </div>
        </div>
    );
};

export default SearchBar