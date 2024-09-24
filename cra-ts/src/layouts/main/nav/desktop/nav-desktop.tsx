// @mui
import Stack from '@mui/material/Stack';
//
import { NavProps } from '../types';
import NavList from './nav-list';

// ----------------------------------------------------------------------

export default function NavDesktop({ offsetTop, data }: NavProps) {
  return (
    <Stack component="nav" direction="row" spacing={5} sx={{ mr: 2.5, height: 1 }}>
      {data.map((link) => (
        <NavList key={link.title} item={link} offsetTop={offsetTop} />
      ))}
    </Stack>
  );
}
