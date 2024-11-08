import React from "react";
import { useNavigate } from "react-router-dom";
// import Poster from "../images/Dark.jpg";

export default function Card(movie) {
  console.log(movie.info);
  let img_path = "https://image.tmdb.org/t/p/w500";

  const navigate = useNavigate();
  const Rating = Math.round((movie.info.vote_average / 10) * 100);

  const handleClick = () => {
    navigate(`/movie/${movie.info.id}`); // Navigate to movie details page
  };
  return (
    <>
      <div className="movie" onClick={handleClick}>
        <img src={img_path + movie.info.poster_path} className="poster"></img>
        <div className="movie-details">
          <div className="box">
            <h4 className="title"> {movie.info.title}</h4>
            <div className="rating" style={{ "--i": Rating }}>
              <p>{Rating}%</p>
            </div>
          </div>
          <div className="overview">
            <h1>overview</h1>
            {movie.info.overview}
          </div>
        </div>
      </div>
    </>
  );
}
