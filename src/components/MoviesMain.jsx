import { useState, useEffect } from 'react'
import axios from 'axios';
import { MovieApi } from './MovieApi';
import '../stylesheets/MoviesMain.css'

const MoviesMain = () => {
  const [movie, setMovie] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);

  const movieIds = [603, 504, 200, 345];

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const movieData = await MovieApi.getMovieById(movieIds[imageIndex]);
        setMovie(movieData);
      } catch (error) {
        console.error('Error al acceder a la pelicula:', error);
        throw error;
      }
    };

    fetchMovie();
  }, [imageIndex]);

  const handlePrev = () => {
    setImageIndex((prevIndex) => (prevIndex - 1 + movieIds.length) % movieIds.length);
  };

  const handleNext = () => {
    setImageIndex((prevIndex) => (prevIndex + 1) % movieIds.length);
  };

  return (
    <div className='movies-main-container'>
      <button className='nav-button prev' onClick={handlePrev}>&lt;</button>
      {movie && (
        <>
          <img 
            className='movies-main-img'
            src={MovieApi.getImage(movie.poster_path)} 
            alt={movie.title} 
          />
          <div className='movie-info'>
            <button className='add-button'>+</button>
            <img className='movie-card' src={MovieApi.getImage(movie.poster_path)} alt={movie.title} />
            <div className='movie-details'>
              <h2>{movie.title}</h2>
              <p>Watch the Trailer</p>
            </div>
          </div>
        </>
      )}
      <button className='nav-button next' onClick={handleNext}>&gt;</button>
    </div>
  )
}

export default MoviesMain