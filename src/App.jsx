import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Collections from './components/Collections/Collections';
import PopularItem from './components/Popular/PopularItem';
import Animation from './components/Animation/Animation';
import Popular from './components/Popular/Popular';
import Serials from './components/Serials/Serials';
import Layout from './components/Layout/Layout';
import Films from './components/Films/Films';
import Soon from './components/Soon/Soon';
import Tv from './components/Tv/Tv';

function App() {
  return (
    <Router>
      <Layout>
        <ErrorBoundary>
          <Routes>
            <Route path='/' element={<Popular />} />
            <Route path='/:popularId' element={<PopularItem />} />
            <Route path='/films' element={<Films />} />
            <Route path='/serials' element={<Serials />} />
            {/* <Route path='/tv' element={<Tv />} />
          <Route path='/animation' element={<Animation />} /> */}
            <Route path='/soon' element={<Soon />} />
            {/* <Route path='/collections' element={<Collections />} /> */}
          </Routes>
        </ErrorBoundary>
      </Layout>
    </Router>
  );
}

export default App;
