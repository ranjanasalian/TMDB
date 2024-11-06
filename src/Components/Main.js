import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Card from "./Card";
import "../styles/Main.css";

const API_KEY = "&api_key=a615c902f9f5dcd954afca90ba540a60";
const BASE_URL = "https://api.themoviedb.org/3";

export default function Main() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [theatreMovies, setTheatreMovies] = useState([]);
  const [kidsMovies, setKidsMovies] = useState([]);
  const [dramaMovies, setDramaMovies] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);
  const [search, setSearch] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();
    if (search.trim() !== "") {
      fetchMovies(
        BASE_URL +
          "/search/movie?api_key=a615c902f9f5dcd954afca90ba540a60&query=" +
          search,
        setTrendingMovies
      );
    }
  };

  const fetchMovies = async (url, setState) => {
    const response = await fetch(url);
    const data = await response.json();
    setState(data.results);
  };

  useEffect(() => {
    // Fetch movies for each section when the component loads
    fetchMovies(BASE_URL + "/trending/movie/day?" + API_KEY, setTrendingMovies);
    fetchMovies(BASE_URL + "/movie/now_playing?" + API_KEY, setTheatreMovies);
    fetchMovies(
      BASE_URL + "/discover/movie?" + API_KEY + "&with_genres=10751",
      setKidsMovies
    );
    fetchMovies(
      BASE_URL + "/discover/movie?" + API_KEY + "&with_genres=18",
      setDramaMovies
    );
    fetchMovies(
      BASE_URL + "/discover/movie?" + API_KEY + "&with_genres=35",
      setComedyMovies
    );
  }, []);

  // Render each section of movies
  const renderSection = (title, movies) => (
    <div className="section">
      <h1>{title}</h1>
      <div className="movie-list">
        {movies.length === 0 ? (
          <p className="notfound">Not Found</p>
        ) : (
          movies.map((movie, index) => <Card info={movie} key={index} />)
        )}
      </div>
    </div>
  );

  return (
    <>
      <div className="title-bar">
        <div className="title">Movieware</div>
      </div>
      <div className="main">
        {/* Search bar */}
        <div className="head-search-button">
          <h1 className="discover">
            Discover countless movies, TV shows, and personalities—start
            exploring today!
          </h1>
          <form onSubmit={handleSearch}>
            <div className="search-btn">
              <input
                type="text"
                placeholder="search for movies...."
                className="inputText"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
              <button type="submit">
                <FaSearch />
              </button>
            </div>
          </form>
        </div>
        <div className="movie-info">
          {/* Movie Sections */}
          <p>{renderSection("Trending Movies", trendingMovies)}</p>
          <p>{renderSection("Movies in Theatre", theatreMovies)}</p>
          <p>{renderSection("For Kids", kidsMovies)}</p>
          <p> {renderSection("Drama", dramaMovies)}</p>
          <p>{renderSection("Comedy", comedyMovies)}</p>
        </div>
      </div>
    </>
  );
}
