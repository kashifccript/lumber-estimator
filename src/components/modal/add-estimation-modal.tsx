import { useState } from 'react';
import { Modal } from '../ui/modal';
import { Button } from '../ui/button';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select';

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (item: {
    name: string;
    quantity: number;
    unit: string;
    sku?: string;
  }) => void;
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
  item: z.string().min(2, 'Item name is required').max(50, 'Item name must be 50 characters or less'),
  quantity: z
    .string()
    .min(1, 'Quantity is required')
    .max(10, 'Quantity must be 10 characters or less')
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) > 0,
      'Quantity must be a positive number'
    ),
  unit: z.string().min(1, 'Unit is required'),
  productCode: z.string().max(50, 'Product code must be 50 characters or less').optional()
});

export function AddItemModal({ isOpen, onClose, onSubmit }: AddItemModalProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      item: '',
      quantity: '',
      unit: 'each',
      productCode: ''
    }
  });

  function handleSubmit(values: z.infer<typeof formSchema>) {
    onSubmit?.({
      name: values.item,
      quantity: Number(values.quantity),
      unit: values.unit,
      sku: values.productCode
    });
    form.reset();
    onClose();
  }

  const handleCancel = () => {
    form.reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal
      title='Add New Item'
      description='Add a construction material or services specific to your business'
      isOpen={isOpen}
      onClose={onClose}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className='w-full space-y-2.5 overflow-y-auto'
        >
          {/* Item Name */}
          <FormField
            control={form.control}
            name='item'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Item Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder='e.g., Premium Oak Flooring' 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

            <FormField
              control={form.control}
              name='quantity'
              render={({ field }) => (
                <FormItem className='flex-1'>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input 
                      type='number' 
                      placeholder='e.g., 20' 
                      maxLength={10}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='unit'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
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

          {/* SKU/Product Code */}
          <FormField
            control={form.control}
            name='productCode'
            render={({ field }) => (
              <FormItem>
                <FormLabel>SKU/Product Code (Optional)</FormLabel>
                <FormControl>
                  <Input 
                    placeholder='e.g., OAK-PREM-001' 
                   
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Actions */}
          <div className='mt-6 flex items-center justify-end gap-2'>
            <Button
              onClick={handleCancel}
              variant='secondary'
              size='secondary'
              type='button'
            >
              Cancel
            </Button>
            <Button type='submit' variant='primary' size='secondary'>
              Add Item and Re-Estimate
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
}
