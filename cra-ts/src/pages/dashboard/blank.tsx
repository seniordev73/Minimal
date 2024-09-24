import { Helmet } from 'react-helmet-async';
// sections
import BlankView from 'src/sections/blank/view';

// ----------------------------------------------------------------------

export default function BlankPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Blank</title>
      </Helmet>

      <BlankView />
    </>
  );
}
