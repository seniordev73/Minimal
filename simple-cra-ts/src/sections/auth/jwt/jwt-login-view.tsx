import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useCallback, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
// routes
import { paths } from 'src/routes/paths';
import { useSearchParams } from 'src/routes/hook';
import { RouterLink } from 'src/routes/components';
// config
import { PATH_AFTER_LOGIN } from 'src/config-global';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// auth
import { useAuthContext } from 'src/auth/hooks';
// components
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

type FormValuesProps = {
  email: string;
  password: string;
};

export default function JwtLoginView() {
  const { login } = useAuthContext();

  const [errorMsg, setErrorMsg] = useState('');

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo');

  const password = useBoolean();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: 'demo@minimals.cc',
    password: 'demo1234',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = useCallback(
    async (data: FormValuesProps) => {
      try {
        await login?.(data.email, data.password);

        window.location.href = returnTo || PATH_AFTER_LOGIN;
      } catch (error) {
        console.error(error);
        reset();
        setErrorMsg(typeof error === 'string' ? error : error.message);
      }
    },
    [login, reset, returnTo]
  );

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5 }}>
      <Typography variant="h4">Sign in to Minimal</Typography>

      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2">New user?</Typography>

        <Link component={RouterLink} href={paths.auth.jwt.register} variant="subtitle2">
          Create an account
        </Link>
      </Stack>
    </Stack>
  );

  const renderForm = (
    <Stack spacing={2.5}>
      {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

      <RHFTextField name="email" label="Email address" />

      <RHFTextField
        name="password"
        label="Password"
        type={password.value ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Link variant="body2" color="inherit" underline="always" sx={{ alignSelf: 'flex-end' }}>
        Forgot password?
      </Link>

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Login
      </LoadingButton>
    </Stack>
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {renderHead}

      <Alert severity="info" sx={{ mb: 3 }}>
        Use email : <strong>demo@minimals.cc</strong> / password :<strong> demo1234</strong>
      </Alert>

      {renderForm}
    </FormProvider>
  );
}
