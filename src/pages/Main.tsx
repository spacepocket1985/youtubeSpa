import { Header } from '../components/layout/Header';
import { PageWrapper } from '../components/pageWrapper/PageWrapper';

import { SerachPanel } from '../components/serachPanel/SerachPanel';
import { VideoList } from '../components/videos/VideoList';

const Main: React.FC = () => {
  return (
    <>
      <Header />
      <PageWrapper title={'Video search'}>
        <SerachPanel />
        <VideoList />
      </PageWrapper>
    </>
  );
};

export default Main;
