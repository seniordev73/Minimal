import { Helmet } from 'react-helmet-async';
// sections
import { ClassicLoginView } from 'src/sections/auth-demo/classic';

// ----------------------------------------------------------------------

export default function ClassicLoginPage() {
  return (
    <>
      <Helmet>
        <title> Auth Classic: Login</title>
      </Helmet>

      <ClassicLoginView />
    </>
  );
}
