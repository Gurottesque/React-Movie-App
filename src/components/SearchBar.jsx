
import { MovieApi } from "./MovieApi.js"
import "../stylesheets/SearchBar.css"
import { useEffect, useState } from "react"
import { Link, Route } from "react-router-dom"

function SearchBarPage({ title, element_id, imgPath}) {

    return (
        <>

            <Link to={`/details/${element_id}`} className="link-to-details">
                <div className="search-bar-result">
                    <img className="img-result" src={ MovieApi.getImage(imgPath) }></img>
                    <div className="title">{title}</div>
                </div>
                <div className="separator"></div>
            </Link>
        </>
    );
}

function SearchBar() {
    const [results, setResults] = useState([]);

    const saveInput = async (event) => {
        const inputValue = event.target.value;
        const results = await MovieApi.getData('/search/multi', '', { query: inputValue });
        const resultsFiltered = results.results.slice(0, 5);
        setResults(resultsFiltered);
    };

    return (
        <div className="search-bar">
            <div className="search-input">
            <input type="text" placeholder="Buscar en IMDb" onChange={saveInput} />
            <button className="search-glass">
                <img src="./magnifying-glass-solid.svg" alt="search-icon" />
            </button>


            </div>
            <div className="results-searchbar">

                {results.map(r => 
                    
                    <SearchBarPage
                                    title={r.media_type == 'movie' || r.media_type == 'collection' ? r.title :
                                            r.media_type == 'tv' ? r.name : r.name}
                                    key={r.id}
                                    element_id={r.id}
                                    imgPath={r.media_type == 'person' ? r.profile_path : r.poster_path }
                                    type ={r.media_type}/>
                )}
            </div>
        </div>
    );
}

export default SearchBar;
