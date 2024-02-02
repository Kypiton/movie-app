import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import { menu_items } from '../../utils/data';
import logo from '../../assets/logo.png';

import styles from './Header.module.css';
import Spinner from '../Spinner/Spinner';

export default function Header() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();

  console.log(isAuthenticated);

  function handleToggle() {
    setToggle(toggle => !toggle);
  }

  useEffect(() => {
    if (isAuthenticated) {
      const userInfo = {
        name: user?.name,
        email: user?.email,
        picture: user?.picture,
      };
      const userJSON = JSON.stringify(userInfo);
      localStorage.setItem('user', userJSON);
    }
  }, [isAuthenticated, user]);

  if (isLoading) return <Spinner />;
  if (!isAuthenticated) navigate('/');

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
              <Link to={nameEn ? `/${nameEn}` : '/'} className={styles.link}>
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
        {isAuthenticated && (
          <div>
            <img
              src={user.picture}
              alt={user.name}
              className={styles.userImg}
              onClick={handleToggle}
            />
            {toggle && (
              <>
                <h2>{user.name}</h2>
                <p>{user.email}</p>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
