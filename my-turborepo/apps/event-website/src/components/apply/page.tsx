import { redirect } from 'next/navigation';
import React from 'react';



// All this does is redirect people to tamudatathon.org/apply if they try to access tamudatathon.com/apply
export default function ApplyPage() {
  redirect("https://tamudatathon.org/apply");
}

