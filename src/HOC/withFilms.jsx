import { useState, useEffect } from 'react';

export const withFilms = (BaseComponent, getData) => {
  const WrappedComponent = props => {
    const [films, setFilms] = useState([]);
    const [loading, setLoading] = useState(true);

    async function getFilms() {
      try {
        const data = await getData;
        setFilms(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }

    useEffect(() => {
      getFilms();
    }, []);

    return (
      <BaseComponent
        {...props}
        films={films}
        setFilms={setFilms}
        loading={loading}
        setLoading={setLoading}
      />
    );
  };

  WrappedComponent.displayName = `withFilms(${BaseComponent.displayName || BaseComponent.name})`;

  return WrappedComponent;
};
