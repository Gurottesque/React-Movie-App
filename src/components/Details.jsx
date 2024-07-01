import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import { MovieApi } from './MovieApi'
import '../stylesheets/Details.css'


const Details = () => {
  const [detail, setDetail] = useState(null);
  const [imgs, setImgs] = useState(null);
  const {id, type} = useParams();
 
  useEffect(() => {
    const fetchMovie = async () => {
      const detail = await MovieApi.getData(`${type}/${id}`, '', '');
      const imgs = await MovieApi.getData(`${type}/${id}/images`, '', ''); 
      setDetail(detail);
      setImgs(imgs);
      console.log(detail)
      console.log(detail.gender != undefined )
    }
    fetchMovie();

  },[]);

  return (
    
    <div className='main-details-container'>
      {
        detail.gender !=
      }
      {detail && (
        <div className='details-container'>
            <h1>{detail.title}</h1>
            <div className='details-img'>
              <img 
                src={MovieApi.getImage(detail.poster_path)} 
                alt={detail.title} 
              />
            </div>
            <p>{detail.genres.map(genre => genre.name).join(', ')}</p>
            <p>{detail.overview}</p>
            <p>Rating: {detail.vote_average}</p>
            <p>Release Date: {detail.release_date}</p>
            <p>Runtime: {detail.runtime} minutes</p>
        </div>
      )}
    </div>
  )
}

export default Details