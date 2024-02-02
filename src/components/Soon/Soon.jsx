import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import styles from './Soon.module.css';
import movieService from '../../utils/movie';
import img from '../../assets/image-not-found.jpg';

export default function Soon() {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getFilms() {
    try {
      const data = await movieService.fetchSoon();
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
      <h2 className={styles.title}>Скоро</h2>
      {loading ? (
        <Spinner />
      ) : (
        <ul className={styles.menu_list}>
          {films.map(function (item) {
            const id = item.id;
            return (
              <li key={id} className={styles.list}>
                <Link to={`/soon/${id}`}>
                  <img
                    src={
                      item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : img
                    }
                    alt={item.title}
                    className={styles.image}
                  />
                </Link>
                <div className={styles.description}>
                  <Link to={`/soon/${id}`} className={styles.link_title}>
                    <p>{item.title}</p>
                  </Link>
                  <p>Rate: {item.vote_average}</p>
                  <p>{item.release_date.slice(0, 4)}</p>
                  <p>Language: {item.original_language}</p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
