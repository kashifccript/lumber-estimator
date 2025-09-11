'use client';
import { Breadcrumb } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { CustomTable } from '@/components/shared/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import Image from 'next/image';
import { createColumns, Estimate } from './estimate-table/columns';
import { SummarySection } from './summary-section';
import { Button } from '@/components/ui/button';
import { CallToAction } from './cta';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchProjectById } from '@/features/project-details/actions/project';
import { toast } from 'sonner';

export default function EstimatesManagementDetails() {
  const [projectData, setProjectData] = useState<any>(null);
  const [tableData, setTableData] = useState<Estimate[]>([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const projectId = params.id as string;

  // Transform API data to table format
  const transformApiDataToTableItems = (apiData: any): Estimate[] => {
    if (apiData.items && Array.isArray(apiData.items)) {
      return apiData.items.map((item: any, index: number) => {
        // Determine status based on database_match flag
        const status: 'Quoted' | 'Quotation Needed' =
          item.database_match === 'Available' ? 'Quoted' : 'Quotation Needed';

        // Format cost
        let unitPrice = '0';
        let total = '0';

        if (typeof item.unit_price === 'number') {
          unitPrice = item.unit_price.toLocaleString();
        }

        if (typeof item.total_price === 'number') {
          total = item.total_price.toLocaleString();
        } else if (item.total_price === 'Quotation needed') {
          unitPrice = 'Quotation needed';
          total = 'Quotation needed';
        }

        return {
          id: item.item_id || item.id || `item-${index}`,
          itemName: item.item_name || 'Unknown Item',
          skuId: item.sku || item.item_id || 'N/A',
          quantity: item.quantity_needed || item.quantity || 0,
          unitPrice,
          total,
          status
        };
      });
    }
    return [];
  };

  // Fetch project data
  useEffect(() => {
    const loadProjectData = async () => {
      if (!projectId) return;

      try {
        setLoading(true);
        const response = await fetchProjectById(projectId);

        if (response && response.project_id) {
          setProjectData(response);
          const transformedData = transformApiDataToTableItems(response);
          setTableData(transformedData);
        } else {
          toast.error('Failed to load project data');
        }
      } catch (error) {
        console.error('Error loading project data:', error);
        toast.error('Error loading project data');
      } finally {
        setLoading(false);
      }
    };

    loadProjectData();
  }, [projectId]);

  const columns = createColumns({
    onRefresh: () => {}
  });
  return (
    <PageContainer>
      <div className='flex w-full flex-col gap-5'>
        <div className='flex flex-col gap-3'>
          <div className='flex items-center justify-between'>
            <Breadcrumb
              items={[
                {
                  label: 'All Estimates',
                  href: '/dashboard/contractor/estimates-management'
                },
                {
                  label: projectData?.project_name || 'Project Details'
                }
              ]}
            />
          </div>

          {/* Profile Section */}
          <div className='flex items-center justify-between gap-3 rounded-sm bg-white px-10 py-4'>
            <div className='flex items-center gap-4'>
              <div className='flex items-center gap-4'>
                <div className='relative h-[90px] w-[90px] overflow-hidden rounded-full bg-gray-200'>
                  <Image
                    width={90}
                    height={90}
                    src={'/assets/icons/profile.png'}
                    alt='Project Avatar'
                    className='h-full w-full object-cover'
                  />
                </div>
              </div>

              <div className='flex-1'>
                <h3 className='text-lg font-semibold'>
                  {projectData?.project_name || 'Loading...'}
                </h3>
                <p className='mb-2 text-[12px] font-[400] text-[#1F1F1F]'>
                  {projectData?.description || 'Project description'}
                </p>
                <div className='flex flex-row gap-3'>
                  <Badge
                    variant='secondary'
                    className={`h-[22px] rounded-[2px] bg-[#3B81F5] px-2 text-white capitalize`}
                  >
                    {'Estimator'}
                  </Badge>
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-3'>
              <p className='text-lg font-semibold'>Submitted Date</p>
              <span className='text-xs font-normal'>
                {projectData?.created_at
                  ? new Date(projectData.created_at).toLocaleDateString()
                  : 'Loading...'}
              </span>
            </div>
          </div>

          {/* Custom Table */}
          <CustomTable
            data={tableData}
            columns={columns}
            itemsPerPage={10}
            isLoading={loading}
          />

          {/* SummarySection */}
          <SummarySection data={projectData} />

          {/* CTA - Only show when status is pending */}
          {projectData?.status === 'pending' && (
            <CallToAction
              projectName={projectData?.project_name}
              projectId={projectId}
              onApprove={() => {
                // Handle post-approval actions (e.g., refresh data, navigate)
                console.log('Estimate approved');
                // You can add navigation or data refresh logic here
              }}
              onReject={() => {
                // Handle post-rejection actions
                console.log('Estimate rejected');
                // You can add navigation or data refresh logic here
              }}
            />
          )}
        </div>
      </div>
    </PageContainer>
  );
}
