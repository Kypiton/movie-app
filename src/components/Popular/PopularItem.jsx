import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import styles from './PopularItem.module.css';
import movieService from '../../utils/movie';
import img from '../../assets/image-not-found.jpg';
import err from '../../assets/7VE.gif';

export default function PopularItem() {
  const [popularItem, setPopularItem] = useState();
  const [loading, setLoading] = useState(true);
  const { popularId } = useParams();
  const navigate = useNavigate();

  async function getFilms() {
    try {
      const data = await movieService.fetchPopularById(popularId);
      setPopularItem(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getFilms();
  }, [popularId]);

  if (!popularItem && !loading) {
    return (
      <>
        <img src={err} alt='err' style={{ display: 'block', margin: '0 auto' }} />
        <button onClick={() => navigate('/popular')}>Go back</button>
      </>
    );
  }

  return (
    <div className={styles.container}>
      {popularItem ? (
        <>
          {loading ? (
            <Spinner />
          ) : (
            <div className={styles.aboutFilm}>
              <div className={styles.left}>
                <img
                  src={
                    popularItem.poster_path
                      ? `https://image.tmdb.org/t/p/w500${popularItem.poster_path}`
                      : img
                  }
                  alt={popularItem.name}
                  className={styles.image}
                />
              </div>
              <div className={styles.right}>
                <h2 className={styles.title}>{popularItem.name}</h2>
                <p>
                  {popularItem.tagline ? (
                    <>
                      <b>Слоган</b>: {popularItem.tagline}
                    </>
                  ) : null}
                </p>
                <p>
                  {popularItem.first_air_date ? (
                    <>
                      <b>Год</b>: {popularItem.first_air_date?.slice(0, 4)}
                    </>
                  ) : null}
                </p>
                <p>
                  {popularItem.production_countries ? (
                    <>
                      <b>Страна</b>:{' '}
                      {popularItem.production_countries.map(country => country.name).join(', ')}
                    </>
                  ) : null}
                </p>
                <p>
                  {popularItem.genres ? (
                    <>
                      <b>Жанр</b>: {popularItem.genres.map(genre => genre.name).join(', ')}
                    </>
                  ) : null}
                </p>
                <p>
                  {popularItem.seasons ? (
                    <>
                      <b>Количество сезонов</b>: {popularItem.seasons.map(season => season).length}
                    </>
                  ) : null}
                </p>
                <p>
                  {popularItem.homepage ? (
                    <>
                      <b>Смотреть этот фильм</b>:{' '}
                      <a href={popularItem.homepage} className={styles.blinking}>
                        {popularItem.name}
                      </a>
                    </>
                  ) : null}
                </p>
                <p style={{ maxWidth: 600 }}>
                  {popularItem.overview ? (
                    <>
                      <b>Описание</b>: {popularItem.overview}
                    </>
                  ) : null}
                </p>
              </div>
            </div>
          )}
          <br />
          <button onClick={() => navigate('/popular')}>Go Back</button>
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
}
