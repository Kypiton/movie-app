import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import movieService from '../../utils/movie';
import { menu_items } from '../../utils/data';
import logo from '../../assets/logo.png';
import styles from './Header.module.css';

export default function Header({ authorized, username, setUsername, setAuthorized }) {
  const [toggle, setToggle] = useState(false);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem('username');
    localStorage.removeItem('authorized');
    setUsername('');
    setAuthorized(false);
    navigate('/login');
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      handleSearch();
    }
  }

  function handleToggle() {
    setToggle(toggle => !toggle);
  }

  async function handleSearch() {
    try {
      const movies = await movieService.searchMovies(search);
      const serials = await movieService.searchSerials(search);
      const pictures = [...movies, ...serials];
      if (pictures.length > 0) {
        const firstMedia = pictures[0];
        navigate(`/${firstMedia.title ? 'films' : 'serials'}/${firstMedia.id}`);
      } else navigate('nothing');
      setSearch('');
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    handleSearch();
  }, []);

  useEffect(() => {
    const authorized = localStorage.getItem('authorized');
    const username = localStorage.getItem('username');
    if (username) setUsername(JSON.parse(username));
    if (authorized) setAuthorized(true);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <ul className={styles.menu}>
          <li>
            <Link to={authorized ? '/popular' : '/login'}>
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
        {toggle && authorized && (
          <div>
            <input
              type='text'
              className={styles.search}
              value={search}
              onChange={e => setSearch(e.target.value)}
              onKeyDown={handleKeyPress}
            />
          </div>
        )}
        <svg
          height='18'
          width='18'
          className={styles.icon}
          viewBox='0 0 16 16'
          onClick={handleToggle}
        >
          <path d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'></path>
        </svg>
        {authorized && <button onClick={handleLogout}>Log Out</button>}
        {authorized && <p>{username}</p>}
      </div>
    </header>
  );
}

Header.propTypes = {
  authorized: PropTypes.bool,
  username: PropTypes.string,
  setUsername: PropTypes.func,
  setAuthorized: PropTypes.func,
};
