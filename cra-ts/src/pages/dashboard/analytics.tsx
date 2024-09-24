import { Helmet } from 'react-helmet-async';
// sections
import { OverviewAnalyticsView } from 'src/sections/overview/analytics/view';

// ----------------------------------------------------------------------

export default function OverviewAnalyticsPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Analytics</title>
      </Helmet>

      <OverviewAnalyticsView />
    </>
  );
}
