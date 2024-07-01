import { MovieApi } from "./MovieApi.js";
import "../stylesheets/SearchBar.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ITEM_POR_PAGINA = 9;

function ElementResults({ results, isFilterActive }) {
    const [datosFromApi, setDatosFromApi] = useState(results);
    const [items, setItems] = useState(results.slice(0, ITEM_POR_PAGINA));
    const [currentPage, setCurrentPage] = useState(0);

    const previaP = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const nextP = () => {
        if ((currentPage + 1) * ITEM_POR_PAGINA < results.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    useEffect(() => {
        const start = currentPage * ITEM_POR_PAGINA;
        const end = start + ITEM_POR_PAGINA;
        setItems(results.slice(start, end));
    }, [currentPage, results]);

    return (
        <div>
            <div className="container-results">
                {items.map((item) => (
                    <div className="cont-info" key={item.id}>
                        <img
                            className="img-search"
                            src={MovieApi.getImage(item.poster_path)}
                            alt={item.title || item.name}
                        />
                        <h2>
                            {isFilterActive? item.title: item.media_type === "movie" ||item.media_type === "collection" ? item.title: item.name}
                        </h2>
                        <div>⭐{item.vote_average}</div>
                    </div>
                ))}
            </div>
            <button className="btn" onClick={previaP}>Prev</button>
            <button className="btn" onClick={nextP}>Next</button>
        </div>
    );
}

function Genre({ name, onClickHandler }) {
    const [isSelected, setIsSelected] = useState(false);

    return (
        <button
            style={{ backgroundColor: isSelected ? "green" : "white" }}
            onClick={() => {
                onClickHandler();
                setIsSelected(!isSelected);
            }}
        >
            {name}
        </button>
    );
}

const useSearch = (initialQuery) => {
    const [results, setResults] = useState([]);
    const [inputValue, setInputValue] = useState(initialQuery);
    const [genresFilter, setGenresFilter] = useState([]);
    const [isFilterActive, setIsFilterActive] = useState(false);

    const handleSearch = async (queryString) => {
        if (genresFilter.length === 0) {
            const results = await MovieApi.searchAPI("search/multi", {
                query: queryString,
            });
            setResults(results);
        } else {
            const results = await MovieApi.searchAPI("discover/movie", {
                with_genres: genresFilter.join(","),
            });
            setResults(results);
        }
    };

    useEffect(() => {
        handleSearch(inputValue);
    }, [genresFilter, inputValue]);

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleSearch(inputValue);
        }
    };

    const filterSearch = (genreId) => {
        setGenresFilter((prev) =>
            prev.includes(genreId)
                ? prev.filter((id) => id !== genreId)
                : [...prev, genreId]
        );
        setIsFilterActive(true);
    };

    return {
        results,
        inputValue,
        handleChange,
        handleKeyDown,
        filterSearch,
        isFilterActive,
    };
};

const useGenres = () => {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        async function fetchGenres() {
            const genres = await MovieApi.getGenres();
            setGenres(genres);
        }
        fetchGenres();
    }, []);

    return genres;
};

function SearchPage() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("query");

    const {
        results,
        inputValue,
        handleChange,
        handleKeyDown,
        filterSearch,
        isFilterActive,
    } = useSearch(query);

    const genres = useGenres();

    return (
        <>
            <div className="search-bar busquedaSec">
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Buscar..."
                />
            </div>
            <div className="results-container">
                <ElementResults results={results} isFilterActive={isFilterActive} />
            </div>
            <div className="filters">
                {genres.map((genre) => (
                    <Genre
                        key={genre.id}
                        name={genre.name}
                        onClickHandler={() => filterSearch(genre.id)}
                    />
                ))}
            </div>
        </>
    );
}

export default SearchPage;
