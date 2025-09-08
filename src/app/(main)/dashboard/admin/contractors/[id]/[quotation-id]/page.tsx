import { ItemListing } from '@/features/admin/components/quotation-table/quotation-items/item-list';

interface PageProps {
  params: { id: string };
}

export default function Page({ params }: PageProps) {
  const { id } = params;

  return (
    <div className='py-8'>
      <ItemListing quotation_id={id} />
    </div>
  );
}
