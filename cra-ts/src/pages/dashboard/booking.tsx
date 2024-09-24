import { Helmet } from 'react-helmet-async';
// sections
import { OverviewBankingView } from 'src/sections/overview/booking/view';

// ----------------------------------------------------------------------

export default function OverviewBookingPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Booking</title>
      </Helmet>

      <OverviewBankingView />
    </>
  );
}
