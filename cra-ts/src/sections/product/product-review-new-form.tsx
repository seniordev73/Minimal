import * as Yup from 'yup';
import { useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import FormHelperText from '@mui/material/FormHelperText';
import Dialog, { DialogProps } from '@mui/material/Dialog';
// types
import { IProductReviewNewForm } from 'src/types/product';
// components
import FormProvider, { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

type FormValuesProps = IProductReviewNewForm;

interface Props extends DialogProps {
  onClose: VoidFunction;
}

export default function ProductReviewNewForm({ onClose, ...other }: Props) {
  const ReviewSchema = Yup.object().shape({
    rating: Yup.mixed().required('Rating is required'),
    review: Yup.string().required('Review is required'),
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
  });

  const defaultValues = {
    rating: null,
    review: '',
    name: '',
    email: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(ReviewSchema),
    defaultValues,
  });

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = useCallback(
    async (data: FormValuesProps) => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        reset();
        onClose();
        console.info('DATA', data);
      } catch (error) {
        console.error(error);
      }
    },
    [onClose, reset]
  );

  const onCancel = useCallback(() => {
    onClose();
    reset();
  }, [onClose, reset]);

  return (
    <Dialog onClose={onClose} {...other}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle> Add Review </DialogTitle>

        <DialogContent>
          <Stack direction="row" flexWrap="wrap" alignItems="center" spacing={1.5}>
            <Typography variant="body2">Your review about this product:</Typography>

            <Controller
              name="rating"
              control={control}
              render={({ field }) => <Rating {...field} size="small" value={Number(field.value)} />}
            />
          </Stack>

          {!!errors.rating && <FormHelperText error> {errors.rating?.message}</FormHelperText>}

          <RHFTextField name="review" label="Review *" multiline rows={3} sx={{ mt: 3 }} />

          <RHFTextField name="name" label="Name *" sx={{ mt: 3 }} />

          <RHFTextField name="email" label="Email *" sx={{ mt: 3 }} />
        </DialogContent>

        <DialogActions>
          <Button color="inherit" variant="outlined" onClick={onCancel}>
            Cancel
          </Button>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Post
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
