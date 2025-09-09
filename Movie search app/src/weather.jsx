import { useState } from "react";
import './App.css'

function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);

  const API_KEY = 'YOUR_OMDB_API_KEY_HERE';

  const searchMovies = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError('');
    setMovies([]);
    setSelectedMovie(null);
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`
      );
      const data = await response.json();
      if (data.Response === 'True') {
        setMovies(data.Search);
      } else {
        setError(data.Error);
      }
    } catch (err) {
      setError('Failed to fetch movies');
    } finally {
      setLoading(false);
    }
  };

  const fetchMovieDetails = async (imdbID) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?i=${imdbID}&apikey=${API_KEY}`
      );
      const data = await response.json();
      setSelectedMovie(data);
    } catch (err) {
      setError('Failed to fetch movie details');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: '2rem auto' }}>
      <h1>Movie Search App</h1>
      <form onSubmit={searchMovies}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies..."
          style={{ marginRight: '0.5rem', width: '300px' }}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {movies.length > 0 && (
        <div>
          <h2>Results:</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            {movies.map((movie) => (
              <div
                key={movie.imdbID}
                onClick={() => fetchMovieDetails(movie.imdbID)}
                style={{
                  border: '1px solid #ccc',
                  padding: '1rem',
                  cursor: 'pointer',
                  width: '200px',
                }}
              >
                <img
                  src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150'}
                  alt={movie.Title}
                  style={{ width: '100%' }}
                />
                <h3>{movie.Title}</h3>
                <p>{movie.Year}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* We'll add details here */}
      {selectedMovie &&(
        <div style={{ marginTop: '2rem', border: '1px solid #ccc', padding: '1rem' }}>
            <h2>{selectedMovie.Title}</h2>
            <img  src={selectedMovie.Poster !== 'N/A' ? selectedMovie.Poster : 'https://via.placeholder.com/300'}
            alt={selectedMovie.Title}
            style={{ width: '300px' }}/>
                      <p><strong>Year:</strong> {selectedMovie.Year}</p>
          <p><strong>Genre:</strong> {selectedMovie.Genre}</p>
          <p><strong>Plot:</strong> {selectedMovie.Plot}</p>
          <p><strong>IMDB Rating:</strong> {selectedMovie.imdbRating}</p>
        </div>
      )}
    </div>
  );
}

export default App;