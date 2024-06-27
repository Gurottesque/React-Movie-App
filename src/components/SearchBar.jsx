import { MovieApi } from "./MovieApi.js"
import "../stylesheets/SearchBar.css"
import { useState } from "react"

const movies = await MovieApi.getUpcomingMovies()


function SearchBarResult( { title, image_path } ) {
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

function SearchBar() {
    const [results, setResults] = useState([]);

    const saveInput = async (event) => {
        const inputValue = event.target.value; // Accede al valor del input
        const results = await MovieApi.searchByKeyword(inputValue);
        const resultsFiltered = results.slice(0,5);
        console.log(resultsFiltered)
        setResults(resultsFiltered);
    };

    return (
        <div className='search-bar'>
            <input type="text" onChange={saveInput}></input>
            <div className='results'>
                {results.map(r => 
                    
                    <SearchBarResult name={r.name} 
                                     title={r.media_type == 'movie' || r.media_type == 'collection' ? r.title :
                                            r.media_type == 'tv' ? r.name : r.name}
                                     key={r.id}
                                     image_path={r.media_type == 'person' ? r.profile_path : r.poster_path }/>
                )}
            </div>
        </div>
    );
};

export default SearchBar