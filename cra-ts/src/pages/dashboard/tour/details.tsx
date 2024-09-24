import { Helmet } from 'react-helmet-async';
// sections
import { TourDetailsView } from 'src/sections/tour/view';

// ----------------------------------------------------------------------

export default function TourDetailsPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Analytics</title>
      </Helmet>

      <TourDetailsView />
    </>
  );
}
