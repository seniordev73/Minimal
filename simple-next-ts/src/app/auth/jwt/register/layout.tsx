'use client';

// auth
import { GuestGuard } from 'src/auth/guard';
// components
import AuthClassicLayout from 'src/layouts/auth/classic';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <GuestGuard>
      <AuthClassicLayout title="Manage the job more effectively with Minimal">
        {children}
      </AuthClassicLayout>
    </GuestGuard>
  );
}
