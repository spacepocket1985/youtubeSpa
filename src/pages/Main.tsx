import { useEffect } from 'react';
import { Header } from '../components/layout/Header';
import { PageWrapper } from '../components/pageWrapper/PageWrapper';
import { useAppDispatch } from '../hooks/storeHooks';
import { fetchYouTubeVideos } from '../store/slices/videoSlice';

const Main: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const SEARCH_QUERY = 'Jack Russell Terrier';
    dispatch(fetchYouTubeVideos({ query: SEARCH_QUERY }));
  }, [dispatch]);

  return (
    <>
      <Header />
      <PageWrapper title={'Video search'}></PageWrapper>
    </>
  );
};

export default Main;
