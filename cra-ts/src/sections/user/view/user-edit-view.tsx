// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
import { useParams } from 'src/routes/hook';
// _mock
import { _userList } from 'src/_mock';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
//
import UserNewEditForm from '../user-new-edit-form';

// ----------------------------------------------------------------------

export default function UserEditView() {
  const settings = useSettingsContext();

  const params = useParams();

  const { id } = params;

  const currentUser = _userList.find((user) => user.id === id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'User',
            href: paths.dashboard.user.root,
          },
          { name: currentUser?.name },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <UserNewEditForm currentUser={currentUser} />
    </Container>
  );
}
