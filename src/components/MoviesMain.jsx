import { useState } from 'react'
import '../stylesheets/MoviesMain.css'

const MoviesMain = () => {
  const images = [
    'https://static.vecteezy.com/system/resources/thumbnails/022/666/061/small/owl-face-silhouettes-owl-face-svg-black-and-white-owl-vector.jpg',
    'https://static.vecteezy.com/system/resources/thumbnails/022/666/314/small/lion-face-silhouettes-lion-face-svg-black-and-white-lion-vector.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdTBzKKIAqZHWsnbvZzh4f0rdc1cdY0aBAWK4a883adosnY3k41iOTsTlHjNhCe5S544o&usqp=CAU'
  ];

  const [imageIndex, setImageIndex] = useState(0);

  const handlePrev = () => {
    setImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className='movies-main-container'>
      <img 
        className='movies-main-img'
        src={images[imageIndex]} 
        alt="movie-img" 
      />
      <button onClick={handlePrev}>Prev</button>
      <button onClick={handleNext}>Next</button>
    </div>
  )
}

export default MoviesMain