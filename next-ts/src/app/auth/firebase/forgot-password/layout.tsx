'use client';

// auth
import { GuestGuard } from 'src/auth/guard';
// components
import CompactLayout from 'src/layouts/compact';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <GuestGuard>
      <CompactLayout>{children}</CompactLayout>
    </GuestGuard>
  );
}
