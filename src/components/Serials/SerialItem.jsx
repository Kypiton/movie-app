import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import styles from './SerialItem.module.css';
import movieService from '../../utils/movie';
import img from '../../assets/image-not-found.jpg';
import err from '../../assets/7VE.gif';

export default function SerialItem() {
  const [serialItem, setSerialItem] = useState();
  const [loading, setLoading] = useState(true);
  const { serialId } = useParams();
  const navigate = useNavigate();

  async function getFilms() {
    try {
      const data = await movieService.fetchPopularById(serialId);
      setSerialItem(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getFilms();
  }, [serialId]);

  if (!serialItem && !loading) {
    return (
      <>
        <img src={err} alt='err' style={{ display: 'block', margin: '0 auto' }} />
        <button onClick={() => navigate('/serials')}>Go back</button>
      </>
    );
  }

  return (
    <div className={styles.container}>
      {serialItem ? (
        <>
          {loading ? (
            <Spinner />
          ) : (
            <div className={styles.aboutFilm}>
              <div className={styles.left}>
                <img
                  src={
                    serialItem.poster_path
                      ? `https://image.tmdb.org/t/p/w500${serialItem.poster_path}`
                      : img
                  }
                  alt={serialItem.name}
                  className={styles.image}
                />
              </div>
              <div className={styles.right}>
                <h2 className={styles.title}>{serialItem.name}</h2>
                <p>
                  {serialItem.tagline ? (
                    <>
                      <b>Слоган</b>: {serialItem.tagline}
                    </>
                  ) : null}
                </p>
                <p>
                  {serialItem.first_air_date ? (
                    <>
                      <b>Год</b>: {serialItem.first_air_date?.slice(0, 4)}
                    </>
                  ) : null}
                </p>
                <p>
                  {serialItem.production_countries ? (
                    <>
                      <b>Страна</b>:{' '}
                      {serialItem.production_countries.map(country => country.name).join(', ')}
                    </>
                  ) : null}
                </p>
                <p>
                  {serialItem.genres ? (
                    <>
                      <b>Жанр</b>: {serialItem.genres.map(genre => genre.name).join(', ')}
                    </>
                  ) : null}
                </p>
                <p>
                  {serialItem.seasons ? (
                    <>
                      <b>Количество сезонов</b>: {serialItem.seasons.map(season => season).length}
                    </>
                  ) : null}
                </p>
                <p>
                  {serialItem.homepage ? (
                    <>
                      <b>Смотреть этот фильм</b>:{' '}
                      <a href={serialItem.homepage} className={styles.blinking}>
                        {serialItem.name}
                      </a>
                    </>
                  ) : null}
                </p>
                <p style={{ maxWidth: 600 }}>
                  {serialItem.overview ? (
                    <>
                      <b>Описание</b>: {serialItem.overview}
                    </>
                  ) : null}
                </p>
              </div>
            </div>
          )}
          <br />
          <button onClick={() => navigate('/serials')}>Go Back</button>
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
}
