import { Helmet } from 'react-helmet-async';
// sections
import { MailView } from 'src/sections/mail/view';

// ----------------------------------------------------------------------

export default function MailPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Mail</title>
      </Helmet>

      <MailView />
    </>
  );
}
