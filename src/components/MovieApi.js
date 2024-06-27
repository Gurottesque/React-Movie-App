import axios from 'axios';

const AUTH_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMWI0ZGZkZTIyYTU2ODBhYmU5YjlhNjg3YmE4ZWNiMSIsIm5iZiI6MTcxOTQzMDg2My44MTUxMDIsInN1YiI6IjY2N2M2ZDE2MDkzMTRmMTFlNTc1OWFhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QSp73AhBXPUrKbMahKgfZdNUUkcd6xBZgcSxdj_yM5Q';

export class MovieApi {

    static async searchAPI(endpoint, params) {
        try {
            const url = new URL(`https://api.themoviedb.org/3/${endpoint}`);
            
            const searchParams = new URLSearchParams(params);
            
            url.search = searchParams.toString();
            
            const response = await axios.get(url.toString(), {
                headers: {
                    Authorization: `Bearer ${AUTH_KEY}`
                }
            });
            
            return response.data.results;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async getGenres() {
        try {
            const response1 = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?language=en-US`, {
                headers: {
                    Authorization: `Bearer ${AUTH_KEY}`
                }
            });
            const response2 = await axios.get(`https://api.themoviedb.org/3/genre/tv/list?language=en-US`, {
                headers: {
                    Authorization: `Bearer ${AUTH_KEY}`
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

    static getImage(imagePath) {
        return imagePath !== null ? `https://image.tmdb.org/t/p/w500/${imagePath}` : "../assets/image-load-failed.jpg"
    }

}




