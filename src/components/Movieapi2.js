import axios from 'axios';

const AUTH_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMWI0ZGZkZTIyYTU2ODBhYmU5YjlhNjg3YmE4ZWNiMSIsIm5iZiI6MTcxOTQzMDg2My44MTUxMDIsInN1YiI6IjY2N2M2ZDE2MDkzMTRmMTFlNTc1OWFhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QSp73AhBXPUrKbMahKgfZdNUUkcd6xBZgcSxdj_yM5Q';

export class MovieAPI2 {

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
}




