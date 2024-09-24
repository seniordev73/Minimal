'use client';

// components
import AuthModernCompactLayout from 'src/layouts/auth/modern-compact';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return <AuthModernCompactLayout>{children}</AuthModernCompactLayout>;
}
