import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import { MovieApi } from './MovieApi'


const Details = () => {
  const [movie, setMovie] = useState(null);
  const [imgs, setImgs] = useState(null);
  const {id} = useParams();
  
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
          <img 
            className='details-img'
            src={MovieApi.getImage(movie.poster_path)} 
            alt={movie.title} 
          />
          <div className='details-info'>
            <h2>{movie.title}</h2>
            <p>{movie.overview}</p>
            <p>Rating: {movie.vote_average}</p>
            <p>Release Date: {movie.release_date}</p>
            <p>Runtime: {movie.runtime} minutes</p>
            <p>Genres: {movie.genres.map(genre => genre.name).join(', ')}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Details