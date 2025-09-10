import  {EstimationDetailsViewPage}  from "@/features/admin/components/Estimators/estimate-lists";


interface PageProps {
  params: Promise<{ id: string; estimateId: string }>; // params is now a Promise
}

export default async function Page({ params }: PageProps) {
  // function is now async
  const { id } = await params; // await the params Promise

  return (
    <div className='py-8'>
      <EstimationDetailsViewPage project_id={(await params).estimateId} />
    </div>
  );
}
