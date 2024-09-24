import { Helmet } from 'react-helmet-async';
// sections
import { JobDetailsView } from 'src/sections/job/view';

// ----------------------------------------------------------------------

export default function JobDetailsPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Job Details</title>
      </Helmet>

      <JobDetailsView />
    </>
  );
}
