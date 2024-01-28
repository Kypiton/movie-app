import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import styles from './Popular.module.css';
import movieService from '../../utils/movie';
import img from '../../assets/image-not-found.jpg';
import err from '../../assets/7VE.gif';

export default function Popular() {
  const [films, setFilms] = useState();
  const [loading, setLoading] = useState(true);
  const { popularId } = useParams();
  const navigate = useNavigate();

  async function getFilms() {
    try {
      const data = await movieService.fetchPopularById(popularId);
      setFilms(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getFilms();
  }, [popularId]);

  if (!films && !loading) {
    return (
      <>
        <img src={err} alt='err' style={{ display: 'block', margin: '0 auto' }} />
        <button onClick={() => navigate(-1)}>Go back</button>
      </>
    );
  }

  return (
    <div className={styles.container}>
      {films ? (
        <>
          <h2 className={styles.title}>{films.name}</h2>
          <button onClick={() => navigate(-1)}>Go Back</button>
          <br />
          <br />
          {loading ? (
            <Spinner />
          ) : (
            <ul className={styles.menu_list}>
              <li className={styles.list}>
                <a href='#'>
                  <img
                    src={
                      films.backdrop_path
                        ? `https://image.tmdb.org/t/p/w500${films.backdrop_path}`
                        : img
                    }
                    alt={films.name}
                    className={styles.image}
                  />
                </a>
                <div className={styles.description}>
                  <a href='#' className={styles.link_title}>
                    <p>{films.name}</p>
                  </a>
                  <p>Popularity: {films.popularity}</p>
                  <p>Last date: {films.last_air_date?.slice(0, 4) || 'Soon'}</p>
                  <p>Language: {films.original_language}</p>
                </div>
              </li>
            </ul>
          )}
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
}
