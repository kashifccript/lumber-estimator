import { redirect } from 'next/navigation';

export default async function Dashboard() {
  // Direct redirect without auth check
  redirect('/dashboard/overview');
}
