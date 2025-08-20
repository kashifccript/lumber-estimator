import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect directly to dashboard for development
  redirect('/dashboard/overview');
}
