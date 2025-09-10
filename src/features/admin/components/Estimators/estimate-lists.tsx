'use client';
import { Breadcrumb } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { useEffect, useState } from 'react';
import { useEstimationStore } from '@/stores/estimation-store';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { toast } from 'sonner';
import { useBreadcrumbs } from '@/hooks/use-breadcrumbs';
import { transformApiDataToTableItems } from '@/features/estimation-details/utils/utils';
import { fetchProjectData } from '@/features/estimation-details/actions/estimation';
import {
  Item,
  itemColumns
} from '@/features/estimation-details/components/estimation-table/columns';
import { DataTable } from '@/features/estimation-details/components/estimation-table';
import { SummaryDetails } from '@/features/estimation-details/components/summary-details';
import { redirect, useParams } from 'next/navigation';
import { useUserApis } from '../../actions/users';
import { UserData } from '../../types/user';
import { Icon } from '@iconify/react';
interface EstimationDetailsViewPageProps {
  project_id?: string;
}

export function EstimationDetailsViewPage({
  project_id
}: EstimationDetailsViewPageProps) {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [projectData, setProjectData] = useState<any>(null);
  const { currentEstimationData } = useEstimationStore();
  const params = useParams<{ id: string; estimateId: string }>();
  const breadcrumbs = useBreadcrumbs();
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  const fetchUsers = async () => {
    if (!params?.id) return;

    setIsLoading(true);
    try {
      const response = await fetchUser(params?.id);
      if (response) {
        setUserData(response);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const { fetchUser } = useUserApis();
  useEffect(() => {
    if (params?.id) {
      fetchUsers();
    }
  }, [params?.id]);
  useEffect(() => {
    const loadData = async () => {
      setIsLoadingData(true);

      // Get project ID from current estimation data
      const projectId = project_id || currentEstimationData?.project_id;

      if (projectId) {
        try {
          // Fetch project data from API
          const response = await fetchProjectData(projectId.toString());

          if (response && response.project_id) {
            setProjectData(response);

            // Transform API data to table items
            const tableItems = transformApiDataToTableItems(response);
            setItems(tableItems);
          } else {
            toast.error('Failed to load project data');
          }
        } catch (error) {
          toast.error('Error loading project data');
        }
      } else {
        toast.error('No project ID found. Please upload a PDF first.');
      }

      setIsLoadingData(false);
    };

    loadData();
  }, [currentEstimationData?.project_id]);
  const getFullName = () => {
    if (!userData) return '';
    return `${userData?.first_name} ${userData?.last_name}`.trim();
  };

  return (
    <PageContainer>
      <div className='flex flex-1 flex-col gap-3 pb-6'>
        <div className='flex items-center justify-between'>
          {/* Dynamic Breadcrumb */}
          <div className='flex flex-row justify-between py-4'>
            <div className='flex flex-row gap-3 text-[24px] font-semibold text-[#1F1F1F]'>
              <Icon
                icon='weui:back-filled'
                width='12'
                height='24'
                className='mt-1.5 cursor-pointer'
                onClick={() => {
                  redirect(`/dashboard/admin/estimators/${params.id}`);
                }}
              />
              <span className='!text-[#1F1F1F73]'>
                {' '}
                Estimates/{getFullName()}/
              </span>
              {params.estimateId}
            </div>
          </div>
        </div>

        {isLoadingData ? (
          <DataTableSkeleton columnCount={6} rowCount={8} filterCount={0} />
        ) : (
          <DataTable columns={itemColumns} data={items} />
        )}

        <SummaryDetails data={projectData} />
      </div>
    </PageContainer>
  );
}
