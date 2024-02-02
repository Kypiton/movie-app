import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import styles from './Soon.module.css';
import movieService from '../../utils/movie';
import img from '../../assets/image-not-found.jpg';
import err from '../../assets/7VE.gif';

export default function SoonItem() {
  const [films, setFilms] = useState();
  const [loading, setLoading] = useState(true);
  const { soonId } = useParams();
  const navigate = useNavigate();

  async function getFilmById() {
    try {
      const data = await movieService.fetchPopularById(soonId);
      setFilms(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getFilmById();
  }, [soonId]);

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
                  <p>{films.name}</p>
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
