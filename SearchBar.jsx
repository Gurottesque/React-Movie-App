import { MovieApi } from "./MovieApi.js"
import "../stylesheets/SearchBar.css"
import { useEffect, useState } from "react"
import { Link, Route } from "react-router-dom"


function SearchBar() {
    const {
        results,
        setInputValue,
        typeSearch,
        setTypeSearch,
        focus,
        setFocus,
    } = useSearch();

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleMediaTypeChange = (mediaType) => {
        setTypeSearch(mediaType);
    };

    return (
        <div className="search-bar"
        onMouseEnter={() => setFocus(true)}
        onMouseLeave={() => setTimeout(() => setFocus(false), 100)}>

            <SearchInput handleInputChange={handleInputChange} setFocus={setFocus} />

            <SelectMediaTypes selectMediaHandler={handleMediaTypeChange} />

            <SearchResultsList results={results} focus={focus} typeSearch={typeSearch} />
            
            <button className="search-glass">
                <img src="./magnifying-glass-solid.svg" alt="search-icon" />
            </button>
        </div>
    );
}



export default SearchBar;





/////////////////////////////////////////////////////////////////////////////////////////////////



function SearchResults({ title, element_id,type, imgPath,}) {
    return (
        <>

            <Link to={`/details/${type}/${element_id}`} className="link-to-details">
                <div className="search-bar-result">
                    <img className="img-result" src={ MovieApi.getImage(imgPath) }></img>
                    <div className="title">{title}</div>
                </div>
                <div className="separator"></div>
            </Link>
        </>
    );
}

const SearchInput = ({ handleInputChange, setFocus }) => {
    return (
        <div className="search-input">
            <input
                type="text"
                placeholder="Buscar..."
                onChange={handleInputChange}

            />
        </div>
    );
};

const SearchResultsList = ({ results, focus, typeSearch }) => {
    return (
        <div className="results-searchbar">
            {focus && results.map(r => (
                <SearchResults
                    title={
                        typeSearch === 'person' || typeSearch === 'tv' ? r.name :
                        typeSearch === 'movie' ? r.title :
                        typeSearch === 'multi' && r.media_type === 'movie' ? r.title : r.name
                    }
                    key={r.id}
                    element_id={r.id}
                    imgPath={r.media_type === 'person' ? r.profile_path : r.poster_path}
                    type={r.media_type}
                />
            ))}
        </div>
    );
};

function SelectMediaTypes({selectMediaHandler}) { 

    const [showMediaTypes, setShowMediaTypes] = useState(false);


    const renderMediaTypes = () => {
        setShowMediaTypes(!showMediaTypes);
    }

    return (
        <>
        <button className="search-glass" onClick={renderMediaTypes}>
        </button>

        {showMediaTypes && <>
                           <button onClick={() => selectMediaHandler('movie')}>Movie</button>
                           <button onClick={() => selectMediaHandler('tv')}>Tv Shows</button>
                           <button onClick={() => selectMediaHandler('person')}>Persons</button>
                           <button onClick={() => selectMediaHandler('multi')}>All</button>
                           </>
        }
        </>
    )

}

const useSearch = () => {
    const [results, setResults] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [typeSearch, setTypeSearch] = useState('multi');
    const [focus, setFocus] = useState(false);

    const fetchResults = async (query, type) => {
        const results = await MovieApi.getData(`/search/${type}`, '', { query });
        return results.results.slice(0, 10);
    };

    useEffect(() => {
        const fetchAndSetResults = async () => {
            if (inputValue) {
                const resultsFiltered = await fetchResults(inputValue, typeSearch);
                setResults(resultsFiltered);
            } else {
                setResults([]);
            }
        };
        fetchAndSetResults();
    }, [inputValue, typeSearch]);

    return {
        results,
        setInputValue,
        typeSearch,
        setTypeSearch,
        focus,
        setFocus,
    };
};


