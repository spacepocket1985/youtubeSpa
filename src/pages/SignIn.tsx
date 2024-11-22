import { SignInForm } from '../components/forms/SignInForm';
import { PageWrapper } from '../components/pageWrapper/PageWrapper';

const SignIn: React.FC = () => {
  return (
    <PageWrapper title={'Login'}>
      <SignInForm />
    </PageWrapper>
  );
};

export default SignIn;
