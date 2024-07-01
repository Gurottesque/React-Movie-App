import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MovieApi } from "./MovieApi";
import "../stylesheets/Details.css";

const Details = () => {
  const [detail, setDetail] = useState(null);
  const [imgs, setImgs] = useState(null);
  const { id } = useParams();
  const { type } = useParams();

  useEffect(() => {
    const fetchMovie = async () => {
      const detail = await MovieApi.getData(`${type}/${id}`, "", "");
      const imgs = await MovieApi.getData(`${type}/${id}/images`, "", "");
      setDetail(detail);
      setImgs(imgs);
      console.log(detail);
      console.log(detail.gender !== undefined); //Personas
      console.log(detail.seassons != undefined); //Series
    };
    fetchMovie();
  }, []);

  return (
    <div className="main-details-container">
      <div className="details-container">
        {detail &&
          (detail.gender !== undefined ? ( //Persons
            <>
              <h1>{detail.name}</h1>
              <div className="details-img">
                <img
                  src={MovieApi.getImage(detail.profile_path)}
                  alt={detail.name}
                />
              </div>
              <p>Biography: {detail.overview}</p>
              <p>Popularity: {detail.popularity}</p>
              <p>Birthday: {detail.birthday}</p>
              <p>Place of birth: {detail.place_of_birth}</p>
              <p>Know for: {detail.known_for_department}</p>
            </>
          ) : detail.seasons !== undefined ? ( //TV SHOWs
            <>
              <div
                className="title-background"
                style={{
                  backgroundImage: `url(${MovieApi.getImage(
                    detail.backdrop_path
                  )})`,
                }}
              >
                <h1>{detail.name}</h1>

                <div className="details-img">
                  <img
                    src={MovieApi.getImage(detail.poster_path)}
                    alt={detail.name}
                  />
                </div>
              </div>
              <p>
                Genres: {detail.genres.map((genre) => genre.name).join(", ")}
              </p>
              <p>Overview: {detail.overview}</p>
              <p>Popularity: {detail.popularity}</p>
              <p>First air date: {detail.first_air_date}</p>
              <p>Last air date: {detail.last_air_date}</p>
              <p>Number of seasons: {detail.number_of_seasons}</p>
              <p>Number of episodes: {detail.number_of_episodes}</p>
            </>
          ) : (
            //Movies
            <>
              <div
                className="title-background"
                style={{
                  backgroundImage: `url(${MovieApi.getImage(
                    detail.backdrop_path
                  )})`,
                }}
              >
                <h1>{detail.title}</h1>

                <div className="details-img">
                  <img
                    src={MovieApi.getImage(detail.poster_path)}
                    alt={detail.title}
                  />
                </div>
              </div>
              <p>
                Genres: {detail.genres.map((genre) => genre.name).join(", ")}
              </p>
              <p>Overview: {detail.overview}</p>
              <p>Popularity: {detail.popularity}</p>
              <p>Release date: {detail.release_date}</p>
              <p>Runtime: {detail.runtime} minutes</p>
            </>
          ))}
      </div>
    </div>
  );
};

export default Details;
