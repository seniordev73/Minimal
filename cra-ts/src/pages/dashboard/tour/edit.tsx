import { Helmet } from 'react-helmet-async';
// sections
import { TourEditView } from 'src/sections/tour/view';

// ----------------------------------------------------------------------

export default function TourEditPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Tour Edit</title>
      </Helmet>

      <TourEditView />
    </>
  );
}
