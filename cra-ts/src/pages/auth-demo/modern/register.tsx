import { Helmet } from 'react-helmet-async';
// sections
import { ModernRegisterView } from 'src/sections/auth-demo/modern';

// ----------------------------------------------------------------------

export default function ModernRegisterPage() {
  return (
    <>
      <Helmet>
        <title> Auth Classic: Register</title>
      </Helmet>

      <ModernRegisterView />
    </>
  );
}
