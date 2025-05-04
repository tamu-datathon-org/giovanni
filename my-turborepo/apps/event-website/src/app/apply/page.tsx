import { redirect } from 'next/navigation';

// All this does is redirect people to tamudatathon.org/apply if they try to access tamudatathon.com/apply
export default function ApplyPage() {
  redirect("https://tamudatathon.org/apply");
}