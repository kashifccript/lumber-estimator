import ContractorInfo from "@/features/admin/components/contractors/contractor-detail"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: PageProps) {
  const { id } = await params

  return (
    <div className="py-8">
      <ContractorInfo id={id} />
    </div>
  )
}
