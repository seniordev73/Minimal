import { Helmet } from 'react-helmet-async';
// sections
import { ModernNewPasswordView } from 'src/sections/auth-demo/modern';

// ----------------------------------------------------------------------

export default function ModernNewPasswordPage() {
  return (
    <>
      <Helmet>
        <title> Auth Classic: New Password</title>
      </Helmet>

      <ModernNewPasswordView />
    </>
  );
}
