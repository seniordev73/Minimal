import { Helmet } from 'react-helmet-async';
// sections
import MaintenanceView from 'src/sections/maintenance/view';

// ----------------------------------------------------------------------

export default function MaintenancePage() {
  return (
    <>
      <Helmet>
        <title> Maintenance</title>
      </Helmet>

      <MaintenanceView />
    </>
  );
}
