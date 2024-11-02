import { Header } from '../components/layout/Header';
import { PageWrapper } from '../components/pageWrapper/PageWrapper';

import { SerachPanel } from '../components/serachPanel/SerachPanel';

const Main: React.FC = () => {
  // const dispatch = useAppDispatch();
  // useEffect(() => {
  //   const SEARCH_QUERY = 'Jack Russell Terrier';
  //   dispatch(fetchYouTubeVideos({ query: SEARCH_QUERY }));
  // }, [dispatch]);

  return (
    <>
      <Header />
      <PageWrapper title={'Video search'}>
        <SerachPanel />
      </PageWrapper>
    </>
  );
};

export default Main;
