import { redirect } from 'next/navigation';
import React from 'react';



// All this does is redirect people to tamudatathon.org/apply if they try to access tamudatathon.com/apply
export default function ApplyLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  // TODO: Maybe set this to a variable that updates according to the real site
  redirect("https://tamudatathon.org/apply");
  return (<>
      {children}
  </>
  );
}