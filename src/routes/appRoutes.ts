import { RoutePaths } from './routePaths';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Main from '../pages/Main';
import NotFound from '../pages/NotFound';
import { Favorites } from '../pages/Favorites';

export const publicRoutes = [
  {
    path: RoutePaths.SignInPage,
    Page: SignIn,
  },
  {
    path: RoutePaths.SignUpPage,
    Page: SignUp,
  },

  {
    path: RoutePaths.PAGE404,
    Page: NotFound,
  },
];

export const privateRoutes = [
  {
    path: RoutePaths.MainPage,
    Page: Main,
  },
  {
    path: RoutePaths.Favorites,
    Page: Favorites,
  },
];
