import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import LoginButton from './components/LogInAndOut/LoginButton';
import PopularItem from './components/Popular/PopularItem';
import SerialItem from './components/Serials/SerialItem';
import FilmItem from './components/Films/FilmItem';
import Popular from './components/Popular/Popular';
import Serials from './components/Serials/Serials';
import SoonItem from './components/Soon/SoonItem';
import Layout from './components/Layout/Layout';
import Films from './components/Films/Films';
import Soon from './components/Soon/Soon';
import LogoutButton from './components/LogInAndOut/LogoutButton';

function App() {
  return (
    <Router>
      <Layout>
        <ErrorBoundary>
          <Routes>
            <Route path='/' element={<LoginButton />} />
            <Route path='/' element={<LogoutButton />} />
            <Route path='/popular' element={<Popular />} />
            <Route path='/popular/:popularId' element={<PopularItem />} />
            <Route path='/films' element={<Films />} />
            <Route path='/films/:filmId' element={<FilmItem />} />
            <Route path='/serials' element={<Serials />} />
            <Route path='/serials/:serialId' element={<SerialItem />} />
            <Route path='/soon' element={<Soon />} />
            <Route path='/soon/:soonId' element={<SoonItem />} />
          </Routes>
        </ErrorBoundary>
      </Layout>
    </Router>
  );
}

export default App;
