import "./App.css";
import Main from "./Components/Main";
import MovieDetail from "./Components/MovieDetail"; // New import
import "./styles/Main.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // New import

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
