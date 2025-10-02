'use client';
import { AlertModal } from '@/components/modal/alert-modal';
import { Edit, Eye, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { deleteProject } from '../../actions/estimates';
import { toast } from 'sonner';

interface CellActionProps {
  data: any; // Project data from API
  onDelete?: () => void; // Callback to refresh the data after deletion
}

export const CellAction: React.FC<CellActionProps> = ({ data, onDelete }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onConfirm = async () => {
    setLoading(true);
    try {
      const response = await deleteProject(data.id);
      
      if (response.success) {
        toast.success(response.message);
        onDelete?.(); // Refresh the data
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error('Failed to delete project');
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
        title='Are you sure you want to delete this estimate?'
        description='This action cannot be undone.'
      />
      <div className='flex items-center gap-2.5'>
        <Link
          href={`/dashboard/estimator/project-details/${data.id}`}
          className='flex h-8 w-8 items-center justify-center rounded-sm border border-gray-200 bg-white shadow-sm transition-colors hover:bg-gray-50'
        >
          <Eye className='h-4 w-4 text-[#8896AB]' />
        </Link>
        <button
          onClick={() => setOpen(true)}
          className='flex h-8 w-8 cursor-pointer items-center justify-center rounded border border-gray-200 bg-white shadow-sm transition-colors hover:bg-red-50 hover:border-red-200'
        >
          <Trash2 className='h-4 w-4 text-[#8896AB]' />
        </button>
      </div>
    </>
  );
};
