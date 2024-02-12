import PropTypes from 'prop-types';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import movieService from '../../utils/movie';
import { User, Auth, Username } from '../Layout/Layout';

import styles from './Auth.module.css';

export default function Login() {
  const [message, setMessage] = useState('');
  const [password, setPassword] = useState('');
  const setAuthorized = useContext(Auth);
  const setUsername = useContext(User);
  const username = useContext(Username);
  // const authorized = useContext(Authorized);
  const navigate = useNavigate();

  async function getFilms() {
    try {
      const data = await movieService.auth();
      setMessage(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getFilms();
  }, []);

  // useEffect(() => {
  //   localStorage.setItem('username', JSON.stringify(username));
  //   localStorage.setItem('password', JSON.stringify(password));
  //   localStorage.setItem('authorized', JSON.stringify(authorized));
  // }, [username, password, authorized]);

  // useEffect(() => {
  //   const storedUsername = localStorage.getItem('username');
  //   const storedAuthorized = localStorage.getItem('authorized');

  //   if (storedUsername) setUsername(JSON.parse(storedUsername));
  //   if (storedAuthorized) setAuthorized(prev => !prev);
  // }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (username === 'Dan4ikAvansys' && password === 'reactmovie' && message.success) {
      setAuthorized(true);
      navigate('/films');
    } else navigate('/login');
  }

  return (
    <form className={styles.logIn} onSubmit={handleSubmit}>
      <div>
        <label htmlFor='username' className={styles.label}>
          Username:
        </label>
        <input
          type='text'
          id='username'
          name='username'
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </div>
      <div className={styles.password}>
        <label htmlFor='pass' className={styles.label}>
          Password (8 characters minimum):
        </label>
        <input
          type='password'
          id='pass'
          name='password'
          minLength='8'
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>

      <input type='submit' value='Sign in' className={styles.submit} />
    </form>
  );
}

Login.propTypes = {
  setUsername: PropTypes.func,
  setAuthorized: PropTypes.func,
  username: PropTypes.string,
};
