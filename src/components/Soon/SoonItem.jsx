import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import styles from './SoonItem.module.css';
import movieService from '../../utils/movie';
import img from '../../assets/image-not-found.jpg';
import err from '../../assets/7VE.gif';

export default function SoonItem() {
  const [soonItem, setSoonItem] = useState();
  const [loading, setLoading] = useState(true);
  const { soonId } = useParams();
  const navigate = useNavigate();

  async function getFilms() {
    try {
      const data = await movieService.fetchFilmById(soonId);
      setSoonItem(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getFilms();
  }, [soonId]);

  if (!soonItem && !loading) {
    return (
      <>
        <img src={err} alt='err' style={{ display: 'block', margin: '0 auto' }} />
        <button onClick={() => navigate('/soon')}>Go back</button>
      </>
    );
  }

  return (
    <div className={styles.container}>
      {soonItem ? (
        <>
          {loading ? (
            <Spinner />
          ) : (
            <div className={styles.aboutFilm}>
              <div className={styles.left}>
                <img
                  src={
                    soonItem.poster_path
                      ? `https://image.tmdb.org/t/p/w500${soonItem.poster_path}`
                      : img
                  }
                  alt={soonItem.title}
                  className={styles.image}
                />
              </div>
              <div className={styles.right}>
                <h2 className={styles.title}>{soonItem.title}</h2>
                <p>
                  {soonItem.tagline ? (
                    <>
                      <b>Слоган</b>: {soonItem.tagline}
                    </>
                  ) : null}
                </p>
                <p>
                  {soonItem.release_date ? (
                    <>
                      <b>Год</b>: {soonItem.release_date?.slice(0, 4)}
                    </>
                  ) : null}
                </p>
                <p>
                  {soonItem.production_countries.length === 0 ? null : (
                    <>
                      <b>Страна</b>:{' '}
                      {soonItem.production_countries.map(country => country.name).join(', ')}
                    </>
                  )}
                </p>
                <p>
                  {soonItem.genres ? (
                    <>
                      <b>Жанр</b>: {soonItem.genres.map(genre => genre.name).join(', ')}
                    </>
                  ) : null}
                </p>
                <p>
                  {soonItem.homepage ? (
                    <>
                      <b>Смотреть этот фильм</b>:{' '}
                      <a href={soonItem.homepage} className={styles.blinking}>
                        {soonItem.title}
                      </a>
                    </>
                  ) : null}
                </p>
                <p style={{ maxWidth: 600 }}>
                  {soonItem.overview ? (
                    <>
                      <b>Описание</b>: {soonItem.overview}
                    </>
                  ) : null}
                </p>
              </div>
            </div>
          )}
          <br />
          <button onClick={() => navigate('/soon')}>Go Back</button>
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
}
