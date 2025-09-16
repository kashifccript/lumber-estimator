import { ItemListing } from '@/features/admin/components/quotation-table/quotation-items/item-list';

interface PageProps {
  params: Promise<{ id: string; 'quotation-id': string }>; // params is now a Promise
}

export default async function Page({ params }: PageProps) {
  // function is now async
  const { id } = await params; // await the params Promise

  return (
    <div className='py-8'>
      <ItemListing quotation_id={(await params)['quotation-id']} />
    </div>
  );
}
