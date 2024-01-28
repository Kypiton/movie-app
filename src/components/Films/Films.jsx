import { useState, useEffect } from 'react';
import Spinner from '../Spinner/Spinner';
import styles from './Films.module.css';
import movieService from '../../utils/movie';

export default function Films() {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getFilms() {
    try {
      const data = await movieService.fetchFilms();
      setFilms(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getFilms();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Фильмы</h2>
      {loading ? (
        <Spinner />
      ) : (
        <ul className={styles.menu_list}>
          {films.map(item => (
            <li key={item.id} className={styles.list}>
              <a href='#'>
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt={item.title}
                  className={styles.image}
                />
              </a>
              <div className={styles.description}>
                <a href='#' className={styles.link_title}>
                  <p>{item.title}</p>
                </a>
                <p>Rate: {item.vote_average}</p>
                <p>{item.release_date.slice(0, 4)}</p>
                <p>Language: {item.original_language}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
