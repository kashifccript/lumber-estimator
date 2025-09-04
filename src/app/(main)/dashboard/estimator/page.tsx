import { redirect } from 'next/navigation';

export default async function Page() {
  // Direct redirect without auth check
  redirect('estimator/overview');
}
