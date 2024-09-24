import { Helmet } from 'react-helmet-async';
// sections
import UserEditView from 'src/sections/user/view/user-edit-view';

// ----------------------------------------------------------------------

export default function UserEditPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: User Edit</title>
      </Helmet>

      <UserEditView />
    </>
  );
}
