import ContractorInfo from '@/features/admin/components/contractors/contractor-detail';

interface PageProps {
  params: { id: string };
}

export default function Page({ params }: PageProps) {
  const { id } = params;

  return (
    <div className='py-8'>
      <ContractorInfo id={id} />
    </div>
  );
}
