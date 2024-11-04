import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../styles/Main.css"; // Make sure to import the CSS file
import { FaYoutube } from "react-icons/fa";

export default function MovieDetails() {
  const { id } = useParams();
  const [movieDetail, setMovieDetail] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const API_key = "a615c902f9f5dcd954afca90ba540a60";
  const img_path = "https://image.tmdb.org/t/p/w500";
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchMovieDetail() {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_key}`
      );
      const data = await response.json();
      setMovieDetail(data);
    }

    async function fetchTrailer() {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_key}`
      );
      const data = await response.json();
      const trailer = data.results.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );
      if (trailer) setTrailerKey(trailer.key);
    }

    fetchMovieDetail();
    fetchTrailer();
  }, [id]);

  if (!movieDetail) return <p>Loading...</p>;

  function handleclick() {
    navigate("/");
  }

  // function handleButtonClick() {
  //   navigate(`https://www.youtube.com/embed/${trailerKey}`);
  // }

  return (
    <>
      <div className="title-bar" onClick={handleclick}>
        Movieware
      </div>
      <div
        className="movie-details-container"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movieDetail.backdrop_path})`,
        }}
      >
        <div className="movie-details-overlay">
          <div className="movie-poster-img">
            <img
              src={img_path + movieDetail.poster_path}
              alt={movieDetail.title}
            />
          </div>
          <div className="movie-details-content">
            <h1>{movieDetail.title}</h1>
            <div className="ratings-section">
              <p className="p">User Score</p>
              <div
                className="progress"
                style={{ "--i": (movieDetail.vote_average / 10) * 100 }}
              >
                <p>{Math.round((movieDetail.vote_average / 10) * 100)}%</p>
              </div>
              <p>
                . {movieDetail.genres.map((genre) => genre.name).join("| ")} .
              </p>
            </div>

            <p>
              <strong>Overview:</strong> {movieDetail.overview}
            </p>
            <p>
              <strong>Release Date:</strong> {movieDetail.release_date}
            </p>

            {/* Embed the trailer */}
            {trailerKey && (
              <Link
                to={`https://www.youtube.com/watch?v=${trailerKey}`}
                target="_blank"
                rel="noopener noreferrer"
                className="watch-trailer-button"
              >
                <span>
                  <FaYoutube />
                </span>{" "}
                Watch Trailer
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
