import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { menu_items } from '../../utils/data';
import logo from '../../assets/logo.png';

import styles from './Header.module.css';

export default function Header({ authorized, username }) {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <ul className={styles.menu}>
          <li>
            <Link to='/popular'>
              <img src={logo} alt='logo' className={styles.logo} />
            </Link>
          </li>
          {menu_items.map(({ id, nameRu, nameEn }) => (
            <li key={id} className={styles.list}>
              <Link to={authorized ? `/${nameEn}` : '/login'} className={styles.link}>
                {nameRu.toUpperCase()}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.right}>
        <svg height='18' width='18' className={styles.icon} viewBox='0 0 16 16'>
          <path d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'></path>
        </svg>
        {authorized && <button>Log Out</button>}
        {authorized && <p>{username}</p>}
      </div>
    </header>
  );
}

Header.propTypes = {
  authorized: PropTypes.bool,
  username: PropTypes.string,
};
