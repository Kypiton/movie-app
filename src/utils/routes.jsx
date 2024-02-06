import PopularItem from '../components/Popular/PopularItem';
import SerialItem from '../components/Serials/SerialItem';
import FilmItem from '../components/Films/FilmItem';
import Serials from '../components/Serials/Serials';
import Popular from '../components/Popular/Popular';
import SoonItem from '../components/Soon/SoonItem';
import Login from '../components/LogInOut/LogIn';
import Films from '../components/Films/Films';
import Soon from '../components/Soon/Soon';

export const routes = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/popular',
    element: <Popular />,
  },
  {
    path: '/popular/:popularId',
    element: <PopularItem />,
  },
  {
    path: '/films',
    element: <Films />,
  },
  {
    path: '/films/:filmId',
    element: <FilmItem />,
  },
  {
    path: '/serials',
    element: <Serials />,
  },
  {
    path: '/serials/:serialId',
    element: <SerialItem />,
  },
  {
    path: '/soon',
    element: <Soon />,
  },
  {
    path: '/soon/:soonId',
    element: <SoonItem />,
  },
];
