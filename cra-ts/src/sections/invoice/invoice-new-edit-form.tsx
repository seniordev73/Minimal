import { useMemo, useCallback } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
// routes
import { paths } from 'src/routes/paths';
// types
import { IInvoice } from 'src/types/invoice';
import { IAddressItem } from 'src/types/address';
// _mock
import { _addressBooks } from 'src/_mock';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// components
import FormProvider from 'src/components/hook-form';
import { useRouter } from 'src/routes/hook';
//
import InvoiceNewEditDetails from './invoice-new-edit-details';
import InvoiceNewEditAddress from './invoice-new-edit-address';
import InvoiceNewEditStatusDate from './invoice-new-edit-status-date';

// ----------------------------------------------------------------------

type IFormValuesProps = Omit<IInvoice, 'createDate' | 'dueDate' | 'invoiceFrom' | 'invoiceTo'>;

interface FormValuesProps extends IFormValuesProps {
  createDate: Date | null;
  dueDate: Date | null;
  invoiceFrom: IAddressItem | null;
  invoiceTo: IAddressItem | null;
}

type Props = {
  currentInvoice?: FormValuesProps;
};

export default function InvoiceNewEditForm({ currentInvoice }: Props) {
  const router = useRouter();

  const loadingSave = useBoolean();

  const loadingSend = useBoolean();

  const NewInvoiceSchema = Yup.object().shape({
    invoiceTo: Yup.mixed().required('Invoice to is required'),
    dueDate: Yup.date()
      .required('Due date is required')
      .typeError('')
      .min(Yup.ref('createDate'), 'Due date must be later than create date'),
  });

  const defaultValues = useMemo(
    () => ({
      invoiceNumber: currentInvoice?.invoiceNumber || 'INV-1990',
      createDate: currentInvoice?.createDate || new Date(),
      dueDate: currentInvoice?.dueDate || null,
      taxes: currentInvoice?.taxes || 0,
      shipping: currentInvoice?.shipping || 0,
      status: currentInvoice?.status || 'draft',
      discount: currentInvoice?.discount || 0,
      invoiceFrom: currentInvoice?.invoiceFrom || _addressBooks[0],
      invoiceTo: currentInvoice?.invoiceTo || null,
      items: currentInvoice?.items || [
        { title: '', description: '', service: '', quantity: 1, price: 0, total: 0 },
      ],
      totalAmount: currentInvoice?.totalAmount || 0,
    }),
    [currentInvoice]
  );

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewInvoiceSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const handleSaveAsDraft = useCallback(
    async (data: FormValuesProps) => {
      loadingSave.onTrue();

      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        reset();
        loadingSave.onFalse();
        router.push(paths.dashboard.invoice.root);
        console.info('DATA', JSON.stringify(data, null, 2));
      } catch (error) {
        console.error(error);
        loadingSave.onFalse();
      }
    },
    [loadingSave, reset, router]
  );

  const handleCreateAndSend = useCallback(
    async (data: FormValuesProps) => {
      loadingSend.onTrue();

      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        reset();
        loadingSend.onFalse();
        router.push(paths.dashboard.invoice.root);
        console.info('DATA', JSON.stringify(data, null, 2));
      } catch (error) {
        console.error(error);
        loadingSend.onFalse();
      }
    },
    [loadingSend, reset, router]
  );

  return (
    <FormProvider methods={methods}>
      <Card>
        <InvoiceNewEditAddress />

        <InvoiceNewEditStatusDate />

        <InvoiceNewEditDetails />
      </Card>

      <Stack justifyContent="flex-end" direction="row" spacing={2} sx={{ mt: 3 }}>
        <LoadingButton
          color="inherit"
          size="large"
          variant="outlined"
          loading={loadingSave.value && isSubmitting}
          onClick={handleSubmit(handleSaveAsDraft)}
        >
          Save as Draft
        </LoadingButton>

        <LoadingButton
          size="large"
          variant="contained"
          loading={loadingSend.value && isSubmitting}
          onClick={handleSubmit(handleCreateAndSend)}
        >
          {currentInvoice ? 'Update' : 'Create'} & Send
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
