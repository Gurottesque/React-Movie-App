import { useState, useEffect, useRef } from "react";
import { MovieApi } from "./MovieApi";
import "../stylesheets/Recommendations.css";
import { motion } from "framer-motion";
import "../stylesheets/Carrusel1.css";
import { Link } from "react-router-dom";

const Recommendations = ({ tipo }) => {
  const [entitie, setEntitie] = useState([]);
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchEntitie = async () => {
      const trendingEntitie = await MovieApi.getData(
        `trending/${tipo}/week`,
        "",
        ""
      );
      console.log(trendingEntitie.results);
      setEntitie(trendingEntitie.results);
    };
    fetchEntitie();
  }, []);

  return (
    <div className="recommendations-container-r">
        <img className="flecha" src="./flecha-izq.svg" alt="" />
  
      <motion.div className="movies-grid-r">
        <motion.div
          className="slider"
          ref={sliderRef}
          drag="x"
          dragConstraints={{ right: 0, left: -2370 }}
        >
          {entitie.map((entitie) => (
            <motion.div key={entitie.id} className="movie-card-r">
              <Link to={`/details/${tipo}/${entitie.id}`}>
                <img
                  src={
                    tipo === "person"
                      ? MovieApi.getImage(entitie.profile_path)
                      : MovieApi.getImage(entitie.poster_path)
                  }
                  alt={entitie.title}
                />
                <div className="movie-info-r">
                  <h3>{tipo === "movie" ? entitie.title : entitie.name}</h3>
                  <div className="votos">
                    <img src="./star.svg" alt="" />
                    <p>{entitie.vote_average}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
        <img className="flecha" src="./flecha-der.svg" alt="" />
    </div>
  );
};

export default Recommendations;

