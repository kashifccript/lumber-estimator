// src/components/modal/edit-quotation-item-modal.tsx
'use client';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { updateQuotationItem } from '@/features/quotations/actions/actions';
import * as z from 'zod';

const UNITS = [
  { value: 'each', label: 'Each' },
  { value: 'sq_ft', label: 'Square Feet' },
  { value: 'linear_ft', label: 'Linear Feet' },
  { value: 'cubic_ft', label: 'Cubic Feet' },
  { value: 'piece', label: 'Piece' },
  { value: 'hour', label: 'Hour' },
  { value: 'yard', label: 'Yard' },
  { value: 'meter', label: 'Meter' }
] as const;

const formSchema = z.object({
  itemName: z.string().min(1, { message: 'Item name is required.' }),
  sku: z.string().optional(),
  unitOfMeasure: z.string().min(1, { message: 'Unit of measure is required.' }),
  cost: z.string().min(1, { message: 'Cost is required.' })
});

type FormValues = z.infer<typeof formSchema>;

interface EditQuotationItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: {
    id: string | number;
    name: string;
    sku: string;
    unit: string;
    cost: string;
  };
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export function EditQuotationItemModal({
  isOpen,
  onClose,
  item,
  onSuccess,
  onError
}: EditQuotationItemModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      itemName: '',
      sku: '',
      unitOfMeasure: 'each',
      cost: ''
    }
  });

  useEffect(() => {
    if (isOpen && item) {
      form.reset({
        itemName: String(item.name || ''),
        sku: String(item.sku || ''),
        unitOfMeasure: String(item.unit || 'each'),
        cost: String((item.cost || '').toString().replace(/^\$/, ''))
      });
    }
  }, [isOpen, item, form]);

  const handleClose = () => {
    form.reset();
    setIsSubmitting(false);
    onClose();
  };

  const handleSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      const res = await updateQuotationItem(Number(item.id), {
        item_name: values.itemName,
        sku: values.sku || '',
        unit: values.unitOfMeasure,
        unit_of_measure: values.unitOfMeasure,
        cost: values.cost
      });
      if (!res.success) throw new Error(res.message);
      toast.success('Item updated successfully');
      form.reset();
      onSuccess?.();
      handleClose();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'An error occurred';
      onError?.(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    form.reset();
    handleClose();
  };

  return (
    <Modal
      title='Edit Item'
      description='Update item details'
      isOpen={isOpen}
      onClose={handleClose}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className='flex flex-col gap-2.5 overflow-y-auto'
        >
          <FormField
            control={form.control}
            name='itemName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Item Name*</FormLabel>
                <FormControl>
                  <Input
                    placeholder='e.g., Premium Oak Flooring'
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='sku'
            render={({ field }) => (
              <FormItem>
                <FormLabel>SKU/Product Code (Optional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder='e.g., OAK-PREM-001'
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='cost'
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormLabel>Cost*</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    step='0.01'
                    placeholder='e.g., 25.50'
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='unitOfMeasure'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unit of Measure*</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isSubmitting}
                >
                  <FormControl>
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='Select unit' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {UNITS.map((unit) => (
                      <SelectItem key={unit.value} value={unit.value}>
                        {unit.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='mt-4 flex items-center justify-end gap-2'>
            <Button
              onClick={handleCancel}
              variant='secondary'
              size='secondary'
              type='button'
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type='submit'
              variant='primary'
              size='secondary'
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
}
