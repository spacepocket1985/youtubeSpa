import { FavoriteFormInputsType } from '../components/forms/FavoriteForm';

const tokenStorageKey = 'authToken';
const savedQueriesStorageKey = 'savedQueries';

const setToken = (token: string): void => {
  localStorage.setItem(tokenStorageKey, token);
};

const isToken = (): string | null => localStorage.getItem(tokenStorageKey);
const removeToken = (): void => localStorage.removeItem(tokenStorageKey);

const saveQueryToLocalStorage = (query: FavoriteFormInputsType): void => {
  const existingQueries = JSON.parse(
    localStorage.getItem(savedQueriesStorageKey) || '[]'
  );
  existingQueries.push(query);
  localStorage.setItem(savedQueriesStorageKey, JSON.stringify(existingQueries));
};

const loadQueriesFromLocalStorage = (): FavoriteFormInputsType[] => {
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
