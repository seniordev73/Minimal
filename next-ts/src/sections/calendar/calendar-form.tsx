import { useCallback } from 'react';
import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DialogActions from '@mui/material/DialogActions';
// types
import { ICalendarEvent } from 'src/types/calendar';
// components
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import { ColorPicker } from 'src/components/color-utils';
import { isDateError } from 'src/components/custom-date-range-picker';
import FormProvider, { RHFTextField, RHFSwitch } from 'src/components/hook-form';

// ----------------------------------------------------------------------

type FormValuesProps = ICalendarEvent;

type Props = {
  openForm: boolean;
  event: ICalendarEvent;
  onClose: VoidFunction;
  colorOptions: string[];
  currentEventId: string | null;
  onDeleteEvent: (eventId: string) => void;
  onCreateEvent: (newEvent: ICalendarEvent) => void;
  onUpdateEvent: (newEvent: ICalendarEvent) => void;
};

// ----------------------------------------------------------------------

export default function CalendarForm({
  event,
  onClose,
  openForm,
  colorOptions,
  onDeleteEvent,
  onCreateEvent,
  currentEventId,
  onUpdateEvent,
}: Props) {
  const { enqueueSnackbar } = useSnackbar();

  const EventSchema = Yup.object().shape({
    title: Yup.string().max(255).required('Title is required'),
    description: Yup.string().max(5000),
  });

  const methods = useForm({
    resolver: yupResolver(EventSchema),
    defaultValues: event,
  });

  const update = !!currentEventId && !!openForm;

  const {
    reset,
    watch,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const dateError = isDateError(values.start, values.end);

  const onSubmit = useCallback(
    async (data: FormValuesProps) => {
      try {
        const newEvent = {
          title: data.title,
          description: data.description,
          color: data.color,
          allDay: data.allDay,
          start: data.start,
          end: data.end,
        };
        if (!dateError) {
          if (currentEventId) {
            onUpdateEvent(newEvent);
            enqueueSnackbar('Update success!');
          } else {
            onCreateEvent(newEvent);
            enqueueSnackbar('Create success!');
          }
          onClose();
          reset();
        }
      } catch (error) {
        console.error(error);
      }
    },
    [currentEventId, dateError, enqueueSnackbar, onClose, onCreateEvent, onUpdateEvent, reset]
  );

  const onDelete = useCallback(() => {
    try {
      onClose();
      onDeleteEvent(`${event.id}`);
      enqueueSnackbar('Delete success!');
    } catch (error) {
      console.error(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} sx={{ px: 3 }}>
        <RHFTextField name="title" label="Title" />

        <RHFTextField name="description" label="Description" multiline rows={3} />

        <RHFSwitch name="allDay" label="All day" />

        <Controller
          name="start"
          control={control}
          render={({ field }) => (
            <MobileDateTimePicker
              {...field}
              value={new Date(field.value as Date)}
              onChange={(newValue) => {
                if (newValue) {
                  field.onChange(new Date(newValue).toISOString());
                }
              }}
              label="Start date"
              format="dd/MM/yyyy hh:mm a"
              slotProps={{
                textField: {
                  fullWidth: true,
                },
              }}
            />
          )}
        />

        <Controller
          name="end"
          control={control}
          render={({ field }) => (
            <MobileDateTimePicker
              {...field}
              value={new Date(field.value as Date)}
              onChange={(newValue) => {
                if (newValue) {
                  field.onChange(new Date(newValue).toISOString());
                }
              }}
              label="End date"
              format="dd/MM/yyyy hh:mm a"
              slotProps={{
                textField: {
                  fullWidth: true,
                  error: dateError,
                  helperText: dateError && 'End date must be later than start date',
                },
              }}
            />
          )}
        />

        <Controller
          name="color"
          control={control}
          render={({ field }) => (
            <ColorPicker
              selected={field.value}
              onSelectColor={field.onChange}
              colors={colorOptions}
            />
          )}
        />
      </Stack>

      <DialogActions>
        {update && (
          <Tooltip title="Delete Event">
            <IconButton onClick={onDelete}>
              <Iconify icon="solar:trash-bin-trash-bold" />
            </IconButton>
          </Tooltip>
        )}

        <Box sx={{ flexGrow: 1 }} />

        <Button variant="outlined" color="inherit" onClick={onClose}>
          Cancel
        </Button>

        <LoadingButton
          type="submit"
          variant="contained"
          loading={isSubmitting}
          disabled={dateError}
        >
          Save Changes
        </LoadingButton>
      </DialogActions>
    </FormProvider>
  );
}
