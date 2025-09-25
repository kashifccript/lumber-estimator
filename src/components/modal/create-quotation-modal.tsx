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
import { useState } from 'react';

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

// Define the different modal modes
export type QuotationModalMode = 'create' | 'add-item';

interface CreateQuotationModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode?: QuotationModalMode;
  quotationId?: number; // Required for 'add-item' mode
  onSubmit?: (data: FormValues) => Promise<void>; // Custom submit handler
  onSuccess?: () => void; // Callback after successful submission
  onError?: (error: string) => void; // Callback for errors
}

export function CreateQuotationModal({
  isOpen,
  onClose,
  mode = 'create',
  quotationId,
  onSubmit,
  onSuccess,
  onError
}: CreateQuotationModalProps) {
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

  // Reset form when modal opens/closes
  const handleClose = () => {
    form.reset();
    setIsSubmitting(false);
    onClose();
  };

  // In CreateQuotationModal
  const handleSubmit = async (values: FormValues) => {
    if (!onSubmit) {
      toast.error('No submit handler provided');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(values);

      // Wait for parent refresh before closing
      await onSuccess?.();

      handleClose(); // close after refresh
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

  // Dynamic content based on mode
  const getModalContent = () => {
    switch (mode) {
      case 'add-item':
        return {
          title: 'Add Item to Quotation',
          description: `Add a new item to quotation #${quotationId}`,
          buttonText: 'Add Item',
          buttonLoadingText: 'Adding Item...'
        };
      case 'create':
      default:
        return {
          title: 'Add Custom Item',
          description:
            'Add a construction material or services specific to your business',
          buttonText: 'Add Item',
          buttonLoadingText: 'Adding Item...'
        };
    }
  };

  const modalContent = getModalContent();

  return (
    <Modal
      title={modalContent.title}
      description={modalContent.description}
      isOpen={isOpen}
      onClose={handleClose}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
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

          {/* SKU/Product Code */}
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

          {/* Actions */}
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
              {isSubmitting
                ? modalContent.buttonLoadingText
                : modalContent.buttonText}
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
}
