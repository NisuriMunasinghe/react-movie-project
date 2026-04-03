import "../css/Home.css";
import MovieCard from "../components/MovieCard"
import { useEffect, useState } from "react"
import { searchMovies, getPopularMovies } from "../services/api";

function Home() {
    const [searchTerm, setSearchTerm] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies);
            } catch (err) {
                console.error(err);
                setError("Failed to load popular movies. Please try again later.");
            }
            finally {
                setLoading(false);
            }
        }
        loadPopularMovies();
    }, [])


    const handleSearch = async(e) => {
        e.preventDefault();
        if (!searchTerm.trim()) return
        if (loading) return
        setLoading(true)
        try {
            const searchResults = await searchMovies(searchTerm);
            setMovies(searchResults);
            setError(null);
        } catch (err) {
            console.error(err);
            setError("Failed to search movies. Please try again later.");
        }
        finally {
            setLoading(false);
        }
    }

    return <div className="home">
        <form onSubmit={handleSearch} className="search-form">
            <input
                type="text"
                placeholder="Search for a movie..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="search-button">Search</button>
        </form>

        {error && <div className="error">{error}</div>}

        { loading ? (
        <div className="Loading">Loading...</div>
        ) : (
        <div className="movie-grid">
            {movies.map(movie =>
            (<MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
        )}
    </div>
}

export default Home