import { Helmet } from 'react-helmet-async';
// sections
import { AmplifyLoginView } from 'src/sections/auth/amplify';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> Amplify: Amplify Login</title>
      </Helmet>

      <AmplifyLoginView />
    </>
  );
}
