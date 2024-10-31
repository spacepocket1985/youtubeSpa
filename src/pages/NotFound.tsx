import { Link } from 'react-router-dom';
import { RoutePaths } from '../routes/routePaths';

const NotFound: React.FC = () => {
  return <Link to={RoutePaths.MainPage}>Go to main</Link>;
};

export default NotFound;
