import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/Main.css"; // Make sure to import the CSS file
import { FaYoutube, FaRegClock } from "react-icons/fa";
import Modal from "./Modal";

export default function MovieDetails() {
  const { id } = useParams();
  const [movieDetail, setMovieDetail] = useState(null);
  const [cast, setCast] = useState([]); // State to hold cast information
  const [director, setDirector] = useState(""); // State to hold director name
  const [trailerKey, setTrailerKey] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

    async function fetchCredits() {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_key}`
      );
      const data = await response.json();
      setCast(data.cast); // Set cast information
      const directorData = data.crew.find(
        (member) => member.job === "Director"
      );
      if (directorData) setDirector(directorData.name); // Set director name
    }

    fetchMovieDetail();
    fetchTrailer();
    fetchCredits(); // Fetch cast and director information
  }, [id]);

  if (!movieDetail) return <p>Loading...</p>;

  function handleclick() {
    navigate("/");
  }

  function getYear(dateString) {
    const date = new Date(dateString);
    return date.getFullYear();
  }

  function convertToTotalMinutes(date) {
    const hours = date.getHours(); // Get hours (0-23)
    const minutes = date.getMinutes(); // Get minutes (0-59)
    return hours * 60 + minutes; // Total minutes
  }

  // Parse release_date to get time and total minutes
  const releaseDate = new Date(movieDetail.release_date);
  const totalMinutes = convertToTotalMinutes(releaseDate);

  function openModal() {
    setIsModalOpen(true);
  } // Function to open modal

  function closeModal() {
    setIsModalOpen(false);
  } // Function to close modal

  function openTrailerInNewTab() {
    if (trailerKey) {
      window.open(`https://www.youtube.com/watch?v=${trailerKey}`, "_blank");
    } else {
      alert("Trailer not available");
    }
  }

  return (
    <>
      <div className="title-bar" onClick={handleclick}>
        <div className="title">Movieware</div>
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
            <button className="close-button" onClick={handleclick}>
              &times;
            </button>
            <p>{getYear(movieDetail.release_date)}</p>
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

            <p>{movieDetail.overview}</p>
            <p className="total-minutes">
              <FaRegClock /> {totalMinutes} mins
            </p>
            <button
              onClick={openTrailerInNewTab}
              className="watch-trailer-button"
            >
              <FaYoutube /> Watch Trailer
            </button>
          </div>
        </div>
      </div>

      <div className="cast-section">
        <h3>Cast</h3>
        <div className="cast-list">
          {cast.map((actor) => (
            <div key={actor.id} className="cast-member">
              <img src={img_path + actor.profile_path} alt={actor.name} />
              <p>{actor.name}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
