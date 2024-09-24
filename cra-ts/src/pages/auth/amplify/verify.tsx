import { Helmet } from 'react-helmet-async';
// sections
import { AmplifyVerifyView } from 'src/sections/auth/amplify';

// ----------------------------------------------------------------------

export default function VerifyPage() {
  return (
    <>
      <Helmet>
        <title> Amplify: Verify</title>
      </Helmet>

      <AmplifyVerifyView />
    </>
  );
}
