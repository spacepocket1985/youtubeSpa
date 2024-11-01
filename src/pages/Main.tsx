import { Header } from '../components/layout/Header';
import { PageWrapper } from '../components/pageWrapper/PageWrapper';

const Main: React.FC = () => {
  return (
    <>
      <Header />
      <PageWrapper title={'Video search'}></PageWrapper>
    </>
  );
};

export default Main;
