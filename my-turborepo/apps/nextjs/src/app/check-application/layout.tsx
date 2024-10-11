import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';

export default function CheckApplicationLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            {children}
        </>
    );
};