import PropTypes from 'prop-types';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main style={{ padding: '1em 5em' }}>{children}</main>
      <Footer />
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.element,
};
