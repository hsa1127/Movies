import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Detail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const getMovie = async () => {
    const response = await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`);
    const json = await response.json();
    setMovie(json.data.movie);
    setLoading(false);
  };

  useEffect(() => {
    getMovie();
  }, [id]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#121212',
      color: 'white',
      padding: '20px',
      textAlign: 'center'
    }}>
      <h1 style={{
        fontSize: '2.5rem',
        marginBottom: '20px',
        color: '#e50914'
      }}>
        {movie.title}
      </h1>
      <p style={{
        fontSize: '1.2rem',
        lineHeight: '1.6',
        marginBottom: '20px'
      }}>
        {movie.description_full}
      </p>
      <img src={movie.large_cover_image} alt={movie.title} style={{
        maxWidth: '100%',
        height: 'auto',
        borderRadius: '10px'
      }} />
    </div>
  );
}

export default Detail;
