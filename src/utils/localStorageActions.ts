import { FavoriteItemType } from '../pages/Favorites';

const tokenStorageKey = 'authToken';
const savedQueriesStorageKey = 'savedQueries';

const setToken = (token: string): void => {
  localStorage.setItem(tokenStorageKey, token);
};

const isToken = (): string | null => localStorage.getItem(tokenStorageKey);
const removeToken = (): void => localStorage.removeItem(tokenStorageKey);

const saveQueryToLocalStorage = (query: FavoriteItemType): void => {
  const existingQueries = JSON.parse(
    localStorage.getItem(savedQueriesStorageKey) || '[]'
  );
  existingQueries.push(query);
  localStorage.setItem(savedQueriesStorageKey, JSON.stringify(existingQueries));
};

const loadQueriesFromLocalStorage = (): FavoriteItemType[] => {
  return JSON.parse(localStorage.getItem(savedQueriesStorageKey) || '[]');
};

export {
  tokenStorageKey,
  setToken,
  isToken,
  removeToken,
  saveQueryToLocalStorage,
  loadQueriesFromLocalStorage,
};
