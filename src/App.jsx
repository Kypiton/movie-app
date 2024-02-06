import { useRoutes } from 'react-router-dom';

import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Layout from './components/Layout/Layout';

import { routes } from './utils/routes';

function App() {
  const routeElements = useRoutes(routes);
  return (
    <Layout>
      <ErrorBoundary>{routeElements}</ErrorBoundary>
    </Layout>
  );
}

export default App;
