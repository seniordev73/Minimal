import { Helmet } from 'react-helmet-async';
// sections
import { JobEditView } from 'src/sections/job/view';

// ----------------------------------------------------------------------

export default function JobEditPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Dashboard: Job Edit</title>
      </Helmet>

      <JobEditView />
    </>
  );
}
