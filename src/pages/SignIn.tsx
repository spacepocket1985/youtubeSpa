import { SiginInForm } from '../components/forms/SiginInForm';
import { PageWrapper } from '../components/pageWrapper/PageWrapper';

const SignIn: React.FC = () => {
  return (
    <PageWrapper title={'Вход'}>
      <SiginInForm />
    </PageWrapper>
  );
};

export default SignIn;
