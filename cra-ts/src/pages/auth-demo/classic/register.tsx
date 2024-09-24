import { Helmet } from 'react-helmet-async';
// sections
import { ClassicRegisterView } from 'src/sections/auth-demo/classic';

// ----------------------------------------------------------------------

export default function ClassicRegisterPage() {
  return (
    <>
      <Helmet>
        <title> Auth Classic: Register</title>
      </Helmet>

      <ClassicRegisterView />
    </>
  );
}
