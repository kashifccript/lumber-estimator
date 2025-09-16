'use client';
import { AlertModal } from '@/components/modal/alert-modal';
import { EditQuotationItemModal } from '@/components/modal/edit-quotation-item-modal';
import { Eye, Pencil, Trash } from 'lucide-react';
import { toast } from 'sonner';
import { Item } from './columns';
import { updateQuotationItem } from '../../actions/actions';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { deleteQuotationItem } from '../../actions/actions';

interface CellActionProps {
  data: Item;
  onRefresh: () => void;
}

export const CellAction: React.FC<CellActionProps> = ({ data, onRefresh }) => {
  const [loading, setLoading] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const router = useRouter();
  const params = useParams();
  const quotationId = Number(params.id);

  const onEdit = () => {
    setOpenEdit(true);
  };

  const getInitialValues = () => ({
    itemName: String(data.name || ''),
    sku: String(data.sku || ''),
    unitOfMeasure: String(data.unit || 'each'),
    cost: String((data.cost || '').toString().replace(/^\\$/, ''))
  });

  const onEditSubmit = async (values: {
    itemName: string;
    sku?: string;
    unitOfMeasure: string;
    cost: string;
  }) => {
    try {
      const res = await updateQuotationItem(Number(data.id), {
        item_name: values.itemName,
        sku: values.sku || '',
        unit: values.unitOfMeasure,
        unit_of_measure: values.unitOfMeasure,
        cost: values.cost
      });
      if (!res.success) throw new Error(res.message);
      toast.success('Item updated successfully');
      onRefresh();
    } catch (error) {
      const msg =
        error instanceof Error ? error.message : 'Failed to update item';
      toast.error(msg);
      throw error;
    }
  };

  const onDeleteConfirm = async () => {
    try {
      setLoading(true);
      const res = await deleteQuotationItem(quotationId, Number(data.id));
      if (res.success) {
        toast.success(`Item ${data.name} deleted`);
        onRefresh();
      } else {
        toast.error(`Failed to delete item ${data.name}`);
      }
    } finally {
      setLoading(false);
      setOpenDelete(false);
    }
  };

  return (
    <>
      <EditQuotationItemModal
        isOpen={openEdit}
        onClose={() => setOpenEdit(false)}
        item={data}
        onSuccess={onRefresh}
      />
      <AlertModal
        isOpen={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={onDeleteConfirm}
        loading={loading}
        title='Delete Item'
        description={`Are you sure you want to delete ${data.name}?`}
      />
      <div className='flex items-center gap-2.5'>
        <button
          onClick={onEdit}
          className='flex h-[32px] w-[32px] cursor-pointer items-center justify-center rounded-sm border-[0.3px] border-[#1F1F1F1A]'
        >
          <Pencil className='h-4 w-4 text-[#8896AB]' />
        </button>
        <button
          onClick={() => setOpenDelete(true)}
          className='flex h-[32px] w-[32px] cursor-pointer items-center justify-center rounded-sm border-[0.3px] border-[#1F1F1F1A]'
        >
          <Trash className='h-4 w-4 text-[#8896AB]' />
        </button>
      </div>
    </>
  );
};
