import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import styles from './FilmItem.module.css';
import movieService from '../../utils/movie';
import img from '../../assets/image-not-found.jpg';
import err from '../../assets/7VE.gif';

export default function FilmItem() {
  const [filmItem, setFilmItem] = useState();
  const [filmItem2, setFilmItem2] = useState();
  const [loading, setLoading] = useState(true);
  const { filmId } = useParams();
  const navigate = useNavigate();

  async function getFilms() {
    try {
      const data1 = await movieService.fetchFilmById(filmId);
      const data2 = await movieService.fetchCreditsFilmId(filmId);
      setFilmItem(data1);
      setFilmItem2(data2.slice(0, 10).map(item => item.original_name));
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getFilms();
  }, [filmId]);

  if (!filmItem && !filmItem2 && !loading) {
    return (
      <>
        <img src={err} alt='err' style={{ display: 'block', margin: '0 auto' }} />
        <button onClick={() => navigate('/films')}>Go back</button>
      </>
    );
  }

  console.log(filmItem2);

  return (
    <div className={styles.container}>
      {filmItem ? (
        <>
          {loading ? (
            <Spinner />
          ) : (
            <div className={styles.aboutFilm}>
              <div className={styles.left}>
                <img
                  src={
                    filmItem.poster_path
                      ? `https://image.tmdb.org/t/p/w500${filmItem.poster_path}`
                      : img
                  }
                  alt={filmItem.title}
                  className={styles.image}
                />
              </div>
              <div className={styles.right}>
                <h2 className={styles.title}>{filmItem.title}</h2>
                <p>
                  {filmItem.tagline ? (
                    <>
                      <b>Слоган</b>: {filmItem.tagline}
                    </>
                  ) : null}
                </p>
                <p>
                  {filmItem.release_date ? (
                    <>
                      <b>Год</b>: {filmItem.release_date?.slice(0, 4)}
                    </>
                  ) : null}
                </p>
                <p>
                  {filmItem.production_countries.length === 0 ? null : (
                    <>
                      <b>Страна</b>:{' '}
                      {filmItem.production_countries.map(country => country.name).join(', ')}
                    </>
                  )}
                </p>
                <p>
                  {filmItem.genres ? (
                    <>
                      <b>Жанр</b>: {filmItem.genres.map(genre => genre.name).join(', ')}
                    </>
                  ) : null}
                </p>
                <p>
                  {filmItem.homepage ? (
                    <>
                      <b>Смотреть этот фильм</b>:{' '}
                      <a href={filmItem.homepage} className={styles.blinking}>
                        {filmItem.title}
                      </a>
                    </>
                  ) : null}
                </p>
                <p>
                  {!filmItem2 ? null : (
                    <>
                      <b>Актеры</b>: {filmItem2.map(item => item).join(', ')}
                    </>
                  )}
                </p>
                <p style={{ maxWidth: 600 }}>
                  {filmItem.overview ? (
                    <>
                      <b>Описание</b>: {filmItem.overview}
                    </>
                  ) : null}
                </p>
              </div>
            </div>
          )}
          <br />
          <button onClick={() => navigate('/films')}>Go Back</button>
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
}
