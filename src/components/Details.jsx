import React, { useEffect, useState } from 'react'
import { MovieApi } from './MovieApi'
import '../stylesheets/Details.css'

const Details = ({id}) => {
  const [movie, setMovie] = useState(null);
  const [imgs, setImgs] = useState(null);

  
  useEffect(() => {
    const fetchMovie = async () => {
      const movie = await MovieApi.getData(`movie/${id}`, '', '');
      const imgs = await MovieApi.getData(`movie/${id}/images`, '', ''); 
      setMovie(movie);
      setImgs(imgs);
    }
    fetchMovie();

  },[]);
  console.log(movie)
  console.log(imgs)


  return (
    <div className='main-details-container'>
      {movie && (
        <div className='details-container'>
            <h1>{movie.title}</h1>
            <div className='details-img'>
              <img 
                src={MovieApi.getImage(movie.poster_path)} 
                alt={movie.title} 
              />
            </div>
            <p>{movie.genres.map(genre => genre.name).join(', ')}</p>
            <p>{movie.overview}</p>
            <p>Rating: {movie.vote_average}</p>
            <p>Release Date: {movie.release_date}</p>
            <p>Runtime: {movie.runtime} minutes</p>
        </div>
      )}
    </div>
  )
}

export default Details