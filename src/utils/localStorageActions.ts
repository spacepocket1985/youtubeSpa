import { FavoriteItemType } from '../pages/Favorites';

const tokenStorageKey = 'authToken';
const savedQueriesStorageKey = 'savedQueries';

const setToken = (token: string): void => {
  localStorage.setItem(tokenStorageKey, token);
};

const isToken = (): string | null => localStorage.getItem(tokenStorageKey);
const removeToken = (): void => localStorage.removeItem(tokenStorageKey);

const getQueriesFromLS = (): FavoriteItemType[] => {
  const storedData = localStorage.getItem(savedQueriesStorageKey);
  return storedData ? JSON.parse(storedData) : [];
};

const saveQueriesToLS = (favorites: FavoriteItemType[]): void => {
  localStorage.setItem(savedQueriesStorageKey, JSON.stringify(favorites));
};

export { setToken, isToken, removeToken, getQueriesFromLS, saveQueriesToLS };
