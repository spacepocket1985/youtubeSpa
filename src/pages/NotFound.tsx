import { Link } from 'react-router-dom';
import { RoutePaths } from '../routes/routePaths';
import { PageWrapper } from '../components/pageWrapper/PageWrapper';

const NotFound: React.FC = () => {
  return (
    <PageWrapper title={'404'}>
      <Link to={RoutePaths.MainPage}>Go to main</Link>
    </PageWrapper>
  );
};

export default NotFound;
