import { useRef, useState, useEffect, useCallback } from 'react';
// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// components
import Iconify from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
//
import KanbanInputName from './kanban-input-name';

// ----------------------------------------------------------------------

type Props = {
  columnName: string;
  onDelete: VoidFunction;
  onUpdate: (name: string) => void;
};

export default function KanbanColumnToolBar({ columnName, onDelete, onUpdate }: Props) {
  const renameRef = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState(columnName);

  const confirm = useBoolean();

  const popover = usePopover();

  useEffect(() => {
    if (popover.open) {
      if (renameRef.current) {
        renameRef.current.focus();
      }
    }
  }, [popover.open]);

  const handleChangeColumnName = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }, []);

  const handleUpdateColumn = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        if (renameRef.current) {
          renameRef.current.blur();
        }
        onUpdate(value);
      }
    },
    [onUpdate, value]
  );

  return (
    <>
      <Stack
        spacing={1}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ pt: 3 }}
      >
        <KanbanInputName
          inputRef={renameRef}
          placeholder="Section name"
          value={value}
          onChange={handleChangeColumnName}
          onKeyUp={handleUpdateColumn}
        />

        <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
          <Iconify icon="eva:more-horizontal-fill" />
        </IconButton>
      </Stack>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        sx={{
          ml: 1.5,
          width: 160,
        }}
      >
        <MenuItem
          onClick={() => {
            confirm.onTrue();
            popover.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>

        <MenuItem onClick={popover.onClose}>
          <Iconify icon="solar:pen-bold" />
          Rename
        </MenuItem>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content={
          <>
            Are you sure want to delete column?
            <Box sx={{ typography: 'caption', color: 'error.main', mt: 2 }}>
              <strong> NOTE: </strong> All tasks related to this category will also be deleted.
            </Box>
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              onDelete();
              confirm.onFalse();
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}
