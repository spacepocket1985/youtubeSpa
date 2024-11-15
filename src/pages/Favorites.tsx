import { useEffect, useState } from 'react';
import { FavoriteFormInputsType } from '../components/forms/FavoriteForm';
import { loadQueriesFromLocalStorage } from '../utils/localStorageActions';

export const Favorites: React.FC = () => {
  const [savedQueries, setSavedQueries] = useState<FavoriteFormInputsType[]>(
    []
  );

  useEffect(() => {
    const storedQueries = loadQueriesFromLocalStorage();
    setSavedQueries(storedQueries);
  }, []);

  return (
    <div>
      <h2>Saved Queries</h2>
      <ul>
        {savedQueries.map((query, index) => (
          <li key={index}>
            <div>Query: {query.query}</div>
            <div>Name: {query.name}</div>
            <div>Sort By: {query.sortBy}</div>
            <div>Max Count: {query.maxCount}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};
