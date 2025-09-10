import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Quotation Details'
};

export default function page() {
  redirect('/dashboard/contractor/quotations');
}
