import { useState, useEffect } from "react";
import { MovieApi } from "./MovieApi";
import "../stylesheets/Recommendations.css";
import { Link } from "react-router-dom";

const Recommendations = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const trendingMovies = await MovieApi.getData(
          "trending/movie/week",
          "",
          ""
        );
        console.log(trendingMovies.results);
        setMovies(trendingMovies.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, []);

  const moviesPerPage = 12;
  const totalPages = 1;

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const startIndex = (currentPage - 1) * moviesPerPage;
  const selectedMovies = movies.slice(startIndex, startIndex + moviesPerPage);

  return (
    <div>
      <div className="recommendations-container-r">
        <div className="movies-grid-r">
          {selectedMovies.map((movie) => (
            <div key={movie.id} className="movie-card-r" >
              <Link to={`/details/movie/${movie.id}`}>
                <img
                  src={MovieApi.getImage(movie.poster_path)}
                  alt={movie.title}
                />
                <div className="movie-info-r">
                  <h3>{movie.title}</h3>
                  <p>{movie.vote_average}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="navigation-buttons-r">
          {currentPage > 1 && (
            <button onClick={handlePrevPage} className="nav-button-r prev-r">
              &lt;
            </button>
          )}
          {currentPage < totalPages && (
            <button onClick={handleNextPage} className="nav-button-r next-r">
              &gt;
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
