import { Route, Routes } from 'react-router-dom';
import { publicRoutes } from './appRoutes';

export const AppRouter = (): JSX.Element => {
  return (
    <Routes>
      {publicRoutes.map(({ path, Page }) => (
        <Route key={path} path={path} element={<Page />} />
      ))}
    </Routes>
  );
};
