// src/components/modal/create-quotation-modal.tsx
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
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { redirect } from 'next/navigation';

interface CreateQuotationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Available units for selection
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
  itemName: z.string().min(1, {
    message: 'Item name is required.'
  }),
  sku: z.string().optional(),
  unitOfMeasure: z.string().min(1, {
    message: 'Unit of measure is required.'
  }),
  cost: z.string().min(1, {
    message: 'Cost is required.'
  })
});

type FormValues = z.infer<typeof formSchema>;

export function CreateQuotationModal({
  isOpen,
  onClose
}: CreateQuotationModalProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      itemName: '',
      sku: '',
      unitOfMeasure: 'each',
      cost: ''
    }
  });

  const onSubmit = (values: FormValues) => {
    console.log('Form submitted:', values);
    toast.success('Custom item added successfully!');
    redirect('/dashboard/contractor/quotation-details');
    form.reset();
    onClose();
  };

  const handleCancel = () => {
    form.reset();
    onClose();
  };

  return (
    <Modal
      title='Add Custom Item'
      description='Add a construction material or services specific to your business'
      isOpen={isOpen}
      onClose={onClose}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col gap-2.5 overflow-y-auto'
        >
          {/* Item Name */}
          <FormField
            control={form.control}
            name='itemName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Item Name*</FormLabel>
                <FormControl>
                  <Input placeholder='e.g., Premium Oak Flooring' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* SKU/Product Code */}
          <FormField
            control={form.control}
            name='sku'
            render={({ field }) => (
              <FormItem>
                <FormLabel>SKU/Product Code (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder='e.g., OAK-PREM-001' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Cost and Unit side by side */}
          <div className='flex gap-2'>
            <FormField
              control={form.control}
              name='cost'
              render={({ field }) => (
                <FormItem className='flex-1'>
                  <FormLabel>Cost*</FormLabel>
                  <FormControl>
                    <Input type='number' placeholder='e.g., 25.50' {...field} />
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
                  >
                    <FormControl>
                      <SelectTrigger>
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
          </div>

          {/* Actions */}
          <div className='mt-4 flex items-center justify-end gap-2'>
            <Button
              onClick={handleCancel}
              variant='secondary'
              size='secondary'
              type='button'
            >
              Cancel
            </Button>
            <Button type='submit' variant='primary' size='secondary'>
              Add Item
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
}
