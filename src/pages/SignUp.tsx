import { SignUpForm } from '../components/forms/SignUpForm';
import { PageWrapper } from '../components/pageWrapper/PageWrapper';

const SignUp: React.FC = () => {
  return (
    <PageWrapper title={'Registration'}>
      <SignUpForm />
    </PageWrapper>
  );
};

export default SignUp;
