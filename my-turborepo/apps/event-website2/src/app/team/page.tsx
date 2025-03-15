'use client';

import { useEffect } from 'react';
import { redirect } from 'next/navigation';


export default function TeamPage() {
  useEffect(() => {
    // Replace this URL with your target destination
    redirect('https://tamudatathon.com/');
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <p>Redirecting...</p>
    </div>
  );
}