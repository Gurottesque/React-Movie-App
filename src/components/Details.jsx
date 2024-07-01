import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import { MovieApi } from './MovieApi'
import '../stylesheets/Details.css'


const Details = () => {
  const [detail, setDetail] = useState(null);
  const [imgs, setImgs] = useState(null);
  const {id} = useParams();
  const {type} = useParams();
  
  useEffect(() => {
    const fetchMovie = async () => {
      const detail = await MovieApi.getData(`${type}/${id}`, '', '');
      const imgs = await MovieApi.getData(`${type}/${id}/images`, '', ''); 
      setDetail(detail);
      setImgs(imgs);
      console.log(detail.gender !== undefined) //Personas
      console.log(detail.seassons != undefined) //Series

    }
    fetchMovie();

  },[]);

  return (
    <div className='main-details-container'>
      <div className='details-container'>
        {detail.gender !== undefined? (//Persons
            <>
              <h1>{detail.name}</h1>
              <div className='details-img'>
                <img 
                  src={MovieApi.getImage(detail.profile_path)} 
                  alt={detail.name} 
                />
              </div>
              <p>Biography: {detail.overview}</p>
              <p>Popularity: {detail.popularity}</p>
              <p>Birthday: {detail.birthday}</p>
              <p>Place of birth: {detail.place_of_birth}</p>
              <p>Know for: {detail.know_for_department}</p>
            </>
        ): detail.seassons !== undefined?({

        }

        ): ({
          
        })
        }
       </div>
    </div>
  )
}

export default Details