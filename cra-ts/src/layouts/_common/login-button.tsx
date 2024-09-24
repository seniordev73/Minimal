// @mui
import { Theme, SxProps } from '@mui/material/styles';
import Button from '@mui/material/Button';
// routes
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
// auth
import { useAuthContext } from 'src/auth/hooks';

// ----------------------------------------------------------------------

const loginPaths: Record<string, string> = {
  jwt: paths.auth.jwt.login,
  auth0: paths.auth.auth0.login,
  amplify: paths.auth.amplify.login,
  firebase: paths.auth.firebase.login,
};

type Props = {
  sx?: SxProps<Theme>;
};

export default function LoginButton({ sx }: Props) {
  const { method } = useAuthContext();

  const loginPath = loginPaths[method];

  return (
    <Button component={RouterLink} href={loginPath} variant="outlined" sx={{ mr: 1, ...sx }}>
      Login
    </Button>
  );
}
