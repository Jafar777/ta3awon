// C:\Users\jafar\Desktop\ta3awon\app\dashboard\layout.jsx
'use client';
import { SessionProvider } from 'next-auth/react';

export default function DashboardLayout({ children }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}