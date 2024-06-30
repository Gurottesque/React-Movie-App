import { MovieApi } from "./MovieApi.js"
import { useEffect, useState } from "react"
import { Link, Route, useNavigate } from "react-router-dom"
import "../stylesheets/SearchBar.css"

/* 
    Componente SearchBar
    Barra de busqueda con auto search en el input, filtrado entre peliculas, personas y Tv shows
*/
function SearchBar() {
    const {
        results, 
        inputValue,
        setInputValue,
        typeSearch, setTypeSearch,
        focus, setFocus
    } = useSearch(); // Custom Hook para realizar las operaciones de busqueda, tipado y foco

    // Función para actualizar la entrada de datos 'input' cada vez que el usuario escribe
    // Será pasado al componente "SearchInput"
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    // Función para actualizar el endpoint en la api a buscar
    // puede ser 'movie', 'tv', 'person', o 'multi'
    const handleMediaTypeChange = (mediaType) => {
        setTypeSearch(mediaType);
    };


    return (
        <div className="search-bar"
        // Eventos establecidos para desaparecer la barra de resultados cuando el usuario
        // mueve su mouse fuera de la zona de la barra de busqueda
            onMouseEnter={() => setFocus(true)} 
            onMouseLeave={() => setTimeout(() => setFocus(false), 100)}> 
                                {/* Se da un tiempo antes de desaparecer por que al entrar a uno de los resultados, desrenderiza antes de la redireccion*/}

            {/* Renderizar componente SearchInput, corresponde al lugar donde el usuario escribe */}
            <SearchInput handleInputChange={handleInputChange} query={inputValue} />

            {/* Renderizar componente SelectMediaTypes, usado para que el usuario seleccione
                entre buscar por peliculas, show, personas o todo
            */}
            <SelectMediaTypes selectMediaHandler={handleMediaTypeChange} />

            {/* Renderizar componente SearchResultsList, es el modal en donde aparecerán los resultados de la
                busqueda, le pasamos el 'foco' para que desaparezca cuando no haya foco
            */}
            <SearchResultsList results={results} focus={focus} typeSearch={typeSearch} />
            
            {/* TO DO: Boton de busqueda, al dar click dirigir a /search con las keywords apropiadas */}
            <button className="search-glass">
                <img src="./magnifying-glass-solid.svg" alt="search-icon" />
            </button>
        </div>
    );
}



export default SearchBar;




// / /  / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / /
          /* COMPONENTES:    SearchInput - SelectMediaTypes - SearchResultsList - SearchResults */
          /* CUSTOM HOOKS:  useSearch */
// / /  / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / /


/*
    Componente SearchInput:
    Encargado de renderizar el input y actualizar el estado 'inputValue' al escuchar el evento "onChange" que se activa cuando el usuario escribe en el input.
*/

function SearchInput({ handleInputChange, query }){
    const navigate = useNavigate();

    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        navigate(`/search?query=${encodeURIComponent(query)}`);
      }
    };

    return (
        <div className="search-input">
            <input
                type="text"
                placeholder="Buscar..."
                onChange={handleInputChange}
                onKeyDown={(e) => {handleKeyDown(e)}  }

            />
        </div>
    );
};


/*
    Componente SelectMediaTypes:
    Encargado de renderizar los tipos de filtro por el que se puede buscar (movie, tv, people, all)
    Recibe el handler por el cual cada uno de los filtros aplicará al estado "showMediaTypes"
*/

function SelectMediaTypes({selectMediaHandler}) { 

    // Estado booleano usado para borrar la eleccion del usuario al dar click de nuevo a una de las elecciones
    const [showMediaTypes, setShowMediaTypes] = useState(false); 


    // Actualiza "showMediaTypes"
    const renderMediaTypes = () => {
        setShowMediaTypes(!showMediaTypes);
    }

    return (
        <>
        {/* 
            Boton usado para mostrar las elecciones
        
        TO-DO: Modificar el CSS de este boton para hacerlo mas estilizado 
        */}
        <button className="search-glass" onClick={renderMediaTypes} />

        {/* Condicional de renderizado, si "showMediaTypes" es true, se renderizarán los botones
            se usa el operador "&&" (Logico and)
        */}
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

/*
    Componente SearchResultsList:
    Encargado de renderizar los resultados de la busqueda a la par que el usuario va escribiendo, toma los resultados
    como un Array de objetos el cual itera en él para renderizar cada uno, el foco y el tipo de busqueda
*/

function SearchResultsList({ results, focus, typeSearch }){
    return (
        <div className="results-searchbar">

            {/* Renderizado condicional, si el foco es verdadero se va a renderizar los resultados 
                Por temas de la API, la propiedad que tiene el nombre de la entidad cambia según la entidad

            */}
            {focus && results.map(r => (
                <SearchResults
                    title={ 
                        typeSearch === 'person' || typeSearch === 'tv' ? r.name : // Si es persona o TV, será name
                        typeSearch === 'movie' ? r.title : // Si es una pelicula, será title
                        typeSearch === 'multi' && r.media_type === 'movie' ? r.title : r.name // Si es multi, y a la vez una pelicula, titulo, en caso contrario, name
                    }
                    key={r.id} // Key unica que identificará al componente
                    element_id={r.id} // ID de la entidad usada para buscar en la API
                    imgPath={r.media_type === 'person' ? r.profile_path : r.poster_path} 
                    type={r.media_type}
                />
            ))}
        </div>
    );
};


/*
    Componente SearchResults:
    Encargado de renderizar cada resultado individual y hacer el enrutamiento correspondiente hasta la pagina de detalles
*/

function SearchResults({ title, element_id, type, imgPath}) {
    return (
        <>
            {/* Enrutamiento al hacer click */}
            <Link to={`/details/${type}/${element_id}`} className="link-to-details">
                
                {/* Div que corresponde a cada resultado */}
                <div className="search-bar-result">
                    <img className="img-result" src={ MovieApi.getImage(imgPath) }></img>
                    <div className="title">{title}</div>
                </div>

                {/* Separador entre cada uno de los elementos */}
                <div className="separator"></div>

            </Link>

        </>
    );
}


/*
    Custom Hook useSearch:
    Custom hook encargado de hacer el llamado a la api, administrar los estados de resultado, los inputs digitados, el tipo de busqueda y el foco
*/

function useSearch() {

    /*
        Estados:
            results = Estado que guarda los resultados que van viniendo, es actualizado en: 
                      fetchResults: Actualizado con la query (busqueda digitada por el usuario)
                      useEffect: Actualizado con el cambio del tipo de busqueda escogida (movie,tv...etc)
            inputValue = Estado que guarda el valor digitado por el usuario
            typeSearch = Estado que guarda el tipo de busqueda (movie, tv, person, multi)
            focus = Estado que guarda si está en foco o no
    */
    const [results, setResults] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [typeSearch, setTypeSearch] = useState('multi');
    const [focus, setFocus] = useState(false);

    const fetchResults = async (query, type) => {
        const results = await MovieApi.getData(`/search/${type}`, '', { query }); // Llamada a la API con el tipo y la query
        return results.results.slice(0, 10); // Partimos el array a solo 10 resultados
    };

    useEffect(() => {
        const fetchAndSetResults = async () => {
            if (inputValue) { // Si hay algo escrito en el input value
                const resultsFiltered = await fetchResults(inputValue, typeSearch); // Filtramos las busquedas con el tipo de busqueda
                setResults(resultsFiltered);
            } else {
                setResults([]); // El input está vacío, por lo tanto, no hay resultados
            }
        };
        fetchAndSetResults();
    }, [inputValue, typeSearch]); // Esto tiene que suceder cada que el usuario escriba y cada que cambie de tipo de busqueda

    return {
        results,
        inputValue,
        setInputValue,
        typeSearch,
        setTypeSearch,
        focus,
        setFocus,
    };
};


