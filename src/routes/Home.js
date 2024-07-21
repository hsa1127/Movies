import { useEffect,useState } from "react";
import Movie from "../components/Movie";
import styles from "./Home.module.css";

function Home(){
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
  
    useEffect(() => {
      fetch("https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year")
        .then((response) => response.json())
        .then((json) => {
          setMovies(json.data.movies);
          setLoading(false); // 데이터가 로드된 후에 로딩 상태를 false로 설정
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false); // 에러가 발생해도 로딩 상태를 false로 설정
        });
    }, []);
  
    console.log(movies);
  
    return (
      <div  className={styles.container}>
        {loading ? (
          <h1>Loading...</h1>
          
        ) : (
          <div className={styles.movies}>
            {movies.map((movie) => (
             
             <Movie
             key={movie.id}
             id={movie.id}
             coverImg={movie.medium_cover_image} 
             title={movie.title}
             summary={movie.summary}
             genres = {movie.genres}
             />
            ))}
          </div>
        )}
      </div>
    );
}

export default Home;