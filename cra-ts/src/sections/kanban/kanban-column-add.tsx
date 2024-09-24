import { useState, useCallback } from 'react';
// @mui
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { inputBaseClasses } from '@mui/material/InputBase';
import ClickAwayListener from '@mui/material/ClickAwayListener';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// components
import Iconify from 'src/components/iconify';
//
import { useKanban } from './hooks';

// ----------------------------------------------------------------------

export default function KanbanColumnAdd() {
  const { onCreateColumn } = useKanban();

  const [name, setName] = useState('');

  const addSection = useBoolean();

  const handleChangeColumnName = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }, []);

  const handleCreateColumn = useCallback(async () => {
    try {
      if (name) {
        onCreateColumn({ name });
        setName('');
      }
      addSection.onFalse();
    } catch (error) {
      console.error(error);
    }
  }, [addSection, name, onCreateColumn]);

  const handleKeyUp = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        handleCreateColumn();
      }
    },
    [handleCreateColumn]
  );

  return (
    <Paper sx={{ minWidth: 280, width: 280 }}>
      {addSection.value ? (
        <ClickAwayListener onClickAway={handleCreateColumn}>
          <TextField
            autoFocus
            fullWidth
            placeholder="New section"
            value={name}
            onChange={handleChangeColumnName}
            onKeyUp={handleKeyUp}
            sx={{
              [`& .${inputBaseClasses.input}`]: {
                typography: 'h6',
              },
            }}
          />
        </ClickAwayListener>
      ) : (
        <Button
          fullWidth
          size="large"
          color="inherit"
          variant="outlined"
          startIcon={<Iconify icon="mingcute:add-line" sx={{ mr: -0.5 }} />}
          onClick={addSection.onTrue}
        >
          Add Section
        </Button>
      )}
    </Paper>
  );
}
