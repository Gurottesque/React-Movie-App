import { MovieApi } from "./MovieApi.js"
import "../stylesheets/SearchBar.css"
import { useState } from "react"

const movies = await MovieApi.getUpcomingMovies()

const showResults = () => {
    console.log("a")
}

function SearchBar() {

    const [results, setResults] = useState([]);

    const showResults = async (input) => {
        const results = await MovieApi.searchByKeyword(input.target.value);
        setResults(results);
    };

    return (
        <div className='search-button'>
            <input type="text" onChange={showResults}></input>
            <div className='results'>
                {results.map((a, index) => (
                    <div key={index}>{a.title}</div>
                ))}
            </div>
        </div>
    )
}

export default SearchBar