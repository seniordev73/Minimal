import { Helmet } from 'react-helmet-async';
// sections
import { OverviewAppView } from 'src/sections/overview/app/view';

// ----------------------------------------------------------------------

export default function OverviewAppPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: App</title>
      </Helmet>

      <OverviewAppView />
    </>
  );
}
