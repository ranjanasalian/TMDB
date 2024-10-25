import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Card from "./Card";
let API_key = "&api_key=a615c902f9f5dcd954afca90ba540a60";
let base_url = "https://api.themoviedb.org/3";
let url = base_url + "/trending/movie/day?" + API_key;
let arr = ["POPULAR", "THEATRE", "KIDS", "DRAMA", "COMEDY"];

export default function Main() {
  const [movieData, setMovieData] = useState([]);
  const [url_set, setUrl] = useState(url);
  const [search, setSearch] = useState([]);

  const handleSearch = (event) => {
    event.preventDefault();
    if (search.trim() !== "") {
      const searchUrl =
        base_url +
        "/search/movie?api_key=a615c902f9f5dcd954afca90ba540a60&query=" +
        search;
      setUrl(searchUrl);
    }
  };

  function searchMovie(evt) {
    if (evt.key === "Enter") {
      evt.preventDefault();
      const searchUrl =
        base_url +
        "/search/movie?api_key=a615c902f9f5dcd954afca90ba540a60&query=" +
        search;
      setUrl(searchUrl);
      // window.location.hash = "#";
    }
  }

  useEffect(() => {
    fetch(url_set)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.results);
        setMovieData(data.results);
      });
  }, [url_set]);

  const getData = (movieType) => {
    if (movieType === "POPULAR") {
      url = base_url + "/movie/popular?" + API_key;
    }
    if (movieType === "THEATRE") {
      url = base_url + "/movie/now_playing?" + API_key;
    }
    if (movieType === "KIDS") {
      url = base_url + "/discover/movie?" + API_key + "&with_genres=10751";
    }
    if (movieType === "DRAMA") {
      url = base_url + "/tv/popular?" + API_key;
    }
    if (movieType === "COMEDY") {
      url = base_url + "/discover/movie?" + API_key + "&with_genres=35";
    }
    setUrl(url);
  };

  return (
    <>
      <div className="header">
        <nav>
          <ul>
            {arr.map((value) => {
              return (
                <li key={value}>
                  <a
                    href="#"
                    name={value}
                    onClick={(e) => {
                      getData(e.target.name);
                    }}
                  >
                    {value}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
        <form>
          <div className="search-btn">
            <input
              type="text"
              placeholder="Enter Movie Name"
              className="inputText"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              value={search}
              onKeyDown={searchMovie}
            ></input>
            <button>
              <FaSearch onClick={handleSearch} />
            </button>
          </div>
        </form>
      </div>
      <div className="container">
        {movieData.length === 0 ? (
          <p className="notfound"> Not Found </p>
        ) : (
          movieData.map((res, pos) => {
            return <Card info={res} key={pos} />;
          })
        )}
      </div>
    </>
  );
}
