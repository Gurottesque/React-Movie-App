import axios from "axios"

const AUTH_KEY = '  Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMWI0ZGZkZTIyYTU2ODBhYmU5YjlhNjg3YmE4ZWNiMSIsIm5iZiI6MTcxOTQzMDg2My44MTUxMDIsInN1YiI6IjY2N2M2ZDE2MDkzMTRmMTFlNTc1OWFhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QSp73AhBXPUrKbMahKgfZdNUUkcd6xBZgcSxdj_yM5Q'

/* Objeto MovieAPI

Por medio de este objeto se interactúa con la API de The Movie Database para obtener información sobre películas, shows y personas.

Métodos:

- getGenres(): Obtiene los géneros de las películas.
- getShowByGenres(showType, genresID, page): Obtiene shows por género. Los valores válidos para showType son 'movie' y 'tv'. genresID es un array con los IDs de los géneros.
- getUpcomingMovies(page): Obtiene las películas que se estrenarán próximamente. Por defecto, se obtienen las de la primera página.
- getTrending(time, showType): Obtiene los shows que son tendencia en un periodo de tiempo específico. Los valores válidos para time son 'day' y 'week'. Los valores válidos para showType son 'movie' y 'tv'.
- getMovieById(id): Obtiene la información de una película específica.
- getShowById(id): Obtiene la información de un show específico.
- getPersonById(id): Obtiene la información de una persona específica.
- searchByKeyword(keyword, page): Busca películas, shows y personas por una palabra clave. Por defecto, se obtienen los resultados de la primera página.
- searchByMovieTitle(title, page): Busca películas por título. Por defecto, se obtienen los resultados de la primera página.
- searchByShowTitle(title, page): Busca shows por título. Por defecto, se obtienen los resultados de la primera página.
- searchByPersonName(name, page): Busca personas por nombre. Por defecto, se obtienen los resultados de la primera página.

Algunos metodos tienen funcionalidades totalmente similares que se podrian extraer en un solo método, se decidió no hacerlo por terminos de legibilidad y mantenibilidad del código.

*/

export class MovieApi {

    /* Metodo getUpcomingMovies:
        -> page (int) : El número de la página de la que se quieren obtener las películas. Por defecto, es 1.

    Obtiene las películas que se estrenarán próximamente.
    */

    static async getUpcomingMovies(page = 1) {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?page=${page}`, {
                headers: {
                    Authorization: AUTH_KEY 
                }
            });
            return response.data.results;
        } catch (error) {
            console.error('Error al acceder a las peliculas:', error);
            throw error; 
        }
    }

    /* Metodo getTrending:
        -> time (string) : El periodo de tiempo en el que se quieren obtener los shows que son tendencia. Los valores válidos son 'day' y 'week'.
        -> showType (string) : El tipo de show del que se quieren obtener los que son tendencia. Los valores válidos son 'movie' y 'tv'.

    Obtiene los shows que son tendencia en un periodo de tiempo específico.
    */

    static async getTrending(time, showType) {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/trending/${showType}/${time}`, {
                headers: {
                    Authorization: AUTH_KEY
                }
            });
            return response.data.results;
        } catch (error) {
            console.error('Error al acceder a los trendings:', error);
            throw error;
        }
    }

    /* Metodo getMoviesByGenres:
        -> genresID (array) : Un array con los IDs de los géneros de las películas. 

    Obtiene las películas por género.
    */

    static async getMovieById(id) {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
                headers: {
                    Authorization: AUTH_KEY
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error al acceder a la pelicula:', error);
            throw error;
        }

    }

    static async getMoviesById(ids) {
        try {
            const objectMovies = []
            for ( movi in ids){
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
                    headers: {
                        Authorization: AUTH_KEY
                    }
                });
                objectMovies.push(response.data);
            }
            return objectMovies;
        } catch (error) {
            console.error('Error al acceder a las peliculas:', error);
            throw error;
        }
    }



    /* Metodo getShowById:
        -> id (int) : El ID del show del que se quiere obtener la información.

    Obtiene la información de un show específico.
    */

    static async getShowById(id) {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/tv/${id}`, {
                headers: {
                    Authorization: AUTH_KEY
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error al acceder a los shows:', error);
            throw error;
        }
    }

    /* Metodo getPersonById:
        -> id (int) : El ID de la persona de la que se quiere obtener la información.

    Obtiene la información de una persona específica.
    */

    static async getPersonById(id) {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/person/${id}?language=en-US`, {
                headers: {
                    Authorization: AUTH_KEY
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error al acceder a la persona:', error);
            throw error;
        }
    }


    /* Metodo getGenres:

    Obtiene todos los géneros de las películas.
    */

    static async getGenresNames() {
        try {
            const response1 = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?language=en-US`, {
                headers: {
                    Authorization: AUTH_KEY
                }
            });
            const response2 = await axios.get(`https://api.themoviedb.org/3/genre/tv/list?language=en-US`, {
                headers: {
                    Authorization: AUTH_KEY
                }
            });
            // Extraer los géneros de ambas respuestas
            const movieGenres = response1.data.genres;
            const tvGenres = response2.data.genres;

            // Combinar ambas listas en un solo array
            const combinedGenres = [...movieGenres, ...tvGenres];

            // Utilizar un Map para almacenar los géneros únicos por su ID
            const uniqueGenresMap = new Map();
            
            combinedGenres.forEach(genre => {
                uniqueGenresMap.set(genre.id, genre); // Utilizar el ID como clave para asegurar la unicidad
            });

            // Convertir el Map de vuelta a un array de objetos
            const uniqueGenresArray = Array.from(uniqueGenresMap.values());

            return uniqueGenresArray;
        } catch (error) {
            console.error('Error al acceder a los generos:', error);
            throw error;
        }
    }

    /* Metodo getGenres:

    Obtiene todos los géneros de las películas.
    */

    static async getGenres() {
        try {
            const response1 = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?language=en-US`, {
                headers: {
                    Authorization: AUTH_KEY
                }
            });
            const response2 = await axios.get(`https://api.themoviedb.org/3/genre/tv/list?language=en-US`, {
                headers: {
                    Authorization: AUTH_KEY
                }
            });
        // Extraer los géneros de ambas respuestas
        const movieGenres = response1.data.genres;
        const tvGenres = response2.data.genres;

        // Combinar ambas listas en un solo array
        const combinedGenres = [...movieGenres, ...tvGenres];

        // Utilizar un Map para almacenar los géneros únicos por su ID
        const uniqueGenresMap = new Map();
        
        combinedGenres.forEach(genre => {
            uniqueGenresMap.set(genre.id, genre); // Utilizar el ID como clave para asegurar la unicidad
        });

        // Convertir el Map de vuelta a un array de objetos
        const uniqueGenresArray = Array.from(uniqueGenresMap.values());

        return uniqueGenresArray;
        } catch (error) {
            console.error('Error al acceder a los generos:', error);
            throw error;
        }
    }

    /* Metodo getShowByGenres:
        -> showType (string) : El tipo de show del que se quieren obtener los shows por género. Los valores válidos son 'movie' y 'tv'.
        -> genresID (array) : Un array con los IDs de los géneros de los shows.
        -> page (int) : El número de la página de la que se quieren obtener los shows. Por defecto, es 1.

    Obtiene shows por género.
    */

    static async getShowByGenres(showType, genresID, page = 1) {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/discover/${showType}?language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genresID.join(",")}`, {
                headers: {
                    Authorization: AUTH_KEY
                }
            });
            return response.data.results;
        } catch (error) {
            console.error('Error al acceder a las peliculas por genero:', error);
            throw error;
        }
    }

    /* Metodo searchByKeyword:
        -> keyword (string) : La palabra clave por la que se quiere buscar.
        -> page (int) : El número de la página de la que se quieren obtener los resultados. Por defecto, es 1.

    Busca películas, shows y personas por una palabra clave.
    */

    static async searchByKeyword(keyword, page = 1) {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/search/multi?language=en-US&query=${keyword}&page=${page}&include_adult=false`, {
                headers: {
                    Authorization: AUTH_KEY
                }
            });
            return response.data.results;
        } catch (error) {
            console.error('Error al buscar por keyword:', error);
            throw error;
        }
    }

    /* Metodo searchByMovieTitle:
        -> title (string) : El título de la película por el que se quiere buscar.
        -> page (int) : El número de la página de la que se quieren obtener los resultados. Por defecto, es 1.

    Busca películas por título.
    */

    static async searchByMovieTitle(title, page = 1) {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/search/movie?language=en-US&query=${title}&page=${page}&include_adult=false`, {
                headers: {
                    Authorization: AUTH_KEY
                }
            });
            return response.data.results;
        } catch (error) {
            console.error('Error al buscar por titulo de pelicula:', error);
            throw error;
        }
    }

    /* Metodo searchByShowTitle:
        -> title (string) : El título del show por el que se quiere buscar.
        -> page (int) : El número de la página de la que se quieren obtener los resultados. Por defecto, es 1.

    Busca shows por título.
    */

    static async searchByShowTitle(title, page = 1) {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/search/tv?language=en-US&query=${title}&page=${page}&include_adult=false`, {
                headers: {
                    Authorization: AUTH_KEY
                }
            });
            return response.data.results;
        } catch (error) {
            console.error('Error al buscar por titulo de show:', error);
            throw error;
        }
    }


    /* Metodo searchByPersonName:
        -> name (string) : El nombre de la persona por el que se quiere buscar.
        -> page (int) : El número de la página de la que se quieren obtener los resultados. Por defecto, es 1.

    Busca personas por nombre. 
    */
    static async searchByPersonName(name, page = 1) {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/search/person?language=en-US&query=${name}&page=${page}&include_adult=false`, {
                headers: {
                    Authorization: AUTH_KEY
                }
            });
            return response.data.results;
        } catch (error) {
            console.error('Error al buscar por nombre de persona:', error);
            throw error;
        }
    }


    /* Metodo searchByPersonName:
        -> name (string) : El nombre de la persona por el que se quiere buscar.
        -> page (int) : El número de la página de la que se quieren obtener los resultados. Por defecto, es 1.

    Busca personas por nombre. 
    */


    static async getShowImages(id) {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/images`, {
                headers: {
                    Authorization: AUTH_KEY
                }
            });
            return response.data.results;
        } catch (error) {
            console.error('Error al buscar las imagenes:', error);
            throw error;
        }
    }
}