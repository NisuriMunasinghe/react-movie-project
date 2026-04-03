import "../css/Favorites.css";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";

function Favorites() {
  const { favorites } = useMovieContext();

  if (favorites.length > 0) {
    return (
      <div className="favorites">
        <h2>Your Favorite Movies</h2>
        <div className="movie-grid">
          {favorites.map(movie =>
          (<MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    );
  }

  return (<div className="favorites-empty">
    <h2>No Favorite Movies Yet</h2>
    <p>Start adding movies to your favorites!</p>
  </div>
  );
}

export default Favorites