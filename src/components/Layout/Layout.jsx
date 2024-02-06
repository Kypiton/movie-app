import { useState, createContext } from 'react';
import PropTypes from 'prop-types';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

export const User = createContext();
export const Username = createContext();
export const Auth = createContext();
export const Authorized = createContext();

export default function Layout({ children }) {
  const [authorized, setAuthorized] = useState(false);
  const [username, setUsername] = useState('');

  return (
    <>
      <Header
        authorized={authorized}
        username={username}
        setUsername={setUsername}
        setAuthorized={setAuthorized}
      />
      <User.Provider value={setUsername}>
        <Auth.Provider value={setAuthorized}>
          <Username.Provider value={username}>
            <Authorized.Provider value={authorized}>
              <main style={{ padding: '1em 5em' }}>{children}</main>
            </Authorized.Provider>
          </Username.Provider>
        </Auth.Provider>
      </User.Provider>
      <Footer />
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.element,
};
