import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withFilms } from '../../HOC/withFilms';
import Spinner from '../Spinner/Spinner';
import styles from './Serials.module.css';
import movieService from '../../utils/movie';

export const Serials = ({ loading, films }) => (
  <div className={styles.container}>
    <h2 className={styles.title}>Сериалы</h2>
    {loading ? (
      <Spinner />
    ) : (
      <ul className={styles.menu_list}>
        {films.map(function (item) {
          const id = item.id;
          return (
            <li key={id} className={styles.list}>
              <Link to={`/serials/${id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt={item.title}
                  className={styles.image}
                />
              </Link>
              <div className={styles.description}>
                <Link to={`/serials/${id}`} className={styles.link_title}>
                  <p>{item.name}</p>
                </Link>
                <p>Rate: {item.vote_average}</p>
                <p>{item.first_air_date.slice(0, 4)}</p>
                <p>Language: {item.original_language}</p>
              </div>
            </li>
          );
        })}
      </ul>
    )}
  </div>
);

Serials.propTypes = {
  loading: PropTypes.bool,
  films: PropTypes.array,
};

export default withFilms(Serials, movieService.fetchSerials());
