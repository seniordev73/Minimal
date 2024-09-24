import { Helmet } from 'react-helmet-async';
// sections
import { ModernVerifyView } from 'src/sections/auth-demo/modern';

// ----------------------------------------------------------------------

export default function ModernVerifyPage() {
  return (
    <>
      <Helmet>
        <title> Auth Classic: Verify</title>
      </Helmet>

      <ModernVerifyView />
    </>
  );
}
