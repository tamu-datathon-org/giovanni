"use client"
import React from 'react';

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  React.useEffect(() => {
    window.open('https://blog.tamudatathon.com', '_blank');
    window.location.href = '/';
  }, []);

  return null;
};
